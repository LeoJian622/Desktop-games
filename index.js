//app.js

// BASE SETUP
// =============================================================================

// call the packages
var express    = require('express'); // call express
var app        = express(); // define app using express
var bodyParser = require('body-parser'); // configure app to use bodyParser()

var Card       = require('./app/models/card.js'); //call card model
var cards      = new Card();
var User       = require('./app/models/user.js'); //call user model
var users      = new User();
app.use(express.static(__dirname + '/public')); // return static source

// app.use('/',function(req, res) { //访问非静态资源返回的文件
// 	res.redirect('/login.html');
// });

//get the data from a POST
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set port	

// ROUTES FOR API
// =============================================================================
var router     = express.Router(); // get an instance of the express Router

// more routes for our API will happen here
// ----------------------------------------------------
router.route('/cards')

	// get single card (accessed at GET http://localhost:3000/api/cards)
	.get(function(req, res) {
		res.json(cards.drawCard());
	})
	// brocast card data to all
	.post(function(req, res){
		res.json({messages:'socket.io brocast!'});
	})
	// rest all the cards (accessed at PUT http://localhost:3000/api/cards)
	.put(function(req, res){
		if(cards.resetCards()){
			res.json({messages:'Rest succeed!'});
		}else{
			res.json({messages:'Rest failed!'})
		}
	});

router.route('/user')
	//Authentication user and password (accessed at POST http://localhost:3000/api/user)
	.post(function(req, res){
		res.json(users.Authentication(req)?{messages:'Login succeed!',status:users.Authentication(req)}:{messages:'Login failed!',status:users.Authentication(req)});
	})



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server has been started on port ' + port);