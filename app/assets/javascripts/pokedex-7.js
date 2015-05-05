Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "submit form" : "savePokemon"
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
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["pokemon"];
    this.model.set(params);
    this.model.save({},{
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate("/pokemon/" + this.model.id, {trigger: true});
      }.bind(this)
    });
  }
});
