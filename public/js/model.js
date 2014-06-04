var Row = Backbone.Model.extend({
  defaults:{
    id : 1,
    descr : "Пример - описание",
    name : "Пример",
    picture : "http://akak.ru/steps/pictures/000/027/890_large.jpg",
    price : "10"
  },
  url: "/model"
});
var RowsCollection = Backbone.Collection.extend({
  model: Row
});