var express = require('express'),
  app = express(),
  bodyParser = require("body-parser");
  methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));

db = require('./models');

app.get('/', function(req,res){
  res.redirect('/countries');
});

app.get('/countries', function(req,res){
  db.Country.find({}, function(err,countries){
    res.render('index', {country: countries});
  });
});

app.get('/countries/new',function(req,res){
  res.render('new');
});

app.post('/countries',function(req,res){
  db.Country.create(req.body.country, function(){
    res.redirect('/');
  });
});

app.get('/countries/:id/edit', function(req,res){
  db.Country.findById(req.params.id, function(err, editCountry){
    res.render('edit', {country: editCountry});
  });
});

app.get('/countries/:id',function(req,res){
  db.Country.findById(req.params.id, function(err, count){
    res.render('individual', {country: count});
  });
});

app.put('/countries/:id', function(req,res){
  db.Country.findByIdAndUpdate(req.params.id, req.body, function(){
    res.redirect('/countries');
  });
});

app.delete('/countries/:id', function(req,res){
  db.Country.findByIdAndRemove(req.params.id, function(){
    res.redirect('/countries');
  });
});





app.listen(3000, function (){
  console.log('Server running on port 3000');
});