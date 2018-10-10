/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Rating = require('./star.rating.model');

exports.register = function(socket) {
  Rating.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Rating.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('issue:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('issue:remove', doc);
}

