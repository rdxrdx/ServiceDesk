'use strict';

var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment'),
Schema = mongoose.Schema;

var RatingSchema = new Schema({
    issueDescription: String,
    issueRating: {type: Schema.Types.ObjectId, ref: 'Rating' },
    //issueStatus: {type: Schema.Types.ObjectId, ref: 'IssueStatus',  default: '5923ea094632f26f5d77bf5f'}, // completed?
    issueUser: {type: Schema.Types.ObjectId, ref: 'User'},
    issueDivision: {type: Schema.Types.ObjectId, ref: 'Division' },
    issueDivisionId: {type: Number, ref: 'Division' },
    reportedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    issueContactNumber: String,
    comments: {},
    status: {
        type: String,
        default: 1
    },
    added: {
        type: Date,
        default: Date.now
    },
    assigned: {
        type: Date,
    },
    closed: {
        type: Date
    },
    modified: {
        type: Date,
        default: Date.now
    }
    
    
    
    
    
});

module.exports = mongoose.model('Category', RatingSchema);
RatingSchema.plugin(autoIncrement.plugin, { model: 'Assettype', field: 'categoryId' });
