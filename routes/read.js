const sqlite3 = require('sqlite3').verbose();

exports.data = function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  let db = new sqlite3.Database('./bin/sample.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQlite database.');
  });

  let sql = `SELECT
              primary_key id,
              Descr descr,
              Name name,
              Picture picture,
              Price price
              FROM books;`;

  db.all(sql, [], (err, result) => {
    if (err) {
      console.error('The query "SELECT * FROM books;" returns error: ' + err);
      throw err;
    }
    console.log('The query "SELECT * FROM books;" result: \n' + result.length);
    res.send(result);
  });
  db.close();
}

exports.write = function(req, res) {
  let db = new sqlite3.Database('./bin/sample.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQlite database.');
  });

  if (req.body.id) {
    let sql = `UPDATE books
      SET Descr = ?, Name = ?, Picture = ?, Price = ?
      WHERE primary_key = ?`;

    db.run(sql, [req.body.descr, req.body.name, req.body.picture, +req.body.price, req.body.id], function(err) {
      if (err) {
        return console.error(err.message);
      }
    });
  } else {
    db.run(`INSERT INTO books(Descr, Name, Picture, Price) VALUES(?, ?, ?, ?)`, [req.body.descr, req.body.name, req.body.picture, +req.body.price], function(err) {
      if (err) {return console.log(err);}
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      res.send({id: this.lastID});
    });
  }
  db.close();
}

exports.delete = function(req, res) {
  let db = new sqlite3.Database('./bin/sample.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQlite database.');
  });
 
  let sql = `DELETE FROM books WHERE primary_key=?;`;

  db.run(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('The query "DELETE FROM books WHERE primary_key='+req.params.id+';" returns error: ' + err);
      throw err;
    }
    console.log('The query "DELETE FROM books WHERE primary_key='+req.params.id+';" result: \n' + result);
    res.send(result);
  });
  db.close();
  res.redirect('/');
}