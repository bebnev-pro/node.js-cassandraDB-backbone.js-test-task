exports.data = function(req, res){
  var fs = require('fs');
  var file = './temp/pageResources/price.json';
  fs.readFile(file, 'utf8', function (err, srteam) {
    if (err) {
      console.log('Error: ' + err);


    }
      res.render('base', {parsedJSON:srteam});


  });

};
