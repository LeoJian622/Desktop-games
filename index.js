//app.js

// BASE SETUP
// =============================================================================

// call the packages
var express      = require('express');        	// call express
var app          = express();                 	// define app using express
var bodyParser   = require('body-parser'); 		// configure app to use bodyParser()

var mongoose     = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tgame',{useMongoClient: true}); // connect to our database

var Card         = require('./app/models/card.js');		//call card model


app.use(express.static(__dirname + '/public')); // return static source

//get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port         = process.env.PORT || 3000;		// set port	

// ROUTES FOR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

/*
Route					HTTP Verb		Description
/api/cards				GET			Get all the cards.
/api/cards/:card		GET			Get a single card.
/api/cards				PUT         Rest all cards statuts.
*/

// middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });


// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });

// more routes for our API will happen here
// ----------------------------------------------------
router.route('/cards')

    // create a card (accessed at POST http://localhost:3000/api/cards)
    .post(function(req, res) {

var card         = new Card();        // create a new instance of the Card model
card.color       = req.body.color;  // set the cards color (comes from the request)
card.step        = req.body.step;	 // set the cards step (comes from the request)
card.flag        = req.body.flag;  // set the cards flag (comes from the request)
        // save the card and check for errors
        card.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Card created!' });
        });
    })
    // get all the cards (accessed at GET http://localhost:3000/api/cards)
    .get(function(req, res) {
        Card.find(function(err, cards) {
            if (err)
                res.send(err);

            res.json(cards);
        });
    });

 // on routes that end in /cards/:card_id
// ----------------------------------------------------
  router.route('/cards/:card_id')

    // get single the card (accessed at GET http://localhost:3000/api/cards/:card_id)
    .get(function(req, res){
    	Card.findById(req.params.card_id, function(err, card){
    		if (err)
    			res.send(err);
    		res.json(card);
    	});
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server has been started on port ' + port);

