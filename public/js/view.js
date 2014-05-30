var Start = Backbone.View.extend({
  el: 'body',
  events: {
    "click .btn-primary" : "addObject"
  },
  initialize: function() {

  },
  addObject: function() {
    var view = new ItemView();
    this.$('.row').prepend(view.render());
  }
});

var ItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'col-lg-4 panel panel-info',
  events: {
    "click .btn-danger" : "destroy"
  },
  initialize: function() {
    this.template = _.template($('#viewItem').html());
    this.model = new Row();
  },
  render: function() {
    var dataJson = this.model.toJSON();
    var makeUp = this.template(dataJson);
    this.$el.html(makeUp);
    return this.$el;
  },
  destroy: function() {
    this.remove();
  }
});