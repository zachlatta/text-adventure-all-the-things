var express = require('express');
var app = express();
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
var _ = require('underscore');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
});


app.get('/', function( req, res ) {
  res.render('index');
});
app.get('/omegle/:chat_id', function(req, res) {
  var omegle = knex('messages')
    .where('conversation', req.params.chat_id)
    .select('id', 'sender', 'contents')
    .then(function (rows) {
    res.send(rows);
  });
});

app.get('/omegle', function(req, res) {
  knex('conversations').where('platform', 'omegle').then(function (conversations) {
    res.send(conversations);
  });
});

app.get('/tinder', function(req, res) {
  res.send('yo, tinder');
});

app.listen(process.env.PORT || 3000);