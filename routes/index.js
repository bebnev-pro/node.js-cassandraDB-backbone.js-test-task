exports.list = function(req, res){
  if (req.isAuthenticated()) {
    res.render('index', {title: 'Вы зашли как: ' + req.user.username});
  } else {
    res.render('index', { title: 'The index page! Не забудьте залогиниться !' });
  }
};