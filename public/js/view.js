var Start = Backbone.View.extend({
  el: 'body',
  events: {
    "click .addItem" : "addObject"
  },
  initialize: function() {
    this.collection = new RowsCollection();
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addOne);
  },
  addObject: function() {
    var view = new AddItemView({collection:this.collection});
    this.$el.append(view.render());
  },
  addOne: function(model) {
    var view = new ItemView({model:model});
    this.$('.row').append(view.render());
  }
});

var ItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'col-lg-4 panel panel-info',
  events: {
    "click .btn-danger" : "destroy",
    "click .btn-info" : "sendNew"
  },
  initialize: function() {
    this.template = _.template($('#viewItem').html());
  },
  render: function() {
    if (!this.model.attributes.id) {this.model.set({id:false})};
    var dataJson = this.model.toJSON();
    var makeUp = this.template(dataJson);
    this.$el.html(makeUp);
    return this.$el;
  },
  destroy: function() {
    this.model.destroy();
    this.remove();
  },
  sendNew: function() {
    var that = this;
    this.model.fetch({
      success: function() {
        that.render();
      }
    });
  }
});

var AddItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'fog',
  events: {
    "click .close" : "destroy",
    "click .btn-close" : "destroy",
    "click .btn-primary" : "sendModel"
  },
  initialize: function() {
    this.template = _.template($('#popupAddModel').html());
  },
  render: function() {

    if (!this.model.attributes.id) {this.model.set({id:false})};
    var dataJson = this.model.toJSON();
    var makeUp = this.template(dataJson);
    this.$el.html(makeUp);
    return this.$el;

  },
  destroy: function () {
    this.remove();
  },
  sendModel: function() {
    this.remove();
  }
});