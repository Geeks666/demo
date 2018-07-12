var express = require('express');
var index = require('./rotuer/index');
var admin = require('./rotuer/admin');
var  bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var app = express();

// views engine setup
app.set('views', path.join(__dirname, 'commpent/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')))

//获取请求主体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(session({
    secret: 'hubwiz', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30},
    resave:false,
    saveUninitialized:true
}))

app.use(function (req, res, next) {
    if (req.session.sign) {  // 判断用户session是否存在
        next();
    } else {
        console.log(req.headers);
        next();

        /*var arr = req.url.split('/');
        for (var i = 0, length = arr.length; i < length; i++) {
            arr[i] = arr[i].split('?')[0];
        }
        // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
        if (arr[1] == 'login' || arr[1] == 'register') {
            next();
        }
        else {
            req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
            res.redirect("/login.html");
        }*/
    }
});


app.use('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers['origin']); //这个表示任意域名都可以访问，这样写不能携带cookie了。
//res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
    res.header('Access-Control-Allow-Credentials','true');
    if (req.method == 'OPTIONS') {
        res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    }
    else {
        next();
    }
});
app.use('/', index);
app.use('/admin', admin);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;