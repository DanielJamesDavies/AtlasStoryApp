module.exports = (object, path) => {
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

	return objectUnnested[objectUnnested.length - 1];
};
