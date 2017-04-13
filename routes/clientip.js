
var fs = require('fs')
  , ini = require('ini')
  , mysql = require('mysql')

  // load mysql config
  , config = ini.parse( fs.readFileSync('./config.ini', 'utf-8') )
  , pool = mysql.createPool(config.database);

exports.clientip_handler = function(req, res) {
  pool.getConnection( function(err, connection) {
    if (err) {
      console.log(err)
    }
    connection.query("SELECT count(DISTINCT(clientip)) as IpCount FROM `request`", function(e,r) {
      if ( e || r.length == 0 ){
        console.log(e)
      }
      res.send(r)  
      connection.release()
    })
  })
}