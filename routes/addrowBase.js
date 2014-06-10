exports.data = function(req, res) {

  var cql = require('node-cassandra-cql');
  var client = new cql.Client({hosts: ['127.0.0.1'], keyspace: 'apitest', username: 'cassandra', password: 'cassandra'});
  var consistency = cql.types.consistencies.one;
  client.execute('INSERT INTO books (id, descr, name, picture, price) VALUES (blobAsUuid(timeuuidAsBlob(now())),?,?,?,?)', [req.body.descr, req.body.name, req.body.picture, +req.body.price], consistency,
    function(err) {
    if (err) {
      console.log('плохо записалось в базу ошибка: ' + err);
      res.render('addrow', {parsedJSON: 'плохо записалось в базу ошибка: ' + err});
    } else {
      res.render('addrow', {parsedJSON: 'строка с ключом ' + req.body.id + ' записана успешно'});
      console.log('строка с ключом ' + req.body.id + ' записана успешно');
    }
  });

}