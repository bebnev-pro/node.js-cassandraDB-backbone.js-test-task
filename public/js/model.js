var Row = Backbone.Model.extend({
  defaults:{
    

  },
  validate: function(attrs) {
    if(attrs.valid == true) {
      alert('Вы ввели недопустимые символы. Возможен ввод только действительных чисел.');
      return('Incorrect');
    }

  }
});
var RowsCollection = Backbone.Collection.extend({
  model: Row
});