var mysql = require('mysql');
console.log(mysql)
var connection = mysql.createConnection({
    /*host     : '122.112.116.83',
    user     : 'myword666',
    password : 'X7VDNY57y6',
    database : 'myword666'*/
    host     : '127.0.0.1',
    user     : 'root',
    password : '123',
    database : 'cmswing'
});

connection.connect();

connection.query('SELECT * From cmswing_action', function (err, results, fields) {
    if(err){
        console.log('[UPDATE ERROR] - ',err.message);
        return;
    }
    console.log('The solution is: ', results);
});
connection.end();