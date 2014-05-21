exports.data = function(req, res){
  var fs = require('fs');
  var redis = require('redis'), client = redis.createClient();
  var file = './temp/pageResources/price.json';


  // redis
  client.on("error", function (err) {
//    console.log("Error " + err);
  });
  client.set("string key", "string val", redis.print);
  client.hset("hash key", "hashtest 1", "some value", redis.print);
  client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
  client.hkeys("hash key", function (err, replies) {
//    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
//      console.log("    " + i + ": " + reply);
    });
    client.quit();
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
