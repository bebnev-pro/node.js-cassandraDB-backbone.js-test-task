var Row = Backbone.Model.extend({
  idAttribute: "id",
  defaults:{
    descr : "",
    name : "new created model on client",
    picture : "",
    price : 10
  }
});
var RowsCollection = Backbone.Collection.extend({
  model: Row,
  url: "/read"
});