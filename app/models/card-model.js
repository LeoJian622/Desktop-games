// app/models/card.js

var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var CardSchema = new Schema({
	color: 'String',
	step: 'Number',
	flag: 'Boolean'
});

module.exports = mongoose.model('Card', CardSchema);