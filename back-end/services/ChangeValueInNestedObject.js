module.exports = (object, path, newValue) => {
	let objectUnnested = [object];

	for (let i = 0; i < path.length; i++) {
		let nextLevel = objectUnnested[i][path[i]];
		if (nextLevel === undefined && i !== path.length - 1) {
			if (Number.isInteger(path[i + 1])) {
				nextLevel = [];
			} else {
				nextLevel = {};
			}
		}
		objectUnnested.push(nextLevel);
	}

	objectUnnested[objectUnnested.length - 1] = newValue;

	for (let i = path.length - 1; i >= 0; i--) {
		let tempStorySubobject = objectUnnested.pop();
		objectUnnested[objectUnnested.length - 1][path[i]] = tempStorySubobject;
	}

	return objectUnnested[0];
};
