function unpaidSort(arr){
	const filteredGroups = [1];

	arr.forEach(g => {
	  const newGroup = {};
	  const unpaid = g.members.filter(m => {
	    return m.completed === false;
	  })
	  newGroup.name = g.name;
	  newGroup.duedate = g.duedate;
	  newGroup.members = unpaid;

	  // if(unpaid.length){
	  	filteredGroups.push();
	  // }

	})
	return filteredGroups;
}

module.exports = unpaidSort;