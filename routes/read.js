exports.data = function(req, res) {

  var Connection = require('cassandra-client').Connection;
  var con = new Connection({host: 'localhost', port:9160, keyspace:'apitest', use_bigints: false});
  con.connect(function(err) { // (err, con)
    if (err) {
      res.render('read', {parsedJSON: 'нет связи с базой, ошибка: ' + err});
      console.log('нет связи с базой, ошибка: ' + err);
    } else {
      console.log('соединено успешно');

      con.execute('SELECT name FROM books', [], function (err, rows) {
        if (err) {
          res.render('read', {parsedJSON: 'плохо прочиталось с базы: ' + err});
          console.log('плохо прочиталось с базы: ' + err);
        } else {
          console.log(rows.rowCount());
          console.log(rows[0]);
          res.render('read', {parsedJSON: 'вот звпись: ' + rows[0]});
        }
      });

    }
  });

}