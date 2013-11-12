/*var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello World!</h1><p>This is my test page,I am <a href='http://highsea90.com' target='_blank'>highsea</a> .</p>");
    response.end();
}).listen(8080);
*/
/*var http = require('http');   
var server = http.createServer(function (req, res) {   
      res.writeHeader(200, {"Content-Type": "text/html"});  
      // text/plain 以纯文本方式发送 
      res.write("<p> boy and girl</p>")
      res.end("\nHello World");   
})   
server.listen(8080);   
console.log("httpd start @8080");   */

var http = require('http');
//var express = require('express');
/*var jsdom  = require("jsdom"),
    window = jsdom.jsdom().createWindow();

jsdom.jQueryify(window, "http://cdn/jquery.js", 
      function() {
        window.jQuery('body').append("<div class='testing'>Hello World, It works<div>");
        console.log(window.jQuery(".testing").test());
      });*/
          
var server = http.createServer(function (req,res) {
    if(true){
        res.writeHeader(200, {'Content-Type':'text/html;charset=UTF-8'});
        res.write("<h1>Hello World!</h1><p>This is my test page,I am <a href='http://highsea90.com' target='_blank'>highsea 高海</a> .</p>");
        //writeHeader 一次性设置好once ， setHeader 可以设置多次 repeatedly
        res.end();
    }
    res.writeHeader(200, {'Content-Type':'text/javascript;charset=UTF-8'})
    res.write(JSON.stringify({a:321}));
    res.end();
});
server.listen(8080);
console.log("httpd start @8080");