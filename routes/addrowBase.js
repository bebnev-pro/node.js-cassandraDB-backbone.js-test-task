exports.data = function(req, res) {

  res.render('addrow', {parsedJSON:'Вы отправили в базу запись с id: ' + req.body.id + '.'});
  var Connection = require('cassandra-client').Connection;
  var con = new Connection({host: 'localhost', port:9160, keyspace:'apitest', user:'', pass:''});
  con.connect(function(err) { // (err, con)
    if (err) {
      res.render('addrow', {parsedJSON: 'нет связи с базой, ошибка: ' + err});
      console.log('нет связи с базой, ошибка: ' + err);
    } else {
      console.log('соединено успешно');
      con.execute('INSERT INTO books (id, descr, name, picture, price) VALUES (?,?,?,?,?)', [req.body.id, req.body.descr, req.body.name, req.body.picture, req.body.price], function(err) {
        if (err) {
          console.log('плохо записалось в базу ошибка: ' + err);
        } else {
          res.render('addrow', {parsedJSON: 'строка с ключом ' + req.body.id + ' записана успешно'});
          console.log('addrow', {parsedJSON: 'строка с ключом ' + req.body.id + ' записана успешно'});

        }
      });

    }
  });

}