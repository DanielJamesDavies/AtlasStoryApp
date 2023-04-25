// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic
import { HierarchyFunctions } from "../HierarchyFunctions";

// Context
import { LocationsContext } from "../../LocationsContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const HierarchyListLogic = () => {
	const { locationTypes, isAuthorizedToEdit, story, changeStoryHierarchy, locations, setLocations, setIsDisplayingCreateHierarchyItemForm } =
		useContext(LocationsContext);
	const { APIRequest } = useContext(APIContext);
	const { getPathToItemInHierarchy, getItemInHierarchyFromPath, changeItemInHierarchy } = HierarchyFunctions();

	const [items, setItems] = useState([]);

	useEffect(() => {
		function getItems() {
			if (!story?.data?.locationsHierarchy) return setItems([]);

			let newItems = [];

			story?.data?.locationsHierarchy.map((item) => {
				newItems = newItems.concat(getFlattenedItemsFromParent(item, 0, true));
				return true;
			});

			setItems(newItems);
		}

		function getFlattenedItemsFromParent(item, level, isVisible) {
			let items = [
				{ _id: item?._id, level, isVisible, isChildrenVisible: item?.isChildrenVisible, hasChildren: item?.children?.length !== 0 },
			];
			if (item?.children) {
				item.children.map((child) => {
					items = items.concat(getFlattenedItemsFromParent(child, level + 1, isVisible ? item?.isChildrenVisible : false));
					return true;
				});
			}
			return items;
		}

		getItems();
	}, [setItems, story]);

	const [isReorderingHierarchyItems, setIsReorderingHierarchyItems] = useState(false);
	function toggleIsReorderingHierarchyItems() {
		setIsReorderingHierarchyItems((oldIsReorderingHierarchyItems) => !oldIsReorderingHierarchyItems);
	}

	function getNewParentItemId(from, to, newHierarchy) {
		let parentItem = false;

		let newItems = JSON.parse(JSON.stringify(items));
		const fromItem = locations.find((e) => e._id === newItems[from]?._id);
		let toItem = false;
		if (from < to) {
			toItem = locations.find((e) => e._id === newItems[to]?._id);
		} else {
			toItem = locations.find((e) => e._id === newItems[to - 1]?._id);
		}

		const toItemPath = getPathToItemInHierarchy(toItem._id, newHierarchy);
		const parentPath = JSON.parse(JSON.stringify(toItemPath));
		const possibleParents = locationTypes.find((e) => e.type === fromItem.type)?.possibleParents;

		for (let i = 0; i < toItemPath.length - 1; i++) {
			const parent = locations.find((e) => e._id === getItemInHierarchyFromPath(parentPath, newHierarchy)?._id);
			parentPath.pop();
			if (parent === undefined) continue;
			if (possibleParents.includes(parent.type)) {
				parentItem = parent._id;
				break;
			}
		}

		return parentItem;
	}

	function removeItemFromParent(itemId, inputHierarchy) {
		let newHierarchy = JSON.parse(JSON.stringify(inputHierarchy));

		const itemPath = getPathToItemInHierarchy(itemId, newHierarchy);
		const oldParentItemPath = JSON.parse(JSON.stringify(itemPath));
		const oldItemIndex = oldParentItemPath.pop();

		let hierarchyOldParentItem = getItemInHierarchyFromPath(oldParentItemPath, newHierarchy);
		if (oldParentItemPath.length === 0) {
			hierarchyOldParentItem.splice(oldItemIndex, 1);
		} else {
			hierarchyOldParentItem.children.splice(oldItemIndex, 1);
		}

		newHierarchy = changeItemInHierarchy(oldParentItemPath, hierarchyOldParentItem, newHierarchy);

		return newHierarchy;
	}

	function addItemToParent(item, newParentItemId, oldInputHierarchy, newInputHierarchy) {
		let oldHierarchy = JSON.parse(JSON.stringify(oldInputHierarchy));
		let newHierarchy = JSON.parse(JSON.stringify(newInputHierarchy));

		const itemPath = getPathToItemInHierarchy(item._id, oldHierarchy);
		const hierarchyItem = getItemInHierarchyFromPath(itemPath, oldHierarchy);
		const newParentItemPath = getPathToItemInHierarchy(newParentItemId, newHierarchy);

		let hierarchyNewParentItem = getItemInHierarchyFromPath(newParentItemPath, newHierarchy);
		hierarchyNewParentItem.children.splice(0, 0, hierarchyItem);

		newHierarchy = changeItemInHierarchy(newParentItemPath, hierarchyNewParentItem, newHierarchy);

		return newHierarchy;
	}

	function changeHierarchyItemsOrder(res) {
		if (res.from === undefined || res.to === undefined) return false;
		if (res.to === 0) return false;
		if (res.from === res.to) return false;

		let oldHierarchy = JSON.parse(JSON.stringify(story?.data?.locationsHierarchy));
		let newHierarchy = JSON.parse(JSON.stringify(story?.data?.locationsHierarchy));
		let newItems = JSON.parse(JSON.stringify(items));

		// Get Item
		const item = locations.find((e) => e._id === newItems[res.from]?._id);

		// Get New Parent Item
		const newParentItemId = getNewParentItemId(res.from, res.to, newHierarchy);
		if (!newParentItemId) return false;

		// Remove Item from Old Parent
		newHierarchy = removeItemFromParent(item._id, newHierarchy);

		// Add Item to New Parent
		newHierarchy = addItemToParent(item, newParentItemId, oldHierarchy, newHierarchy);

		// Update Order of New Parent
		let toItem = false;
		if (res.from < res.to) {
			toItem = locations.find((e) => e._id === newItems[res.to]?._id);
		} else {
			toItem = locations.find((e) => e._id === newItems[res.to - 1]?._id);
		}

		const newParentItemPath = getPathToItemInHierarchy(newParentItemId, newHierarchy);
		const hierarchyParentItem = getItemInHierarchyFromPath(newParentItemPath, newHierarchy);

		const itemIndex = hierarchyParentItem.children.findIndex((e) => e._id === item._id);

		let toItemPath = getPathToItemInHierarchy(toItem._id, newHierarchy);

		while (toItemPath.length > 0) {
			const toItem = getItemInHierarchyFromPath(toItemPath, newHierarchy);
			const toItemIndex = hierarchyParentItem.children.findIndex((e) => e._id === toItem._id);

			if (itemIndex !== -1 && toItemIndex !== -1) {
				const tempItem = hierarchyParentItem.children.splice(itemIndex, 1)[0];
				hierarchyParentItem.children.splice(toItemIndex, 0, tempItem);
				newHierarchy = changeItemInHierarchy(newParentItemPath, hierarchyParentItem, newHierarchy);
			}

			toItemPath.pop();
		}

		changeStoryHierarchy(newHierarchy);
	}

	function openCreateHierarchyItemForm() {
		setIsDisplayingCreateHierarchyItemForm(true);
	}

	function deleteHierarchyItem(itemId) {
		let newHierarchy = JSON.parse(JSON.stringify(story?.data?.locationsHierarchy));

		const newItemPath = getPathToItemInHierarchy(itemId, newHierarchy);
		const hierarchyItem = getItemInHierarchyFromPath(newItemPath, newHierarchy);
		if (hierarchyItem.children.length !== 0) return false;

		newHierarchy = removeItemFromParent(itemId, newHierarchy);
		changeStoryHierarchy(newHierarchy);

		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => e._id === itemId);
		if (locationIndex === -1) return false;
		newLocations.splice(locationIndex, 1);
		setLocations(newLocations);
	}

	function toggleHierarchyItemIsChildrenVisible(itemId) {
		let newHierarchy = JSON.parse(JSON.stringify(story?.data?.locationsHierarchy));
		const newItemPath = getPathToItemInHierarchy(itemId, newHierarchy);
		const hierarchyItem = getItemInHierarchyFromPath(newItemPath, newHierarchy);
		hierarchyItem.isChildrenVisible = !hierarchyItem.isChildrenVisible;
		newHierarchy = changeItemInHierarchy(newItemPath, hierarchyItem, newHierarchy);
		changeStoryHierarchy(newHierarchy);
	}

	async function revertHierarchyItems() {
		// Revert Locations Hierarchy
		const story_response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "locationsHierarchy"],
		});
		if (!story_response || story_response?.errors || story_response?.data?.value === undefined) return false;
		changeStoryHierarchy(story_response?.data?.value);

		// Revert Locations
		const locations_response = await APIRequest("/location?story_id=" + story._id, "GET");
		if (!locations_response || locations_response?.errors || !locations_response?.data?.locations) return false;
		setLocations(locations_response.data.locations);

		return true;
	}

	async function saveHierarchyItems() {
		const response = await APIRequest("/location", "PATCH", {
			story_id: story._id,
			locations: locations,
			hierarchy: story?.data?.locationsHierarchy,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		locationTypes,
		locations,
		items,
		isReorderingHierarchyItems,
		toggleIsReorderingHierarchyItems,
		changeHierarchyItemsOrder,
		deleteHierarchyItem,
		toggleHierarchyItemIsChildrenVisible,
		openCreateHierarchyItemForm,
		revertHierarchyItems,
		saveHierarchyItems,
	};
};
