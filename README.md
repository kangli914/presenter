# NodeJS Presenter 
Started a self learning project: A presenter using NodeJS, Chart.js and MysqlJS to better present coldfusion logs in performance dashbaord. This is an enhancement to the current performance dashboard project as fusionReactor failed to display lots of interesting metrics. The goal of this enhancement is to import the logs into a MySQL database. The MySQL database can than be queried to generate the performance metrics to allow for statistical analysis of the data to be performed. Statistical data has been defined and exposed in middle tire as web service(REST based) and can be extendable further. The metrics were displayed in chart typed base for viewing in front-end. 

The architecture is as follows:
* NodeJS (ExpressJS, MySQLJS)
* MySQL

NodeJS will serve as the middletier that serves the webcontent and talks to the database. ExpressJS is the framework to be used as the webserver. MySQLJS will interface with the MySQL database. 

Note for using template engine:
Request flow in Express
This is how a request to an Express server flows:
Route → Route Handler → Template → HTML
The route defines the URL schema. It captures the matching request and passed on control to the corresponding route handler. The route handler processes the request and passes the control to a template. The template constructs the HTML for the response and sends it to the browser.

A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page. When we have the back-end ready, let us focus on building the views for rendering the client. We are going to use a template engine which will help us create dynamic HTML views. Using this template we can define parts of the page that will be populated by the data from the backend and rest will be statically defined. 


## Setting Up
This guide assumes you have the development environment for Sahi already setup.

**1. Installing MySQL and configure mysql**
```
# apt-get install mysql-server
# mysql -u root -p
```
Then run the MySQL commands
```mysql
CREATE DATABASE `sahi_performance_logs`;
CREATE TABLE `logs` (
  `log_id` varchar(50) DEFAULT NULL,
  `environment` varchar(255) DEFAULT NULL,
  `test_id` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `time_ms` int(11) DEFAULT NULL,
  `details` text,
  UNIQUE KEY `log_id` (`log_id`)
) ;
```

**2. Install NodeJS and download npm packages**

Follow the guide provided by [NodeJS][1] to install NodeJS.
From the `userdata` folder, browse to the `presenter` folder, and run the command `npm install`.(this will install all the modules including express js included in the package".

if you have problem installing express js with the following error:
"tried a sudo npm install and this error came up:
npm ERR! Error: UNKNOWN, symlink '../user-home/cli.js'" 

Try the folllowing:
npm install express --no-bin-links


**3. Start the ExpressJS server**

To configure the which MySQL database is used, run the command while in the presenter folder: `cp config.ini.bak config.ini`. Edit the file and add the datab
ase information.

While in the `presenter` folder, run the command `screen -m -d npm start`. This will start a screen instance and run the webserver in the background. The server will listen on the port 3000. Thus, to interact with the server, all GET and POST requests will need to be done by <ip>:3000/. Instead of just <ip>. For example, if the server is on a machine with IP "1.0.0.10", an example GET request is shown below:

```
GET 1.0.0.10:3000/items/ 
``` 

## Using the Sahi Presenter

**1. Importing Sahi Logs**

After running the Sahi scripts, there should be logs on the harddisk. The first task is to import the logs using the NodeJS importer script (import.js). This script imports the log files into MySQL using MySQLJS. The usage and an example is shown below:
```bash
# usage
node importer.js <environment> [regex to log files]

# import production performance logs
node importer.js production ../production_logs/*.txt

# import release performance logs
node importer.js release ../logs/*.txt
```
To configure the which MySQL database is used, run the command while in the presenter folder: `cp config.ini.bak config.ini`. Edit the file and add the database information.

## API Documentation

The API is exposed through the ExpressJS module. This can be seen in the file `app.js` lines 23-38. The API is documented in the file [API.md](static/api/index.html)

The documentation is generated using swagger. Edit the swagger.yaml file to add the api documentation that maps to the routes defined in app.js. Then run the command `npm run-script docs` to generate the updated documentation contained in the `static/api/` folder.

Also, when the server is running, you can view the documentation as a webpage by browsing to '<ip>:3000/api/'

[1]: https://nodejs.org/en/download/package-manager/

