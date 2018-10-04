'use strict';

var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
Schema = mongoose.Schema;

var ratingSchema = new Schema({
	ratingId: {type: Number},
	ratingName: String,
	ratingDescription: String,
	status: {
		type: String,
		default: 1
	},
	added: {
		type : Date,
		default: Date.now
	},
	modified: {
		type : Date,
		default: Date.now
	}
});

module.exports = mongoose.model('rating', ratingSchema);
ratingSchema.plugin(autoIncrement.plugin, { model: 'Assettype', field: 'ratingId' });
