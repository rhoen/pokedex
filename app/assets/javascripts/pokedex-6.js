Pokedex.Router = Backbone.Router.extend({
  routes: {
    "" : "pokemonIndex",
    "pokemon/:id" : "pokemonDetail"
  },

  pokemonDetail: function (id, callback) {
    var pokemon = this._pokemonIndex.pokes.get(id);

    var pokemonView = new Pokedex.Views.PokemonDetail({model: pokemon});
    $("#pokedex .pokemon-detail").html(pokemonView.refreshPokemon().$el);
  },


  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    $(".pokemon-list").html(this._pokemonIndex.refreshPokemon().$el);
  },

  toyDetail: function (pokemonId, toyId) {
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
