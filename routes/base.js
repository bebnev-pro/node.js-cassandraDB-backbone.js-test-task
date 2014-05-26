exports.data = function(req, res){
  var fs = require('fs');
  var file = './temp/pageResources/price.json';
  var cql = require('node-cassandra-cql');
  var client = new cql.Client({hosts: ['127.0.0.1'], keyspace: 'apitest', username: 'cassandra', password: 'cassandra'});
  var consistency = cql.types.consistencies.one;

  fs.readFile(file, 'utf8', function (err, stream) {
    if (err) {
      console.log('ошибка чтения файла json: ' + err);
    } else {

      var templateData = JSON.parse(stream);
      templateData.forEach(function (item) {
        client.execute('INSERT INTO books (id, descr, name, picture, price) VALUES (?,?,?,?,?)', [item.id, item.desc, item.name, item.picture, item.price], consistency,
          function (err, result) {
            if (err) {
              console.log('плохо записалось в базу ошибка: ' + err);
              throw err;
            }
            else {
              console.log('строка с ключом ' + item.id + ' записана успешно');
            }
          });
      });
      res.render('base', {parsedJSON: 'файл записан в базу'});
    }
  });

};