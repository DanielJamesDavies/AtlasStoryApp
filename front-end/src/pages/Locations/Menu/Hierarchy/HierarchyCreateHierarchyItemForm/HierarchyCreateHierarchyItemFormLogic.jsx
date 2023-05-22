// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic
import { HierarchyFunctions } from "../../../HierarchyFunctions";

// Context
import { LocationsContext } from "../../../LocationsContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const HierarchyCreateHierarchyItemFormLogic = () => {
	const {
		isDisplayingCreateHierarchyItemForm,
		setIsDisplayingCreateHierarchyItemForm,
		locationTypes,
		story,
		changeStoryHierarchy,
		locations,
		setLocations,
	} = useContext(LocationsContext);
	const { APIRequest } = useContext(APIContext);
	const { getPathToItemInHierarchy, getItemInHierarchyFromPath, changeItemInHierarchy } = HierarchyFunctions();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemType, setItemType] = useState("Unselected");
	const [itemParent, setItemParent] = useState("Unselected");
	const [parentOptions, setParentOptions] = useState([]);

	function closeCreateHierarchyItemForm() {
		setIsDisplayingCreateHierarchyItemForm(false);
	}

	function changeItemName(e) {
		if (isSubmitting) return false;

		setItemName(e.target.value);
	}

	function changeItemType(index) {
		if (isSubmitting) return false;

		const newItemType = locationTypes[index].type;
		setItemType(newItemType);

		const possibleParents = locationTypes.find((e) => e.type === newItemType)?.possibleParents;
		const currItemParentLocation = locations.find((e) => e.id === itemParent);
		if (!currItemParentLocation) return;
		if (!possibleParents.includes(currItemParentLocation.type)) setItemParent("Unselected");
	}

	useEffect(() => {
		function getParentOptions() {
			const possibleParents = locationTypes.find((e) => e.type === itemType)?.possibleParents;
			if (!possibleParents) return setParentOptions([]);

			let newParentOptions = JSON.parse(JSON.stringify(locations)).filter((e) => possibleParents.includes(e.type));

			if (itemType === "reality") newParentOptions.splice(0, 0, { _id: "root", data: { name: "Root" } });

			setParentOptions(newParentOptions);
		}
		getParentOptions();
	}, [locationTypes, locations, itemType]);

	function changeItemParent(index) {
		if (isSubmitting) return false;
		setItemParent(parentOptions[index]._id);
	}

	async function submitCreateHierarchyItem() {
		if (itemType === "Unselected") return false;
		if (itemParent === "Unselected") return false;

		if (!story?._id) return false;

		setIsSubmitting(true);

		// Get New Location ID
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) {
			setIsSubmitting(false);
			return false;
		}

		const scale = locationTypes.find((e) => e.type === itemType)?.defaultScale;
		const points = locationTypes.find((e) => e.type === itemType)?.defaultPoints;

		// New Location
		const newLocation = {
			_id: new_id_response?.data?._id,
			story_id: story?._id,
			type: itemType,
			position: [0, 0, 0],
			scale: scale ? scale : 1,
			tilt: 0,
			dayLength: 1,
			points: points,
			inclination: 0,
			paths: [],
			data: { name: itemName, description: [] },
		};

		// Add New Location to Locations
		let newLocations = JSON.parse(JSON.stringify(locations));
		newLocations.push(newLocation);
		setLocations(newLocations);

		// Add New Location to Hierarchy
		const newHierarchyItem = { _id: newLocation._id, children: [], isChildrenVisible: true };
		let newHierarchy = JSON.parse(JSON.stringify(story?.data?.locationsHierarchy));
		if (itemParent === "root") {
			newHierarchy.push(newHierarchyItem);
		} else {
			const parentPath = getPathToItemInHierarchy(itemParent, newHierarchy);
			const parentHierarchyItem = getItemInHierarchyFromPath(parentPath, newHierarchy);
			console.log(itemParent, parentPath, parentHierarchyItem);
			parentHierarchyItem.children.push(newHierarchyItem);
			newHierarchy = changeItemInHierarchy(parentPath, parentHierarchyItem, newHierarchy);
		}
		changeStoryHierarchy(newHierarchy);

		// Close Form
		setItemName("");
		setItemType("Unselected");
		setItemParent("Unselected");
		setParentOptions([]);
		setIsSubmitting(false);
		closeCreateHierarchyItemForm();
	}

	return {
		isDisplayingCreateHierarchyItemForm,
		closeCreateHierarchyItemForm,
		itemName,
		changeItemName,
		locationTypes,
		itemType,
		changeItemType,
		parentOptions,
		itemParent,
		changeItemParent,
		submitCreateHierarchyItem,
	};
};
