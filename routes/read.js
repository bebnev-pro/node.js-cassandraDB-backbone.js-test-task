exports.data = function(req, res) {

  var cql = require('node-cassandra-cql');
  var client = new cql.Client({hosts: ['127.0.0.1'], keyspace: 'apitest', username: 'cassandra', password: 'cassandra'});
  var consistency = cql.types.consistencies.one;
  client.execute('SELECT * FROM books;', [], consistency,
    function(err, result) {
      if (err) console.log('execute failed' + err);
      else {
        console.log('результат: ' + !!result);
        var makeUp = 'Вот записи: </br>';
        var counter = 0;
        for (var i=0; i < result.rows.length; i++) {
          counter++;
          makeUp += 'id: ' + result.rows[i].id + '</br>';
          makeUp += 'name: ' + result.rows[i].name + '</br>';
          makeUp += 'descr: ' + result.rows[i].descr + '</br>';
          makeUp += 'picture: ' + result.rows[i].picture + '</br>';
          makeUp += 'price: ' + result.rows[i].price + '</br>';
        }
        res.render('read', {parsedJSON: makeUp, counter: counter});
      }
    }
  );

}