#!/usr/bin/env node

var mysql = require('mysql')
  , tsv = require('node-tsv-json')
  , fs = require('fs')
  , ini = require('ini')
  , express = require('express')

var app = express()

// read in db config file
var config = ini.parse( fs.readFileSync('./config.ini', 'utf-8') )

// take input args
var cf_node = process.argv[2]
var log_files = process.argv.slice(3)

/*
  app.get('/', function (req, res) {
     res.send('Hello World!');
  });

  app.listen(3000, function () {
      console.log(log_files);
      console.log("hello world 2");
  });
*/
// do input validation checking


// connect to mysql database
var pool = mysql.createPool(config.database)


// loop through and parse tsv logs
for (var i in log_files){
  tsv({
    input: log_files[i],
    parseRows: true
  }, function(err, result){
    if(err)
      console.error(err)
    else{
	    var rows = result.slice(0)
	    var imp_date = Date.now()
  
      get_rowcount_from_db()
      // loop through each row of file and store log informatino into 'log' object 
      for(var j in rows){
        var cols = rows[j]

      // console.log(result) 
        var log = {
          cfnode: cf_node,
          impdate: imp_date
        }

        /* 
         * structure is based on FusionReactor Request log format specification: http://docs.intergral.com/pages/viewpage.action?pageId=22478919
	  	  */
  	    log.date =     	    			cols[0]		//1.  The date on which this log entry was written.
        log.time = 	    	  			cols[1]		//2.  The time on which this log entry was written.
	  	  log.reqdatetimems =    		cols[2]		//3.  This is the millisecond time at which this request was started or finished (depending upon the Request Status.)
        log.version =     				cols[3]		//4.  Version number of this log entry.
	     	log.srvstartdatetimems = 	cols[4]		//5.  Startup time of the application server in milliseconds (ms) since epoch.
	    	log.reqid = 				      cols[5]		//6.  The FusionReactor Request ID.
	    	log.reqstatus = 			    cols[6]		//7.  The current state of the request.
	    	log.cpreason = 				    cols[7]		//8.  The reason given by Crash Protection for the current action.
  	  	log.threadid =				    cols[8]		//9.  The name of the thread responsible for responding to this request.
        log.clientip = 				    cols[9]		//10. The IP address of the machine making the request.
        log.reqmethod = 	  		  cols[10]	//11. This will usually be "GET" or "POST"
  	  	log.requrl = 				      cols[11]	//12. This is the requested URL.
  	  	log.reqexectimems =			  cols[12]	//13. The amount of milliseconds it took to complete the request. (For incomplete requests, this column will be 0.)
  	  	log.memorypctg = 			    cols[13]	//14. The amount of memory expressed as a percentage which was used when this request started or finished.
  	  	log.memorymax =				    cols[14]	//15. The total amount of physical memory available to this instance.
  	  	log.memoryused =			    cols[15]	//16. The amount of memory which was used when this request started or finished.
  	  	log.memorytotal =			    cols[16]	//17. The amount of memory which was allocated by the instance when this request started or finished.
  	  	log.memoryfree =			    cols[17]	//18. The amount of free memory (within the allocated block) when this request started or finished.
  	  	log.qstring =				      cols[18]	//19. If the URL has any parameters then they will appear here.
  	  	log.rstatuscode =			    cols[19]	//20. This is a HTTP return code such as 200 (OK,) 404 (Not found,) or 500 (Internal Server Error.) For "Started:" rows this column will be 200.
  	  	log.cputimems =				    cols[20]	//21. This is the amount of actual CPU time which this request required. (For incomplete requests, this column will be 0.)
  	  	log.amfmethod =				    cols[21]	//22. If AMF decoding is enabled (Request Settings) and there is AMF to decode, then the method names will appear here.
  	  	log.jsessionid =			    cols[22]	//23. The J2EE Session Id for this request.
  	  	log.cfid =					      cols[23]	//24. The CF Id for this request.
  	  	log.cftoken = 				    cols[24]	//25. The CFTOKEN for this request.
  	  	log.jdbcquerycnt = 			  cols[25]	//26. The number of JDBC queries run by this request at the time of this log.
  	  	log.jdbctotaltimems = 		cols[26]	//27. The total amount of time spent running JDBC queries at the time of this log.
  	  	log.jdbctotaldbtimems =		cols[27]	//28. The total amount of time spent by the database running JDBC queries at the time of this log.
  	  	log.jdbctotalrowcnt = 		cols[28]  //29. The total number of rows returned by JDBC queries at the time of this log.
  	  	log.bytessent =			    	cols[29]	//30. The amount of data which was sent back to the client.
  	  	log.firstbytetimems =	  	cols[30]	//31. The number of milliseconds it took to deliver the first bit of data.
  	  	log.lastbytetimems =	  	cols[31]	//32. The number of milliseconds it took to deliver the complete content. 
  	  	log.streamopentimems =		cols[32]	//33. The number of milliseconds before the data stream was opened.
  	  	log.streamclosetimems =		cols[33]	//34. The number of milliseconds until the completed data stream was closed.
  	  	log.agentstring =			    cols[34]	//35. A string representing the User Agent from which the request originated.  
        
        // build unique id
  	  	//log.logid = j + log.reqdatetimems + "" + String(log.impdate)
  	  	log.logid = j
		
        // send to database
        add_to_db(log)  
      }
    }
  })
}



function add_to_db(log){
  pool.getConnection( function(j, connection){
    connection.query('INSERT INTO request SET ?', log, function(e,r){
//      console.log(e)
      connection.release()
    }) 
  })
}



function get_rowcount_from_db(){ 
  pool.getConnection( function(e, connection){
    connection.query('SELECT count(*) as existCnt FROM request', function (e, r) {
      var rowcount = r[0].existCnt  
      console.log('The existing row count is: ', rowcount)
    })

    connection.release()
  }) 
}
