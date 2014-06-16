exports.data = function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

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
exports.write = function(req, res) {

  var cql = require('node-cassandra-cql');
  var client = new cql.Client({hosts: ['127.0.0.1'], keyspace: 'apitest', username: 'cassandra', password: 'cassandra'});
  var consistency = cql.types.consistencies.one;

  client.execute('INSERT INTO books (id, descr, name, picture, price) VALUES (?,?,?,?,?)', [req.body.id, req.body.descr, req.body.name, req.body.picture, +req.body.price], consistency,
    function(err) {
      if (err) {
        console.log('плохо записалось в базу ошибка: ' + err);
        res.send('плохо записалось в базу ошибка: ' + err);
      } else {
        console.log('книжка создана с номером: ' + req.body.id);
        res.redirect('/');
      }
    });
}
exports.delete = function(req, res) {

  var cql = require('node-cassandra-cql');
  var client = new cql.Client({hosts: ['127.0.0.1'], keyspace: 'apitest', username: 'cassandra', password: 'cassandra'});
  var consistency = cql.types.consistencies.one;

  client.execute('DELETE FROM books WHERE id = ?;', [req.params.id], consistency,
    function(err) {
      if (err) {
        console.log('execute failed' + err);
        res.render('getBook', {parsedJSON: 'execute failed' + err});
      }
      else {
        console.log('Книжка удалена!!! ее номер был №: ' + req.params.id);
        res.redirect('/');
      }
    }
  );
}