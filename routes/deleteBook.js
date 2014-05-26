exports.data = function(req, res) {

  var cql = require('node-cassandra-cql');
  var client = new cql.Client({hosts: ['127.0.0.1'], keyspace: 'apitest', username: 'cassandra', password: 'cassandra'});
  var consistency = cql.types.consistencies.one;

  client.execute('DELETE FROM books WHERE id = ?;', [+req.query.book], consistency,
    function(err) {
      if (err) {
        console.log('execute failed' + err);
        res.render('getBook', {parsedJSON: 'execute failed' + err});
      }
      else {
        console.log('Книжка удалена!!! ее номер был №: ' + req.query.book);
        res.redirect('../read');
      }
    }
  );
}