/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'football_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


// Home page
app.get('/', function(req, res) {
	res.render('pages/main',{
		local_css:"resources/css/style",
		my_title:"Home Page"
	});
});

// registration page
app.get('/main', function(req, res) {
	res.render('pages/main',{
		my_title:"Search Page"
	});
});

// registration page
app.get('/reviews', function(req, res) {
	res.render('pages/reviews',{
		my_title:"Reviews Page"
	});
});



// /*Add your other get/post request handlers below here: */
// app.get('/home', function(req, res) {
// 	var query = 'select * from favorite_colors;';
// 	db.any(query)
//         .then(function (rows) {
//             res.render('pages/home',{
// 				my_title: "Home Page",
// 				data: rows,
// 				color: '',
// 				color_msg: ''
// 			})
//
//         })
//         .catch(function (err) {
//             console.log('error', err);
//             res.render('pages/home', {
//                 my_title: 'Home Page',
//                 data: '',
//                 color: '',
//                 color_msg: ''
//             })
//         })
// });



app.listen(3000);
console.log('3000 is the magic port');
