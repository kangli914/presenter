#!/usr/bin/env node

/**
 * [express description]
 * @type {[type]}
 */
var express = require('express')
  , app = express()
  , bodyparser = require('body-parser')
  , path = require('path')
  
  , routs_root = require('./routes/root')
  , routs_clientip = require('./routes/clientip');

// set directives
//app.use( express.static('static') )
app.use( '/modules', express.static('node_modules') )
app.use( '/static', express.static('static') )
//app.use( express.static(path.join(__dirname, 'static')))

app.use( bodyparser.json() )
app.use( bodyparser.urlencoded({
  extended:true
}))

/* define routes */
app.get('/', routs_root.root_handler); 
app.get('/clientip', routs_clientip.clientip_handler); 

// listen on port 3000
app.listen(3000)



