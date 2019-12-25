var express = require('express');
var mysql = require('mysql');

var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'test'
});

module.exports = conn;