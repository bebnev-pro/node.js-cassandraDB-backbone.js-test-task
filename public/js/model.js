var Row = Backbone.Model.extend({
  idAttribute: "id",
  defaults:{
    descr : "",
    name : "New",
    picture : "",
    price : 0
  }
});
var RowsCollection = Backbone.Collection.extend({
  model: Row,
  url: "/read"
});