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
// var crypto     = require('crypto'); //call crypto encryption
// var md5        = crypto.createHash('md5'); //md5 encryption

app.use(express.static(__dirname + '/public')); // return static source

app.get('/', function(req, res) { //访问非静态资源返回的文件
 	res.redirect('login.html');
});

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

	// get radom single card (accessed at GET http://localhost:3000/api/cards)
	.get(function(req, res) {
		res.json(cards.drawCard());
	})

	// rest all the cards (accessed at PUT http://localhost:3000/api/cards)
	.put(function(req, res){
		if(cards.resetCards()){
			res.json({messages:'Rest succeed!'});
		}else{
			res.json({messages:'Rest failed!'})
		}
	});

router.route('/cards/:cardid')	

	// brocast card data to all(accessed at GET http://localhost:3000/api/cards/cardid:)
	.get(function(req, res){
		var result = cards.getCard(req.params.cardid);
		res.json(result);
		//res.json({messages:'socket.io brocast!'});
	});

router.route('/user')

	//register user and password (accessed at POST http://localhost:3000/api/user)
	.post(function(req, res){
		var result = users.addUser(req.body);
		res.json(result);
	});

router.route('/user/:user/:pwd')

	//Authentication user and password (accessed at GET http://localhost:3000/api/user/username:)
	.get(function(req, res) {
		var result = users.authenticationUser({
			username: req.params.user,
			password: req.params.pwd
		});
		res.json(result);
	});

router.route('/user/:user')

	//loginout
	.put(function(req, res) {
		var result = users.loginout({
			username: req.params.user
		});
		res.json(result);
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
var server = app.listen(port,function() { //启动服务器
	console.log('Server  is on port ' + port + '!');
});
var io = require('socket.io')(server);

io.sockets.on('connection',function(socket){
    console.log('User connected');
    socket.on('disconnect',function(){
        console.log('User disconnected');
    });
});

