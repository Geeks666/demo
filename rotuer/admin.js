var express = require('express');
var router = express.Router();

var db = require('../dbConfig');

router.get('/', function (req, res) {
    res.send('Hello Hello!');
});

router.post('/login', function(req, res, next){
    var querString = "select * from user where username='"+req.body.username+"'";
    db(querString, function(err, rows){
        if (err) {
            res.sends(err);
        }else if(rows.length == 0 ) {
            //res.set('Content-Type', 'text/html;charset=utf-8');
            res.json({code: 200, success:'false', err: '用户名错误'})
            //res.render('login', {title: 'login', errMsg: '用户名错误' });
        }else if(rows[0].password == req.body.password){
            req.session.sign = req.body.username;
            //res.redirect("/home");
            res.json({code: 200, success:'true', err: ''})
            //res.send({ title: 'home' })
            //res.render('home', { title: 'home' });
        }else {
            res.json({code: 200, success:'false', err: '密码错误'})
            //res.render('login', {title: 'login', errMsg: '密码错误' });
        }
    })
});

router.post("/to_list", function(req, res, next){
    if(req.session.sign != ""){
        queryString = 'select * from data_list';
        db(queryString, [1], function(err, rows){
            res.json(rows);
        })
    }
})

module.exports = router;