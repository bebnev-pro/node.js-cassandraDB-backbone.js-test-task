exports.data = function(req, res){


  var Connection = require('cassandra-client').Connection;
  var con = new Connection({host: 'localhost', port:9160, keyspace:'apitest', user:'', pass:''});

  res.render('addrow', {parsedJSON: 'привет'});




  con.connect(function(err) { // (err, con)
    if (err) {
      console.log('нет связи с базой, ошибка: ' + err);
      throw err;
    } else {
      console.log('соединено успешно');

      var item = {
        id: 222,
        desc: 'тест',
        name: 'тест строка',
        picture: 'img',
        price: 1000
      };


      con.execute('INSERT INTO books (id, descr, name, picture, price) VALUES (?,?,?,?,?)', [item.id, item.desc, item.name, item.picture, item.price], function(err) {
        if (err) {
          console.log('плохо записалось в базу ошибка: ' + err);
        } else {
          res.render('addrow', {parsedJSON: 'строка с ключом ' + item.id + ' записана успешно'});
          console.log('строка с ключом ' + item.id + ' записана успешно');
        }
      });



    }
  });

};
