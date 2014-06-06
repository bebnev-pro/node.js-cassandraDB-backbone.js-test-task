var Row = Backbone.Model.extend({
  idAttribute: "id",
  defaults:{
    descr : "Пример - описание",
    name : "Пример",
    picture : "http://akak.ru/steps/pictures/000/027/890_large.jpg",
    price : "10"
  }
});
var RowsCollection = Backbone.Collection.extend({
  model: Row,
  url: "/read"
});