#!/usr/bin/env node

/**
 * [express description]
 * @type {[type]}
 */
var express = require('express')
  , app = express()
  , bodyparser = require('body-parser')
  , path = require('path')
  
  //, routs_root = require('./routes/root')
  //, routs_clientip = require('./routes/clientip');

// set directives
//app.use( '/modules', express.static('node_modules') )
//app.use( '/static', express.static('static') )

app.set('view engine', 'ejs')

app.use( bodyparser.json() )
app.use( bodyparser.urlencoded({
  extended:true
}))

/* define routes */
//app.get('/', routs_root.root_handler); 
//app.get('/clientip', routs_clientip.clientip_handler); 

app.get('/month', function(req, res){
	//res.sendFile(__dirname + '/index.html')

  var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      data: [65, 59, 80, 81, 56, 55, 40, 0, 15, 20, 90, 10]
  }

	res.render( 'month', {gdata: data, gmonth: JSON.stringify(data.labels)} )
})

// listen on port 3000
app.listen(3000)



