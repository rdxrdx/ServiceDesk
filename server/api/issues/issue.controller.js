'use strict';
var kue = require('kue'); 
var queue = kue.createQueue();

var _ = require('lodash');
var Issue = require('./issue.model');
var nodemailer = require('nodemailer');
var Templation  = require('nodemailer-templation');
var path        = require('path');
var mail = require('../../mail');


//kue

/*_id: {
                issuePriority: "$issuePriorityId", 
                  priorityId: "$issuePriority"  
                 },
            count: {
                $sum: 1
            }*/

// Incident Status Reports
exports.resolution = function(req, res) {
	Issue.find().sort(
    { 
        issuePriorityId : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .exec(function (err, issues) {
        var items = issues;
		if(err) { return handleError(res, err); }
        else {
            var temp = items.reduce(function(p,c){
                var defaultValue = {
                x: c.issueStatus.issueStatusName,
                y: 0
                };
                p[c.issueStatus.issueStatusName] = p[c.issueStatus.issueStatusName] || defaultValue
                p[c.issueStatus.issueStatusName].y++;
                
                return p;
            }, {});
            
            var result = [];
            for( var k in temp ){
                result.push(temp[k]);
            }
            console.log(result)
            return res.json(200, result);
            
        }
	});
};

// Incident Status Reports
exports.dashb = function(req, res) {
	Issue.find().sort(
    { 
        issuePriorityId : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .exec(function (err, issues) {
        var items = issues;
		if(err) { return handleError(res, err); }
        else {
            var temp = items.reduce(function(p,c){
                var defaultValue = {
                x: c.issueStatus.issueStatusName,
                y: 0
                };
                p[c.issueStatus.issueStatusName] = p[c.issueStatus.issueStatusName] || defaultValue
                p[c.issueStatus.issueStatusName].y++;
                
                return p;
            }, {});
            
            var result = [];
            for( var k in temp ){
                result.push(temp[k]);
            }
            console.log(result)
            return res.json(200, result);
            
        }
	});
};



// Incident Status Reports
exports.prioritisation = function(req, res) {
	Issue.find({
        issueStatus : req.params.status
    }).sort(
    { 
        issuePriorityId : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .exec(function (err, issues) {
        var items = issues;
		if(err) { return handleError(res, err); }
        else {
            var temp = items.reduce(function(p,c){
                var defaultValue = {
                    x: c.issuePriority.priorityName,
                    y: 0
                };
                p[c.issuePriority.priorityName] = p[c.issuePriority.priorityName] || defaultValue
                p[c.issuePriority.priorityName].y++;
                
                return p;
            }, {});
            
            var result = [];
            for( var k in temp ){
                result.push(temp[k]);
            }
            console.log(result)
            return res.json(200, result);
            
        }
	});
};
/*// Incident Status Reports

exports.data = function(req, res) {

    Issue.find().sort(
        { 
            issuePriorityId : -1.0
        })
        .populate('issueCategory','categoryName categoryId')
        .populate('issueStatus','issueStatusName issueStatusId')
        .populate('issueChannel','channelName channelId')
        .populate('issuePriority','priorityName prioritySLA priorityId')
        .populate('issueDivision','divisionName divisionId')
        .populate('issueUser','firstName')
        .exec(function (err, issues) {

            var items = issues;
        
        if(err) { return handleError(res, err); }
        else {
            var temp = items.reduce(function(p,c){
                var defaultValue = {
                    x: c.issueStatus.issueStatusName,
                    y: 0
                };
                p[c.issueStatus.issueStatusName] = p[c.issueStatus.issueStatusName] || defaultValue
                p[c.issueStatus.issueStatusName].y++;
                
                return p;
            }, {});
            var result = [];
            for( var k in temp ){
                result.push(temp[k]);
            }
            console.log(result)
            return res.json(200, result);
        }

    });
};*/



// Incident Status Reports
exports.data = function(req, res) {
	Issue.find().sort(
    { 
        issuePriorityId : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .exec(function (err, issues) {
        var items = issues;
		if(err) { return handleError(res, err); }
        else {
            var temp = items.reduce(function(p,c){
                var defaultValue = {
                x: c.issueStatus.issueStatusName,
                y: 0
                };
                p[c.issueStatus.issueStatusName] = p[c.issueStatus.issueStatusName] || defaultValue
                p[c.issueStatus.issueStatusName].y++;
                
                return p;
            }, {});
            
            var result = [];
            for( var k in temp ){
                result.push(temp[k]);
            }
            console.log(result)
            return res.json(200, result);
            
        }
	});
};


// Get list of visitors
exports.index = function(req, res) {
	Issue.find().sort(
    { 
        issuePriorityId : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .populate('reportedBy','firstName')
    .exec(function (err, issues) {
		if(err) { return handleError(res, err); }
        return res.json(200, issues);
            
	});
};

// Get list of Incidents By User
exports.getIssueByUser = function(req, res) {
	Issue.find({
        issueUser : req.params.assignedUser
    }).sort(
    { 
        issuePriorityId : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .populate('reportedBy','firstName')
    .exec(function (err, issues) {
		if(err) { return handleError(res, err); }
		return res.json(200, issues);
	});
};

// Get list of Incidents By Reporter
exports.getIssueByReporter = function(req, res) {
	Issue.find({
        reportedBy : req.params.assignedUser
    }).sort(
    { 
        issuePriorityId : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .populate('reportedBy','firstName')
    .exec(function (err, issues) {
		if(err) { return handleError(res, err); }
		return res.json(200, issues);
	});
};

// Get a single issue
exports.show = function(req, res) {
	Issue.findById({
		_id:req.params.id
	}).sort({added:1})
	.populate('issueCategory','categoryName')
    .populate('issueStatus','issueStatusName')
    .populate('issueChannel','channelName')
    .populate('issuePriority','priorityName prioritySLA')
    .populate('issueDivision','divisionName')
    .populate('issueUser','firstName')
    .populate('reportedBy','firstName')
	.exec(function (err, issues) {
	if(err) { return handleError(res, err); }
	return res.json(200, issues)
});
};

// Creates a new issue in the DB.
exports.create = function(req, res) {
	Issue.create(req.body, function(err, issue) {
        
        queue.create('mduze@skhomotech.co.za', {  
         title: 'Testing Issues',
            to: 'mduze@skhomotech.co.za',
        template: 'checking the issue '+ req.body.issueDescription

            

        }).priority('high').attempts(5).save();
        
        
        
		if(err) { return handleError(res, err); }
		return res.json(201, issue);
	});
};

// Updates an existing jobcard in the DB.

exports.update = function(req, res) {
if(req.body._id) {
delete req.body._id; }

Issue.findById(req.params.id,function (err,issue) {
if(req.body.comments) {
 issue.comments = req.body.comments;
 }

if (req.body.closed) { issue.closed = req.body.closed;
}



//Sending Email when the issues is closed

// processing email using nodemailer 

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
       user: 'smangele.feliciamthembu@gmail.com',
       pass: 'Mpiza@123'
}

});

var mailOptions = {
                     from: 'ssmangele.feliciamthembu@gmail.com',// sender address
                       to: 'mohaumofokeng18@gmail.com',// list of receivers
                  subject: 'Service Rating', 
                  COMPANY: 'Service Desk',
                //   CONFIRMATION_URL : 'http://localhost:8080/rating',
                //   MAIL_CONFIRMATION_TOKEN : mailConfirmationToken,
                    
                    html: '<head>' +
                    
                    '<body style="margin-top: 0;margin-bottom: 0;margin-left: 0;margin-right: 0;padding-top: 0;padding-bottom: 20;padding-left: 20;padding-right: 20;min-width: 100%;background-color: #f5f5f5">' +
                    '<table class="main-wrapper" style="border-collapse: collapse;border-spacing: 0;display: table;table-layout: fixed; margin: 0 auto; -webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-rendering: optimizeLegibility;background-color: #f5f5f5; width: 100%;">' +
                    '<tbody><tr><td style="padding: 50;vertical-align: top" class="">' +
                    '<div class="bottom-padding" style="margin-bottom: 0px; line-height: 30px; font-size: 30px;">&nbsp;</div></td></tr>' +
                    '<tr><td style="padding: 50;vertical-align: top; width: 100%;" class=""><center>' +
                    '<center><table><tr><td class="ms-sixhundred-table" width="800">' + 
                    '<table class="main-content" style="width: 100%; max-width: 800px; border-collapse: separate;border-spacing: 0;margin-left: auto;margin-right: auto; border: 1px solid #EAEAEA; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; background-color: #ffffff; overflow: hidden;" width="600">' +
                    '<tbody><tr><td style="padding: 20;vertical-align: top;">' +
                    '<table class="main-content" style="border-collapse: collapse;border-spacing: 0;margin-left: auto;margin-right: auto;width: 100%; max-width: 600px;">' +
                    '<tbody><tr><td style="padding: 20;vertical-align: top;text-align: left">' +
                    '<table class="contents" style="border-collapse: collapse;border-spacing: 0;width: 100%;">' +
                    '<tbody><tr><td class="content-padding" style="padding: 20;vertical-align: top">' +
                    '<div style="margin-bottom: 0px; line-height: 30px; font-size: 30px;">&nbsp;</div>' +
                    '<div class="body-copy" style="margin: 0;">' + 
                    '<div style="margin: 5;color: #60666d;font-size: 50px;font-family: sans-serif;line-height: 20px; text-align: left;">' +
                    
                                                                                                    '<div class="bottom-padding" style="margin-bottom: 10px; line-height: 15px; font-size: 15px;">&nbsp;</div>' + '<br>' +
                                                                                                    '<div style="text-align: left; margin: 5; font-size: 10px;  text-transform: uppercase; letter-spacing: .5px;"><p style ="font-family: Arial, Helvetica, sans-serif;">Dear Miliswa Gwetsa, </p></div>' +
                                                                                                    '<div style="text-align: left; margin: 5; font-size: 10px;  text-transform: uppercase; letter-spacing: .5px;"><p style ="font-family: Arial, Helvetica, sans-serif;">Your request number 125786348374 has been closed.</p></div>' +
                                                                                                    '<div style="text-align: left; margin: 5; font-size: 10px;  text-transform: uppercase; letter-spacing: .5px;"><p style ="font-family: Arial, Helvetica, sans-serif;">We hope that your request was resolved to your satisfaction. If you feel that your request was not resolved satisfactorily, please reply to this email. </p></div>' + '<br>' +
                                                                                                    '<div style="text-align: left; margin: 5; font-size: 10px;  text-transform: uppercase; letter-spacing: .5px;"><p style ="font-family: Arial, Helvetica, sans-serif;">Sincerely,</p></div>' +
                                                                                                    '<div style="text-align: left; margin: 5; font-size: 10px;  text-transform: uppercase; letter-spacing: .5px;"><p style = "font-family: Arial, Helvetica, sans-serif;">Skhomo Service Desk Team</p></div>' + '<br>' +
                                                                                                    '<div style = border: 1px solid #ddd;border-radius: 4px;padding: 5px;width: 25px;height: auto;display: block;margin-left: auto;margin-right: auto; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"><img src="http://www.pnet.co.za/upload_za/logo/S/logoSkhomo-Technologies-18249ZEN.gif" alt="" width="150"' + '<br>' +
                                                                                                    '<hr>' +
                                                                                                   
                                                                                                    '<div style="margin: 5;color: #60666d;font-size: 50px;font-family: sans-serif;line-height: 20px; text-align: left;">' +
                                                                                                    '<div class="bottom-padding" style="margin-bottom: 0px; line-height: 7px; font-size: 7px;">&nbsp;</div>' +
                                                                                                    '<div style="width: 100%; text-align: center; float: left;">'+ '<div class="rating" style="text-align: center; margin: 0; font-size: 50px; width: 275px; margin: 0 auto; margin-top: 10px;">' +
                    
                                                                                                    '<table style="border-collapse: collapse;border-spacing: 0;width: 275px; margin: 0 auto; font-size: 50px; direction: rtl;" dir="rtl">' +
                                                                                                        '<tbody><tr><td style="padding: 0;vertical-align: top;" width="55" class="star-wrapper" lang="x-star-wrapper">' +
                                                                                                                '<div style="display: block; text-align: center; float: left;width: 55px;overflow: hidden;line-height: 60px;">' +
                                                                                                                    '<a href="http://example.com/?rating=5" class="star" target="_blank" lang="x-star-divbox" style="color: #FFCC00; text-decoration: none; display: inline-block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;" tabindex="1">' +
                                                                                                                        '<div lang="x-empty-star" style="margin: 0;display: inline-block;">☆</div>' +
                                                                                                                        '<div lang="x-full-star" style="margin: 0;display: inline-block; width:0; overflow:hidden;float:left; display:none; height: 0; max-height: 0;">★</div></a>' +
                                                                                                                    '<a href="http://example.com/?rating=5" class="star-number" target="_blank" lang="x-star-number" style="font-family: sans-serif;color: #AEAEAE; font-size: 14px; line-height: 14px; text-decoration: none; display: block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;border-bottom: 3px solid #FFFFFF; text-align: center;">5</a></div></td>' +
                                                                                                            '<td style="padding: 0;vertical-align: top" width="55" class="star-wrapper" lang="x-star-wrapper">' +
                                                                                                                '<div style="display: block; text-align: center; float: left;width: 55px;overflow: hidden;line-height: 60px;">' +
                                                                                                                    '<a href="http://example.com/?rating=4" class="star" target="_blank" lang="x-star-divbox" style="color: #FFCC00; text-decoration: none; display: inline-block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;" tabindex="2">' +
                                                                                                                        '<div lang="x-empty-star" style="margin: 0;display: inline-block;">☆</div>' +
                                                                                                                        '<div lang="x-full-star" style="margin: 0;display: inline-block; width:0; overflow:hidden;float:left; display:none; height: 0; max-height: 0;">★</div></a>' +
                                                                                                                    '<a href="http://example.com/?rating=4" class="star-number" target="_blank" lang="x-star-number" style="font-family: sans-serif;color: #AEAEAE; font-size: 14px; line-height: 14px; text-decoration: none; display: block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;border-bottom: 3px solid #FFFFFF; text-align: center;">4</a></div></td>' +
                                                                                                            '<td style="padding: 0;vertical-align: top" width="55" class="star-wrapper" lang="x-star-wrapper">' +
                                                                                                                '<div style="display: block; text-align: center; float: left;width: 55px;overflow: hidden;line-height: 60px;">' +
                                                                                                                    '<a href="http://example.com/?rating=3" class="star" target="_blank" lang="x-star-divbox" style="color: #FFCC00; text-decoration: none; display: inline-block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;" tabindex="3">' +
                                                                                                                        '<div lang="x-empty-star" style="margin: 0;display: inline-block;">☆</div>' +
                                                                                                                        '<div lang="x-full-star" style="margin: 0;display: inline-block; width:0; overflow:hidden;float:left; display:none; height: 0; max-height: 0;">★</div></a>' +
                                                                                                                    '<a href="http://example.com/?rating=3" class="star-number" target="_blank" lang="x-star-number" style="font-family: sans-serif;color: #AEAEAE; font-size: 14px; line-height: 14px; text-decoration: none; display: block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;border-bottom: 3px solid #FFFFFF; text-align: center;">3</a></div></td>' +
                                                                                                            '<td style="padding: 0;vertical-align: top" width="55" class="star-wrapper" lang="x-star-wrapper">' +
                                                                                                                '<div style="display: block; text-align: center; float: left;width: 55px;overflow: hidden;line-height: 60px;">' +
                                                                                                                    '<a href="http://example.com/?rating=2" class="star" target="_blank" lang="x-star-divbox" style="color: #FFCC00; text-decoration: none; display: inline-block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;" tabindex="4">' +
                                                                                                                        '<div lang="x-empty-star" style="margin: 0;display: inline-block;">☆</div>' +
                                                                                                                        '<div lang="x-full-star" style="margin: 0;display: inline-block; width:0; overflow:hidden;float:left; display:none; height: 0; max-height: 0;">★</div></a>' +
                                                                                                                    '<a href="http://example.com/?rating=2" class="star-number" target="_blank" lang="x-star-number" style="font-family: sans-serif;color: #AEAEAE; font-size: 14px; line-height: 14px; text-decoration: none; display: block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;border-bottom: 3px solid #FFFFFF; text-align: center;">2</a></d></td>' +
                                                                                                            '<td style="padding: 0;vertical-align: top" width="55" class="star-wrapper" lang="x-star-wrapper">' +
                                                                                                                '<div style="display: block; text-align: center; float: left;width: 55px;overflow: hidden;line-height: 60px;">' +
                                                                                                                    '<a href="http://example.com/?rating=1" class="star" target="_blank" lang="x-star-divbox" style="color: #FFCC00; text-decoration: none; display: inline-block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;" tabindex="5">' +
                                                                                                                        '<div lang="x-empty-star" style="margin: 0;display: inline-block;">☆</div>' +
                                                                                                                        '<div lang="x-full-star" style="margin: 0;display: inline-block; width:0; overflow:hidden;float:left; display:none; height: 0; max-height: 0;">★</div></a>' +
                                                                                                                    '<a href="http://example.com/?rating=1" class="star-number" target="_blank" lang="x-star-number" style="font-family: sans-serif;color: #AEAEAE; font-size: 14px; line-height: 14px; text-decoration: none; display: block;height: 50px;width: 55px;overflow: hidden;line-height: 60px;border-bottom: 3px solid #FFFFFF; text-align: center;">1</a></d></td>' + 
                                                                                                                    '<td style="padding: 0;vertical-align: top" width="55" class="star-wrapper" lang="x-star-wrapper">' +
                                                                                                                '<div style="display: block; text-align: center; float: left;width: 55px;overflow: hidden;line-height: 60px;">' +
                                                                                                                    '</a></div></td></tr></tbody></table></div></div>' + '<br>' +
                                                                                                                    
                                                                                                             
                                                                                                                    
'</div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></center></center></td></tr></tbody></table></body>'
                                                                                                        
                    
                     
};
                    transporter.sendMail(mailOptions, null) 
 
});

transporter.sendMail(mailOptions,function (err,info) {
if(err)
console.log(err)
else
console.log(info);
});

if (err) {
return handleError(res,err); 
}
if(!issue) {
return res.send(404); }

var updated = _.merge(issue, req.body);
updated.markModified('comments');
updated.save(function (err) {
 if (err) {
return handleError(res,
err); 
}

return res.json(200,
issue);

        });

};


//});



// Deletes a issue from the DB.
exports.destroy = function(req, res) {
	Issue.findById(req.params.id, function (err, issue) {
		if(err) { return handleError(res, err); }
		if(!issue) { return res.send(404); }
		if(config.env != 'demo') {
			issue.remove(function(err) {
				if(err) { return handleError(res, err); }
				return res.send(204);
			});
		} else {
			res.send(200);
		}
	});
};


// Search Issue
exports.searchIssues = function(req, res) {
	Issue.find({
		issueCategory:req.params.category,
		issueStatus:req.params.status
	}).sort(
    { 
        "issuePriorityId" : -1.0
    })
	  .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .populate('reportedBy','firstName')
    .exec(function (err, issues) {
		if(err) { return handleError(res, err); }
		return res.json(200, issues);
	});
};


 //10.1.2 Incident Source Report
exports.sourceReport = function(req, res) {
    Issue.find().sort(
        { 
            issuePriorityId : -1.0
        })
        .populate('issueCategory','categoryName categoryId')
        .populate('issueStatus','issueStatusName issueStatusId')
        .populate('issueChannel','channelName channelId')
        .populate('issuePriority','priorityName prioritySLA priorityId')
        .populate('issueDivision','divisionName divisionId')
        .populate('issueUser','firstName')
        .exec(function (err, issues) {
        var items = issues;
        if(err) { return handleError(res, err); }
        else {
            var temp = items.reduce(function(p,c){
                var defaultValue = {
                    x: c.issueChannel.channelName,
                    y: 0
                };
                p[c.issueChannel.channelName] = p[c.issueChannel.channelName] || defaultValue
                p[c.issueChannel.channelName].y++;
                return p;
            }, {});
            
            var result = [];
            for( var k in temp ){
                result.push(temp[k]);
            }
            console.log(result)
            return res.json(200, result);
        }
    });
};

// Search Issue By Category
exports.showIssuesByCategory = function(req, res) {
	Issue.find({
		issueCategory:req.params.category
	}).sort(
    { 
        "issuePriorityId" : -1.0
    })
	.populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .populate('reportedBy','firstName')
  .exec(function (err, issues) {
		if(err) { return handleError(res, err); }
		return res.json(200, issues);
	});
};

// Search Issues By Status
exports.showJobIssuesByStatus = function(req, res) {
	Issue.find({
		issueStatus:req.params.status
	}).sort(
    { 
        "issuePriorityId" : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .populate('reportedBy','firstName')
    .exec(function (err, issues) {
		if(err) { return handleError(res, err); }
		return res.json(200, issues);
	});
};

// Search Issues By Date
exports.showJobIssuesByDate = function(req, res) {
    var dateRange = JSON.parse(req.params.dateRange);
    var startDate = new Date(dateRange[0]),
        endDate = new Date(dateRange[1]);
	Issue.find({
        added: {
            $gte: new Date(startDate),
            $lt: new Date(endDate)
        }
	}).sort(
    { 
        "issuePriorityId" : -1.0
    })
    .populate('issueCategory','categoryName categoryId')
    .populate('issueStatus','issueStatusName issueStatusId')
    .populate('issueChannel','channelName channelId')
    .populate('issuePriority','priorityName prioritySLA priorityId')
    .populate('issueDivision','divisionName divisionId')
    .populate('issueUser','firstName')
    .populate('reportedBy','firstName')
    .exec(function (err, issues) {
		if(err) { return handleError(res, err); }
		return res.json(200, issues);
	});
};

function handleError(res, err) {
	return res.send(500, err);
}
