Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li" : "selectPokemonFromList"
  },

  initialize: function () {
    this.pokes = new Pokedex.Collections.Pokemon();
    this.listenTo(this.pokes, 'sync', this.render.bind(this));
    this.listenTo(this.pokes, 'add', this.render.bind(this));
    this.render();
  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]({pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function (options) {
    this.pokes.fetch({
      success: options.success
    });
    return this;
  },

  render: function () {
    this.$el.empty();
    this.pokes.each(function(pokemon) {
      this.addPokemonToList(pokemon);
    }.bind(this));

    return this;
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    Backbone.history.navigate("/pokemon/" + $target.data("id"), {trigger: true});
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li" : "selectToyFromList"
  },

  initialize: function(options) {
    this.model = options.model;
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: function() {
        options.success && options.success();
        this.render();
      }.bind(this)
    });

    return this;
  },

  render: function () {
    var content = JST["pokemonDetail"]({pokemon: this.model});
    this.$el.html(content);

    this.model.toys().each(function(toy) {
      var toyContent = JST["toyListItem"]({toy: toy});
      this.$el.find(".toys").append(toyContent);
    }.bind(this));

    return this;
  },

  selectToyFromList: function (event) {
    var $target = $(event.currentTarget);

    Backbone.history.navigate("/pokemon/" + $target.data("pokemon-id") + "/toys/" + $target.data("id") , {trigger: true});
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  initialize: function(options) {
    this.toy = options.toy;
  },

  render: function () {
    var content = JST["toyDetail"]({toy: this.toy, allPokemon: new Backbone.Collection()});
    this.$el.html(content);
    return this;
  }
});
