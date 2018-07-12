// 导入MySQL模块
var mysql = require('mysql');

// 传入一个js对象作为参数
// host是主机，可以是本地的localhost，也可以是你服务器的ip地址
// user 登录数据库的用户，password 登录用户的密码
// database 数据库的名字，我使用的是blog这个数据库
var pool = mysql.createPool({
    host     : '122.112.116.83',
    user     : 'myword666',
    password : 'X7VDNY57y6',
    database : 'myword666'
});

// 连接数据库
//db.connect();

var query = function(sql, arr, callback){
    //建立链接
    pool.getConnection(function(err,conn){
        if(err){throw err;return;}
        conn.query(sql,arr,function(error,results,fields){
            //将链接返回到连接池中，准备由其他人重复使用
            conn.release();
            callback && callback(error, results, fields);
        });
    });
};

module.exports = query;