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

module.exports = unpaidSort;