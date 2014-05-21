exports.data = function(req, res){
  var fs = require('fs');
  var redis = require('redis'), client = redis.createClient();
  var file = './temp/pageResources/price.json';






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
