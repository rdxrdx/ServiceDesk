'use strict';

var service = require('./../mail.service.js');

var sendmail = function(name, email, mailConfirmationToken, callback){

    var user = {
    	name : name,
    	email : email,
    };
	//console.log(user);
    var locals = {
      name: user.name,
      COMPANY: 'Service Desk',
      CONFIRMATION_URL : 'http://localhost:8080/rating/',
      MAIL_RATING_TOKEN : mailRatingToken
    };
	//console.log(locals)

    service.sendMail('user_confirmation', user, 'Activation', locals, callback);

  };

exports.sendMail = sendmail;