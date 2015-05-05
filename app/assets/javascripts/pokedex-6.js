Pokedex.Router = Backbone.Router.extend({
  routes: {
    "" : "pokemonIndex",
    "pokemon/:id" : "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId" : "toyDetail",
  },

  pokemonForm: function () {
    this._pokemonForm = new Pokedix.Views.PokemonForm((new Pokedex.Models.Pokemon), this._pokemonIndex.collection);
  },

  pokemonDetail: function(id, callback) {
    if (this._pokemonIndex) {
      this.pokemonDetailCallback(id, callback);
    } else {
      this.pokemonIndex(
        this.pokemonDetailCallback.bind(this, id, callback)
      );
    }
  },

  pokemonDetailCallback: function(id, callback) {
    var pokemon = this._pokemonIndex.pokes.get(id);
    var pokemonView = new Pokedex.Views.PokemonDetail({ model: pokemon });
    this._pokemonDetail = pokemonView;
    $("#pokedex .pokemon-detail").html(pokemonView.refreshPokemon({ success: callback }).$el);
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    $(".pokemon-list")
      .html(this._pokemonIndex.refreshPokemon({ success: callback }).$el);

  },

  toyDetail: function (pokemonId, toyId) {
    if (this._pokemonDetail) {
      this.toyDetailCallback(toyId);
    } else {
      this.pokemonDetail(pokemonId, this.toyDetailCallback.bind(this, toyId));
    }
  },

  toyDetailCallback: function(toyId) {
    var toy = this._pokemonDetail.model.toys().get(toyId);
    var toyView = new Pokedex.Views.ToyDetail({toy: toy});
    $("#pokedex .toy-detail").html(toyView.render().$el);
  },

});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
