module.exports = (object, path) => {
	let objectUnnested = [object];

	for (let i = 0; i < path.length; i++) {
		let subobject = objectUnnested[i][path[i]];

		if (subobject === undefined && typeof objectUnnested[i] === "array")
			subobject = objectUnnested[i].find((e) => e._id === path[i] || e.id === path[i]);

		if (subobject === undefined && i !== path.length - 1) {
			if (Number.isInteger(path[i + 1])) {
				subobject = [];
			} else {
				subobject = {};
			}
		}

		objectUnnested.push(subobject);
	}

	return objectUnnested[objectUnnested.length - 1];
};
