/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var rating = require('./rating.model');

exports.register = function(socket) {
  rating.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  rating.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('rating:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('rating:remove', doc);
}
