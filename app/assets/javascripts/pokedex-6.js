Pokedex.Router = Backbone.Router.extend({
  routes: {
    "" : "pokemonIndex",
    "pokemon/:id" : "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId" : "toyDetail",
  },

  pokemonDetail: function (id, callback) {
    if (this._pokemonIndex) {
      this.pokemonDetailCallback(id);
    } else {
      this.pokemonIndex(
        this.pokemonDetailCallback.bind(this, id)
      );
    }
  },

  pokemonDetailCallback: function(id) {
    var pokemon = this._pokemonIndex.pokes.get(id);
    var pokemonView = new Pokedex.Views.PokemonDetail({model: pokemon});
    this._pokemonDetail = pokemonView;
    $("#pokedex .pokemon-detail").html(pokemonView.refreshPokemon().$el);
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    $(".pokemon-list")
      .html(this._pokemonIndex.refreshPokemon({success: callback}).$el);
  },

  toyDetail: function (pokemonId, toyId) {

    var toy = this._pokemonDetail.model.toys().get(toyId);
    var toyView = new Pokedex.Views.ToyDetail({toy: toy});
    $("#pokedex .toy-detail").html(toyView.render().$el);
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
