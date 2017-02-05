#!/usr/bin/env node

var express = require('express')
  , app = express()
  , bodyparser = require('body-parser')
  , fs = require('fs')
  , ini = require('ini')
  , mysql = require('mysql')

// load mysql config
var config = ini.parse( fs.readFileSync('./config.ini', 'utf-8') )
  , pool = mysql.createPool(config.database)

// set directives
app.use( express.static('static') )
app.use( bodyparser.json() )
app.use( bodyparser.urlencoded({
  extended:true
}))

/* define routes */

// returns a list of environments to select from
.get('/clientip/', function(req,res){
  pool.getConnection( function(j, connection){
    connection.query("SELECT count(DISTINCT(clientip)) as IpCount FROM `request`", function(e,r){
      if( e || r.length == 0 ){
        console.log(e)
      }
      res.send(r)
      connection.release()
    })
   })
})

/*
var mychart=document.getElementById("lineChart");
require(['path/to/Chartjs'], function(Chart){
   var myChart = new Chart(mychart)
})
*/


// listen on port 3000
app.listen(3000)
