var express = require('express');
var router = express.Router();

var mysql = require('mysql')
var con = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'pass123',
  database: 'nodedb'
})
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");

});

router.post('/create', function(req, res, next) {
    try {
        var sql = 'insert into task(taskname,created) values(?,?)'
        var values = [
            req.body.hasOwnProperty('taskname') ? req.body.taskname : '',
            new Date()
        ]
    
        con.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
            
            res.json({
                'status': 'created'
            });
            
        });
      } catch(e) {            
        res.status(500);
        throw Error('invalid JSON');
      }
});
router.post('/update', function(req, res, next) {
    try {
        var sql = 'update task set taskname=? where id=?'
        var values = [
            req.body.hasOwnProperty('taskname') ? req.body.taskname : '',
            req.body.hasOwnProperty('id') ? req.body.id : 0
        ]
    
        con.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
            
            res.json({
                'status': 'updated'
            });
            
        });
      } catch(e) {            
        res.status(500);
        throw Error('invalid JSON');
      }
});

router.get('/remove/:id', function(req, res, next) {
    try {
      var sql = 'delete from task where id=?'
      var values = [              
        req.params.id
      ]
      con.query(sql, values, function (err, result) {
          if (err) throw err;
          console.log("Result: " + result);
          
          res.json({
              'status': 'deleted'
          });
          
      });
    } catch(e) {            
      res.status(500);
      throw Error('invalid JSON');
    }
});

router.get('/read', function(req, res, next) {
    try {
        var sql = 'select * from task'
        
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
            
            res.json(result);
            
        });
      } catch(e) {            
        res.status(500);
        throw Error('invalid JSON');
      }
});

module.exports = router;
