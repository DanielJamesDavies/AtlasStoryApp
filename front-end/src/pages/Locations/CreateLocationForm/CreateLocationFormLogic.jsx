// Packages
import { useCallback, useContext, useEffect, useState, useRef } from "react";

// Components

// Logic
import { HierarchyFunctions } from "../HierarchyFunctions";

// Context
import { LocationsContext } from "../LocationsContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CreateLocationFormLogic = () => {
	const {
		story_uid,
		isDisplayingCreateLocationForm,
		setIsDisplayingCreateLocationForm,
		locationTypes,
		specificLocationTypes,
		story,
		changeStoryHierarchy,
		locations,
		setLocations,
		createLocationsValues,
	} = useContext(LocationsContext);
	const { APIRequest } = useContext(APIContext);
	const { getPathToItemInHierarchy, getItemInHierarchyFromPath, changeItemInHierarchy } = HierarchyFunctions();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemUid, setItemUid] = useState("");
	const [itemType, setItemType] = useState("Unselected");
	const [itemParent, setItemParent] = useState("Unselected");
	const [parentOptions, setParentOptions] = useState([]);

	function closeCreateHierarchyItemForm() {
		setIsDisplayingCreateLocationForm(false);
	}

	const changeItemName = useCallback(
		(e) => {
			if (isSubmitting) return false;

			setItemName(e.target.value);
			updateItemUIDSuggestions(e.target.value);
		},
		[isSubmitting]
	);

	const [errors, setErrors] = useState([]);

	const changeItemUid = useCallback(
		(e) => {
			if (isSubmitting) return false;

			setItemUid(e.target.value);
		},
		[isSubmitting]
	);

	const [itemUIDSuggestions, setItemUIDSuggestions] = useState([]);

	function updateItemUIDSuggestions(newName) {
		let newItemUIDSuggestions = [];

		newItemUIDSuggestions.push(newName.toLowerCase().split(" ").join(""));

		const newNameSplitBySpace = newName.split(" ");
		if (newNameSplitBySpace.length > 1) newItemUIDSuggestions.push(newNameSplitBySpace.join("-").toLowerCase());

		if (newName.toLowerCase() !== newName) newItemUIDSuggestions.push(newName.split(" ").join(""));

		if (newNameSplitBySpace.length > 1 && newName.toLowerCase() !== newName) newItemUIDSuggestions.push(newNameSplitBySpace.join("-"));

		setItemUIDSuggestions(newItemUIDSuggestions);
	}

	function onClickUidSuggestion(e, value) {
		e?.stopPropagation();
		changeItemUid({ target: { value: value } });
	}

	function changeItemType(index) {
		if (isSubmitting) return false;

		const reversed_location_types_with_specific = [...locationTypes.concat(specificLocationTypes)].reverse();

		const newItem = reversed_location_types_with_specific[index];
		if (newItem?.specificType) {
			const newItemType = reversed_location_types_with_specific[index]?.specificType;
			setItemType(newItemType);

			const possibleParents = locationTypes.find((e) => e?.type === newItemType)?.possibleParents;
			const currItemParentLocation = locations.find((e) => e.id === itemParent);
			if (!currItemParentLocation) return;

			if (!possibleParents.includes(currItemParentLocation.type)) setItemParent("Unselected");
		} else {
			const newItemType = reversed_location_types_with_specific[index]?.type;
			setItemType(newItemType);

			const possibleParents = locationTypes.find((e) => e?.type === newItemType)?.possibleParents;
			const currItemParentLocation = locations.find((e) => e.id === itemParent);
			if (!currItemParentLocation) return;

			if (!possibleParents.includes(currItemParentLocation.type)) setItemParent("Unselected");
		}
	}

	useEffect(() => {
		function getParentOptions() {
			if (specificLocationTypes.findIndex((e) => e.specificType === itemType) === -1) {
				const possibleParents = locationTypes.find((e) => e.type === itemType)?.possibleParents;
				if (!possibleParents) return setParentOptions([]);

				let newParentOptions = JSON.parse(JSON.stringify(locations)).filter((e) => possibleParents.includes(e.type));

				if (itemType === "reality" || locations.length === 0) newParentOptions.splice(0, 0, { _id: "root", data: { name: "Root" } });

				setParentOptions(newParentOptions);
			} else {
				const possibleParents = specificLocationTypes.find((e) => e.specificType === itemType)?.possibleParents;
				const possibleSpecificParents = specificLocationTypes.find((e) => e.specificType === itemType)?.possibleSpecificParents;
				if (!possibleParents || !possibleSpecificParents) return setParentOptions([]);

				let newParentOptions = JSON.parse(JSON.stringify(locations)).filter((e) => possibleParents.includes(e.type));
				newParentOptions = newParentOptions.filter((e) => !e?.specific_type || possibleSpecificParents.includes(e?.specific_type));

				if (itemType === "reality" || locations.length === 0) newParentOptions.splice(0, 0, { _id: "root", data: { name: "Root" } });

				setParentOptions(newParentOptions);
			}
		}
		getParentOptions();
	}, [locationTypes, specificLocationTypes, locations, itemType]);

	function changeItemParent(index) {
		if (isSubmitting) return false;
		setItemParent(parentOptions[index]._id);
	}

	async function submitCreateHierarchyItem() {
		setErrors([]);
		if (!itemType || itemType === "Unselected") return false;
		if (!itemParent || itemParent === "Unselected") return false;

		if (!story?._id) return false;

		setIsSubmitting(true);

		let newItemType = JSON.parse(JSON.stringify(itemType));
		let newSpecificItemType = false;
		if (specificLocationTypes.findIndex((e) => e.specificType === itemType) !== -1) {
			newSpecificItemType = JSON.parse(JSON.stringify(itemType));
			newItemType = specificLocationTypes.find((e) => e?.specificType === newSpecificItemType)?.type;
		}

		// Get New Location ID
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) {
			setIsSubmitting(false);
			return false;
		}

		const scale = locationTypes.find((e) => e.type === newItemType)?.defaultScale;
		const points = locationTypes.find((e) => e.type === newItemType)?.defaultPoints;

		// New Location
		const newLocation = {
			_id: new_id_response?.data?._id,
			story_id: story?._id,
			uid: itemUid,
			type: newItemType,
			specific_type: newSpecificItemType || "",
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
			parentHierarchyItem.children.push(newHierarchyItem);
			newHierarchy = changeItemInHierarchy(parentPath, parentHierarchyItem, newHierarchy);
		}
		changeStoryHierarchy(newHierarchy);

		const response = await APIRequest("/location", "POST", {
			_id: newLocation._id,
			story_id: newLocation.story_id,
			name: newLocation?.data?.name,
			uid: newLocation?.uid,
			type: newLocation?.type,
			specific_type: newLocation?.specific_type,
			item_parent: itemParent,
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);

		// Close Form
		setItemUid("");
		setItemUIDSuggestions([]);
		setItemName("");
		setItemType("Unselected");
		setItemParent("Unselected");
		setParentOptions([]);
		setIsSubmitting(false);
		closeCreateHierarchyItemForm();
	}

	const lastCreateValues = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateValues.current) !== JSON.stringify(createLocationsValues)) {
			lastCreateValues.current = JSON.parse(JSON.stringify(createLocationsValues));
			const name = createLocationsValues?.name;
			const uid = createLocationsValues?.uid;
			if (name) changeItemName({ target: { value: name } });
			if (uid) changeItemUid({ target: { value: uid } });
		}
	}, [createLocationsValues, changeItemName, changeItemUid]);

	return {
		story_uid,
		isDisplayingCreateLocationForm,
		closeCreateHierarchyItemForm,
		itemName,
		changeItemName,
		itemUid,
		changeItemUid,
		locationTypes,
		specificLocationTypes,
		itemType,
		changeItemType,
		parentOptions,
		itemParent,
		changeItemParent,
		submitCreateHierarchyItem,
		errors,
		itemUIDSuggestions,
		onClickUidSuggestion,
	};
};
