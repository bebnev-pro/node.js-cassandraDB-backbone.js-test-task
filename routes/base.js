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
      fs.readFile(file, 'utf8', function (err, stream) {
        if (err) {
          console.log('ошибка чтения файла json: ' + err);
        } else {
          var templateData = JSON.parse(stream);


          templateData.forEach(function(item){
            con.execute('INSERT INTO books (id, descr, name, picture, price) VALUES (?,?,?,?,?)', [item.id, item.desc, item.name, item.picture, item.price], function(err) {
              if (err) {
                console.log('плохо записалось в базу ошибка: ' + err);
              } else {
                console.log('строка с ключом ' + item.id + ' записана успешно');
              }
            });
          });
          res.render('base', {parsedJSON: 'файл записан в базу'});


//          con.execute('SELECT ? FROM books WHERE name=?', [1,''], function(err) {
//            if (err) {
//              console.log('плохо прочиталось с базы ошибка: ' + err);
//              res.render('base', {parsedJSON: 'плохо прочиталось с базы ошибка: ' + err});
//            } else {
//              console.log('прочиталось с базы хрошо');
//              res.render('base', {parsedJSON: 'прочиталось с базы хорошо'});
//            }
//          });


        }
      });


    }
  });






};


//            for(var key in item) {

//              if (key == 'picture') {
//                makeUp += '<h2 class="item_key">' + key +'</h2><p><img alt="picture" src="' + item[key] + '"/></p>';
//              } else {
//                makeUp += '<h2 class="item_key">' + key +'</h2><p class="item_value">' + item[key] + '</p>';
//              }

//            }