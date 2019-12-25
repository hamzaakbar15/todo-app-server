var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var formidable = require('formidable');
var c = require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', usersRouter);
app.listen(30,function(){
console.log('Server is running on port :30');
c.connect(function(err){
  if(err){
    console.log('error', err);
  } else {
    console.log('Connected to database');
  }
});
});



// app.post('/insert-user',function(req,res){
//   var form = new formidable.IncomingForm();
//   form.parse(req,function(err,fields,files){
//     c.query('INSERT INTO user SET ?',fields,function(e,r){
//         if(e){
//           res.send({status:false,message:'failed to add user',response:e});
//         } else {
//           res.send({status:true,message:'user added',response:r});
//         }
//     });
// });
// });

// app.get('/',function(req,res){
//   // var form = new formidable.IncomingForm();
//   // form.parse(req,function(err,fields,files){
//     c.query('SELECT * FROM user',function(e,r){
//         if(e){
//           res.send({status:false,message:'failed to show user',response:e});
//         } else {
//           res.send({status:true,message:'users list',response:r});
//         }
//     });
// });

// app.post('/update-user/:id',function(req,res){
//   var form = new formidable.IncomingForm();
//   var id = req.params.id;
//   form.parse(req,function(err,fields,files){
//     c.query('UPDATE user SET ? WHERE id = ?',[fields,id],function(e,r){
//         if(e){
//           res.send({status:false,message:'failed to update user',response:e});
//         } else {
//           res.send({status:true,message:'user updated',response:r});
//         }
//     });
// });
// });

// app.get('/delete-user/:id',function(req,res){
//   // var form = new formidable.IncomingForm();
//   var id = req.params.id;
//   // form.parse(req,function(err,fields,files){
//     c.query(' DELETE FROM user WHERE  id = ?',id,function(e,r){
//         if(e){
//           res.send({status:false,message:'failed to delete user',response:e});
//         } else {
//           res.send({status:true,message:'user delete',response:r});
//         }
//     });
// });
// // });

module.exports = app;
