var Start = Backbone.View.extend({
  el: 'body',
  events: {
    "click .addItem" : "addObject"
  },
  initialize: function() {
    this.collection = new RowsCollection();
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addOne);
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

    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");

    this.model = new Row({id: uuid});
    this.collection.add(this.model, {silent: true});
    console.log(this.model);
  },
  render: function() {
    var dataJson = this.model.toJSON();
    var makeUp = this.template(dataJson);
    this.$el.html(makeUp);
    return this.$el;
  },
  destroy: function () {
    this.model.destroy();
    this.remove();
    this.collection.fetch();
  },
  sendModel: function() {
    this.collection.create(this.model);
    this.remove();

  }
});