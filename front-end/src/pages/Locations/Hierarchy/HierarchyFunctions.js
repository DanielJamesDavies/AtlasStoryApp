export const HierarchyFunctions = () => {
	function getPathToItemInHierarchy(itemId, newHierarchy) {
		let hierarchyUnnested = [JSON.parse(JSON.stringify(newHierarchy))];
		let path = [];
		let visited = [];

		while (path[path.length - 1] !== itemId && hierarchyUnnested.length !== 0) {
			const currItemIndex = hierarchyUnnested[hierarchyUnnested.length - 1].findIndex((e) => !visited.includes(e._id));
			const currItem = hierarchyUnnested[hierarchyUnnested.length - 1][currItemIndex];

			if (currItemIndex === -1) {
				visited.push(hierarchyUnnested[hierarchyUnnested.length - 2][path.pop()]._id);
				hierarchyUnnested.pop();
				continue;
			}

			if (currItem._id === itemId) {
				path.push(currItemIndex);
				break;
			}

			if (currItem.children.length !== 0) {
				path.push(currItemIndex);
				hierarchyUnnested.push(currItem.children);
			} else {
				visited.push(currItem._id);
			}
		}

		if (hierarchyUnnested.length === 0) return false;

		return path;
	}

	function getItemInHierarchyFromPath(path, newHierarchy) {
		let item = JSON.parse(JSON.stringify(newHierarchy));
		for (let i = 0; i < path.length; i++) {
			if (i === 0) {
				item = item[path[i]];
			} else {
				item = item.children[path[i]];
			}
		}
		return item;
	}

	function changeItemInHierarchy(path, newValue, oldHierarchy) {
		let objectUnnested = [JSON.parse(JSON.stringify(oldHierarchy))];

		for (let i = 0; i < path.length; i++) {
			if (i === 0) {
				objectUnnested.push(objectUnnested[0][path[i]]);
			} else {
				objectUnnested.push(objectUnnested[objectUnnested.length - 1].children[path[i]]);
			}
		}

		objectUnnested[objectUnnested.length - 1] = newValue;

		for (let i = path.length - 1; i >= 0; i--) {
			let tempStorySubobject = objectUnnested.pop();

			if (tempStorySubobject !== undefined) {
				if (i > 0) {
					objectUnnested[objectUnnested.length - 1].children[path[i]] = tempStorySubobject;
				} else {
					objectUnnested[objectUnnested.length - 1][path[i]] = tempStorySubobject;
				}
			} else {
				delete objectUnnested[objectUnnested.length - 1][path[i]];
			}
		}

		return objectUnnested[0];
	}

	return { getPathToItemInHierarchy, getItemInHierarchyFromPath, changeItemInHierarchy };
};
