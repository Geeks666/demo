var express = require('express');

var router = express.Router();

var app = express();

// 引入数据库配置文件
var ejs = require('ejs');
var db = require('../dbConfig');

router.get('/', function (req, res) {
    res.render('login', { title: '登陆页面' ,errMsg: ''});
});

// 用于显示用户注册页面：
router.get('/register', function(req, res, next) {
    res.render('register', { title: '注册页面' });
});

// 用于显示用户登陆页面：
router.get('/login', function(req, res, next) {
    res.render('login', { title: '登陆页面' ,errMsg: ''});
});

router.get('/home', function(req, res, next) {
    res.render('home', { title: 'home' ,user: req.session.sign});
});

// 用于处理用户通过表单提交的请求
router.post('/register', function(req, res, next) {
    // 判断用户名是否存在
    //console.log(req.body);
    var queryString = "select * from user where username='" + req.body.username +"'";
    db(queryString, function(err, rows){
        if (err) {
            res.send(err);
        }else {
            if (rows.length != 0) {
                res.send("用户名已存在，注册失败");
            }else {
                // 执行到这里说明用户名没有重复，可以将用户提交的数据插入数据库
                queryString = "insert into user(username, password) values('" + req.body.username + "', '" + req.body.password + "')";

                db(queryString, function(err, rows){
                    if (err) {
                        res.send(err);
                    }else {
                        res.redirect("/login");
                    }
                })
            }
        }
    })
});

module.exports = router;