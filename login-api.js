var request = require('request');

//enable cookies
request = request.defaults({jar: true});

//登录
function login(username, password, callback){
  request.post("http://gb.alibench.com/ajax_login.php", {form:{username: username, password:password}}, function(err, r, body){
    callback();
  });
}
//获取任务列表
function getTaskList(callback){
  request.post('http://gb.alibench.com/ajax_api.php?api_name=CronTask&api_method=GetTaskList', {form:{page:1, task_type:6, is_mine: 1}}, function(error, r, body){
    var data;
    try{
        data = JSON.parse(body);
    }catch(err){
       return callback(err);
    }
    callback(null, data.data);
  });
}
//执行API
exports.execute = function(callback, options){
    login("ali/zhengxie.lj", "zhengxie.lj123456", function(){
       getTaskList(function(err, data){
           if(err){
             return callback(err);
           }
           var rows = data.rows;
           var results = [];
           rows.forEach(function(item){
             var summary = JSON.parse(item.summary);
             results.push({
               name: item.name,
               url: item.target,
               pagespeed: summary.page_pagespeed_score,
               time_start_render: summary.page_start_render_time,
               time_dom_complete: summary.page_dom_complete_time,
               time_fullload: summary.page_fullload_time,
               time_onload: summary.page_onload_time,
               last_update: summary.last_update
             })
           });
           var content = JSON.stringify(results);
           var cb = (options.get || {}).callback;
           if(cb){
              content = cb + "(" + content + ")";
           }
           callback(null, content);
       });
    });
}