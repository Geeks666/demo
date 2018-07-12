
//var express = require('express');
// request('/to_list', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Show the HTML for the baidu homepage.
//     }
// })
$(function(){
    function log(x, y) {
        console.log(x, y);
    }

    log('Hello') // Hello World
    log('Hello', 'China');
    $.ajax({
        url:"admin/to_list",
        type:'get',
        success:function(data){
            var strHtml = '';
            data.map(function(value,i){
                strHtml +=
                    '<a href="#" class="list-group-item">'+
                        '<h4 class="list-group-item-heading">'+value.title+'</h4>'+
                        '<p class="list-group-item-text">'+value.content+'</p>'+
                    '</a>'
            })
            $(".list-group").html(strHtml)
        }
    })
})
