var Start = Backbone.View.extend({
  el: 'body',
  events: {
    // Create new model to popup
    "click .addItem" : "addObject"
  },
  initialize: function() {
    this.collection = new RowsCollection();
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addOne);
  },
  addObject: function() {
    // Open empty popup
    var view = new AddItemView({collection: this.collection});
    this.$el.append(view.render());
  },
  // fill items in the row
  addOne: function(model) {
    var view = new ItemView({model: model});
    this.$('.row').append(view.render());
  }
});


var ItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'col-lg-4 panel panel-info',
  events: {
    "click .btn-danger" : "destroy",
    // Send model to Popup
    "click .btn-info" : "edit"
  },
  initialize: function() {
    this.template = _.template($('#viewItem').html());
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function() {
    var dataJson = this.model.toJSON();
    var makeUp = this.template(dataJson);
    this.$el.html(makeUp);
    return this.$el;
  },
  destroy: function() {
    this.model.destroy();
    this.remove();
  },
  edit: function() {
    var view = new AddItemView({model:this.model});
    this.$el.append(view.render());
  }
});

var AddItemView = Backbone.View.extend({
  tagName: 'div',
  events: {
    "click .close" : "destroy",
    "click .btn-close" : "destroy",
    // Send model from popup to server
    "click .btn-primary" : "sendModel"
  },
  initialize: function() {
    this.template = _.template($('#popupAddModel').html());
    if (this.collection) {
      this.collection.add(this.model);
    }
  },
  render: function() {
    if(this.model){
      var dataJson = this.model.toJSON();
      var makeUp = this.template(dataJson);
    } else {
      this.model = new Row({id: null});
      var dataJson = this.model.toJSON();
      var makeUp = this.template(dataJson);
    }
    this.$el.html(makeUp);
    return this.$el;
  },
  destroy: function () {
    if (this.collection) {
      this.collection.remove(this.model);
    }
    this.remove();
  },
  sendModel: function() {
    this.model.set({
      name: this.$el.find('#nameOfItem').val(),
      descr: this.$el.find('#subscr').val(),
      price: this.$el.find('#price').val(),
      picture: this.$el.find('#imgItem').val()
    });
    if (!this.model.attributes.id) {
      this.collection.create(this.model);
    } else {
      this.model.save();
    }
    this.remove();
  }
});