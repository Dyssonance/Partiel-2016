var MovieListView = Backbone.View.extend ({
	//Ce qui contient la vue (en l'occurence, la div 'app' de l'index)
	el: '#app',

	events: {
		'submit form': 'addMovie',
		'change input [type="radio"]': 'seeMovie'
	},

	seeMovie: function(event) {
		var $input = $(event.currentTarget);
		var inputValue = $input.val();

		// Je récupère le data-title du <li> au dessus
		var movieTitle = $input.parents('li').attr('data-title');

		// Je regarde dans ma collection si j'ai un modèle
		// Qui porte le nom de celui sur lequel on a cliqué
		// Si oui, je le stocke dans targetModel
		this.myMovieCollection.findWhere({
			title: movieTitle
		});

		// Si on nous retourne un modèle
		if(targetModel) {

			// Si j'ai cliqué sur le radio "Vu"
			if(inputValue === 'seen') {
				// Je modifie le modèle en disant que j'ai vu le film
				targetModel.set({
					seen: true
				});

			} else {
				// Je modifie le modèle en disant que je n'ai pas vu le film
				targetModel.set({
					seen: false
				});
			}
		}

		
	},

	// On va ajouter le nouveau film à la collection
	addMovie: function(event) {
		//Kill l'event
		event.preventDefault();

		// On récupère les valeurs des champs du formulaire
		var $form = $(event.currentTarget);
		var movieTitle = $form.find('.movie-title').val();
		var moviePoster = $form.find('.movie-poster').val();
		var movieGenre = $form.find('.movie-genre').val();
		var movieNote = $form.find('.movie-note').val();


		// Avec mes données, je crée un nouveau film
		// Donc un nouveau modèle
		var newMovieModel = new MovieModel({
			title: movieTitle,
			poster: moviePoster,
			genre: movieGenre,
			note: movieNote
		});


		// Je viens ajouter ce modèle dans ma collection
		this.myMovieCollection.add(newMovieModel);

		// Une fois qu'on a ajouté notre film
		// On va vouloir l'afficher à l'écran
		// Il faut donc rendre la vue
		this.render();

	},

	initialize: function() {
		// On lie la collection à la vue 
		// En l'instanciant à l'intérieur de la vue
		this.myMovieCollection = new MovieCollection();

		// On rend la vue une première fois
		this.render();
	},

	render: function() {
		// On récupère l'endroit où on va templater les films
		// Templater = ajouter au DOM
		var $renderTarget = this.$('.movie-list');

		// On le vide pour éviter qu'il se répète
		$renderTarget.empty();

		// Je récupère tous les films de ma collection
		// Avec .toJSON() cf cours ;)
		// Il me retourne un tableau d'objets
		// [{title: 'Star Wars', poster: 'url', seen: false}]
		var allMyMovies = this.myMovieCollection.toJSON();

		for (var i = 0; i < allMyMovies.length; i++) {
			var movie = allMyMovies[i];

			// Pour chaque film, je récupère le template
			// En lui donnant les données du film
			var movieTemplate = this.getTemplate(movie);

			// Une fois que le template est récupéré
			// On l'ajoute au DOM
			$renderTarget.append(movieTemplate);
		}
	},

	getTemplate: function(movieData) {
		// Ici, movieData est un objet du type
		// {title: 'truc', poster: 'url', seen: true}

		var isSeenChecked = '';
		var isNotSeenChecked = 'checked';

		// Si le film est vu et que movieData.seen est true
		// On check le premier input et pas le deuxième
		if(movieData.seen) {
			isSeenChecked = 'checked';
			isNotSeenChecked = '';
		}

		var movieTemplate = '\
			<li data-title="'+ movieData.title +'">\
				<h2>'+ movieData.title +'</h2>\
				<img src="'+ movieData.poster +'" />\
				<h2>'+ movieData.genre +'</h2>\
				<h2>'+ movieData.note +' /10</h2>\
				<form>\
					<label>Vu</label>\
					<input '+ isSeenChecked +' type="radio" class="movie-seen" name="movie" value="seen"/>\
					<label>Pas Vu</label>\
					<input '+ isNotSeenChecked +' type="radio" class="movie-seen" name="movie" value="unseen"/>\
				</form>\
			</li>\
		';

		// On retourne la string

		return $(movieTemplate);
	}
});