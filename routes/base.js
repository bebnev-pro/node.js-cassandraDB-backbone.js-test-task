var fs = require('fs');
var file = './temp/pageResources/price.json';
const sqlite3 = require('sqlite3').verbose();

exports.data = function(req, res) {

  let db = new sqlite3.Database('./bin/sample.db');
  fs.readFile(file, 'utf8', function (err, stream) {
    if (err) {
      console.log('Error during fs read json: ' + err);
    } else {
      var templateData = JSON.parse(stream);
      templateData.forEach(function (item) {
        db.run(`INSERT INTO books(Descr, Name, Picture, Price) VALUES(?, ?, ?, ?)`, [item.desc, item.name, item.picture, item.price], function(err) {
          if (err) {return console.log(err);}
        });
      });
      db.close();
      res.redirect('/');
    }
  });
  
};