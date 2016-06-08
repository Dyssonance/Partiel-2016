var MovieModel = Backbone.Model.extend ({
	// Dans mon modèle film
	// Il faut un titre et un URL de poster
	// Et si je l'ai vu ou pas (booléen)
	defaults: {
		title: '',
		poster: 'http://bit.ly/1OMRr64',
		genre: '',
		seen: false,
		note: 0
	}
});
