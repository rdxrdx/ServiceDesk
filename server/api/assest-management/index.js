'use strict';

var express = require('express');
var controller = require('./assestmanagement.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:category/categories', auth.isAuthenticated(), controller.showAssestmanagementsByCategory);
router.get('/:category/:departments', auth.isAuthenticated(), controller.searchAssestmanagements);
router.get('/:department/:departments', auth.isAuthenticated(), controller.searchAssestmanagementsBydepartment);

router.get('/', controller.index);  
router.get('/asset-report', controller.assetreport);  
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;