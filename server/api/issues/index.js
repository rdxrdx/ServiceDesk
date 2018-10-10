'use strict';

var express = require('express');
var controller = require('./issue.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/data', auth.isAuthenticated(), controller.data);
router.get('/resolution', auth.isAuthenticated(), controller.resolution);
router.get('/dashb', controller.dashb);
router.get('/sourceReport', auth.isAuthenticated(), controller.sourceReport);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:category/categories', auth.isAuthenticated(), controller.showIssuesByCategory);
router.get('/assignedUser/:assignedUser', auth.isAuthenticated(), controller.getIssueByUser);
router.get('/reportedBy/:assignedUser', auth.isAuthenticated(), controller.getIssueByReporter);
router.get('/date/:dateRange', auth.isAuthenticated(), controller.showJobIssuesByDate);
router.get('/prioritisation/:status', auth.isAuthenticated(), controller.prioritisation)

router.get('/:status/statuses', auth.isAuthenticated(), controller.showJobIssuesByStatus);
 router.get('/:status/closed', auth.isAuthenticated(), controller.showClosedIssuesByCategory);

router.get('/:category/:status', auth.isAuthenticated(), controller.searchIssues);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
