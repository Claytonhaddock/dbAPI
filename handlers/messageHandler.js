const moment = require('moment');

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

function determineTime(group){
	const now = Date.now();
	const due = moment(group.duedate);
	return now.diff(due, 'days');
}

module.exports = { unpaidSort, determineTime };