const moment = require('moment');
const cfg = require('../config');
const Twilio = require('twilio');

function handler(arr){
	const activeUnpaidGroups = unpaidSort(arr);

	activeUnpaidGroups.forEach(g => {
		if(timeUntilDue(g) > 0){
			// payment is late
			// check day of month and text on 1st and 15th
			checkDayOfMonth([1,15], g);

		} else if(timeUntilDue(g) < 0) {
			// payment isnt due yet
			// check day of month and text on 1st
			checkDayOfMonth([1], g);
		} else {
			// due today
			checkDayOfMonth([moment().date()], g);
		}
	})
}

function checkDayOfMonth(arr, group){
	console.log('checkDayOfMonth called');
	const dayOfMonth = moment().date();
	const text = arr.some(day => {
		return day === dayOfMonth;
	});

	if(text){
		sendNotifications(group);
	} 
}


function unpaidSort(arr){
	const filteredGroups = [];

	arr.forEach(g => {
	  const newGroup = {};
	  const unpaid = g.members.filter(m => {
	    return m.completed === false;
	  })
	  newGroup.name = g.name;
	  newGroup.duedate = g.duedate;
	  newGroup.members = unpaid;

	  if(unpaid.length){
	  	filteredGroups.push(newGroup);
	  }

	})
	return filteredGroups;
}

function timeUntilDue(group){
	const now = moment();
	const due = moment(group.duedate);
	console.log('time diff: ', now.diff(due, 'days'));
	return now.diff(due, 'days');
}

function sendNotifications(group) {
	console.log('send notifications called');
    const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
    grousp.members.forEach(function(group) {
	    const options = {
	        to: `+ ${group.phone}`,
	        from: cfg.twilioPhoneNumber,
	        body: `Hi ${group.name}. This is an automated reminder that you still need to pay dues for the group: ${groups.name}.`,
	    };

	    // Send the message!
	    client.messages.create(options, function(err, response) {
	        if (err) {
	            // Just log it for now
	            console.error(err);
	        } else {
	            // Log the last few digits of a phone number
	            let masked = group.phoneNumber.substr(0,
	                group.phoneNumber.length - 5);
	            masked += '*****';
	            console.log(`Message sent to ${masked}`);
	        }
        });
    });
}

module.exports = handler;