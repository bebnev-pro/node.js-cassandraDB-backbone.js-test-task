exports.data = function(req, res) {

  var cql = require('node-cassandra-cql');
  var client = new cql.Client({hosts: ['127.0.0.1'], keyspace: 'apitest', username: 'cassandra', password: 'cassandra'});
  var consistency = cql.types.consistencies.one;
  client.execute('SELECT * FROM books WHERE id=?;', [+req.params.id], consistency,
    function(err, result) {
      if (err) {
        console.log('execute failed ' + err);
        res.send('execute failed ' + err);
      }
      else {
        console.log('результат: ' + !!result);
        console.log('запрошена книга №: ' + req.params.id);
        res.send({
          id : result.rows[0].id,
          descr : result.rows[0].descr,
          name : result.rows[0].name,
          picture : result.rows[0].picture,
          price : result.rows[0].price
        });
      }
    }

  );
}