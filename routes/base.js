exports.list = function(req, res){

  var parsedJSON = require('./temp/pageResources/price.json');

  res.render({parsedJSON:parsedJSON});
  console.log(parsedJSON);
};
