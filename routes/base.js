exports.data = function(req, res){
  var fs = require('fs');
  var file = './temp/pageResources/price.json';


  var Connection = require('cassandra-client').Connection;
  var con = new Connection({host: 'localhost', port:9160, keyspace:'apitest', user:'', pass:''});
  con.connect(function(err) { // (err, con)
    if (err) {
      console.log('нет связи с базой, ошибка: ' + err);
      throw err;
    } else {
      console.log('соединено успешно');

    con.execute('INSERT INTO books (id, descr, name, picture, price) VALUES (?,?,?,?,?)', [1, 'тест книги', 'тестовая', 123, 999], function(err) {
      if (err) {
        console.log('плохо записалось в базу ошибка: ' + err);
      } else {
        console.log('хорошо записалось в базу');
      }
    });


    }
  });













  fs.readFile(file, 'utf8', function (err, stream) {
    if (err) {
      console.log('Error: ' + err);
    } else {
    var templateData = JSON.parse(stream);
    var makeUp = '<ul>';
    templateData.forEach(function(item){
      makeUp += '<li class="item">';

      for(var key in item) {
        if (key == 'picture') {
          makeUp += '<h2 class="item_key">' + key +'</h2><p><img alt="picture" src="' + item[key] + '"/></p>';
        } else {
        makeUp += '<h2 class="item_key">' + key +'</h2><p class="item_value">' + item[key] + '</p>';
        }
      }
      makeUp += '</li>';

    });
    res.render('base', {parsedJSON:makeUp});
    }
  });




};
