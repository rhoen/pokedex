Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
  },

  initialize: function(model, collection) {
    this.model = model;
    this.collection = collection;
  },

  render: function () {
    this.$el.html(JST["pokemonForm"]);
    return this;
  },

  savePokemon: function (event) {
  }
});
