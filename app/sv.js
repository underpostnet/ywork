var express = require('express');
var path = require('path');
var fs = require('fs');
var session = require('express-session');

//App init

var app = express();

var compHead;
var compMain;

//load comp

fs.readFile((__dirname + '/comp/head.html'), 'utf8', function(err, contents) {
  compHead = contents;
  //console.log(contents);
});

fs.readFile((__dirname + '/comp/main.html'), 'utf8', function(err, contents) {
  compMain = contents;
  //console.log(contents);
});

//middleware

var mid1 = function (req, res, next) {
  //console.log('mid1');
  next();
};

var mid2 = function (req, res, next) {
  //console.log('mid2');
  next();
};

app.use(mid1);

app.use(mid2);

//main path

app.get('/', function(req, res) {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('New Connection -> IP:'+ip);

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<!DOCTYPE html><html dir="ltr" lang="en"><head>');
  res.write(compHead);
  res.write('</head><body>');
  res.write(compMain);
  res.write('</body></html>');
  res.end();

});

//session init

app.use(session({
  secret: 'express-session-ywork',
  resave: true,
  saveUninitialized: true
}));

// session Authentication and Authorization Middleware

var auth = function(req, res, next) {
  if (req.session && req.session.p1 && req.session.p2){

    console.log('LOG -> '+req.session.p1);
    console.log('LOG -> '+req.session.p2);

    return next();
  }else{
    return res.sendStatus(401);
  }

};

// session Login endpoint

app.get('/set-session', function (req, res) {
  if (!req.query.p1 || !req.query.p2) {
    res.send('login failed');
  } else if(req.query.p1 || req.query.p2) {
    req.session.p1 = req.query.p1;
    req.session.p2 = req.query.p2;
    res.send('login success');
  }
});

// session Get state endpoint

app.get('/state', auth, function (req, res) {
    res.send('You can only see this after you ve logged in.');
});

// session Logout endpoint

app.get('/destroy-session', function (req, res) {
  req.session.destroy();
  res.send('logout success');
});

//get AJAX

app.get('/ajax', function(req, res) {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var p1 = req.query.p1;
  var p2 = req.query.p2;

  console.log('AJAX Req. -> IP:'+ip+' P1:'+p1+' P2:'+p2);

  var obj = { 'p1':123, 'p2':'Test' };
  res.send(JSON.stringify(obj));

});

//file path

app.get('/jquery', function(req, res) {

  res.sendFile(path.join(__dirname + '/lib/jquery.min.js'));

});

app.get('/global', function(req, res) {

  res.sendFile(path.join(__dirname + '/lib/global.js'));

});

app.get('/game', function(req, res) {

  res.sendFile(path.join(__dirname + '/lib/game.js'));

});

app.get('/robots.txt', function(req, res) {

  res.sendFile(path.join(__dirname + '/robots.txt'));

});

app.get('/sitemap.xml', function(req, res) {

  res.sendFile(path.join(__dirname + '/sitemap.xml'));

});

//assets path

app.get('/assets/underpost.png', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/underpost.png'));

});

app.get('/git', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/git.png'));

});

app.get('/favicon', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/favicon.png'));

});

//server

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
