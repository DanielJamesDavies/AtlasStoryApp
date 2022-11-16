module.exports = (object, path, newValue) => {
	let objectUnnested = [object];

	for (let i = 0; i < path.length; i++) {
		let subobject = objectUnnested[i][path[i]];
		if (subobject === undefined && i !== path.length - 1) {
			if (Number.isInteger(path[i + 1])) {
				subobject = [];
			} else {
				subobject = {};
			}
		}
		objectUnnested.push(subobject);
	}

	objectUnnested[objectUnnested.length - 1] = newValue;

	for (let i = path.length - 1; i >= 0; i--) {
		let tempStorySubobject = objectUnnested.pop();

		if (tempStorySubobject !== undefined) {
			objectUnnested[objectUnnested.length - 1][path[i]] = tempStorySubobject;
		} else {
			delete objectUnnested[objectUnnested.length - 1][path[i]];
		}
	}

	return objectUnnested[0];
};
