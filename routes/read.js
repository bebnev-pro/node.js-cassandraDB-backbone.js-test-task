exports.data = function(req, res) {

  var cql = require('node-cassandra-cql');
  var client = new cql.Client({hosts: ['127.0.0.1'], keyspace: 'apitest', username: 'cassandra', password: 'cassandra'});
  var consistency = cql.types.consistencies.one;
  client.execute('SELECT * FROM books;', [], consistency,
    function(err, result) {
      if (err) console.log('на запрос' + req.params + 'выпала ошибка: ' + err);
      else {
        console.log('результат: ' + !!result);
        res.send(result.rows);
      }
    }
  );
}