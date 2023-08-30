// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../LocationContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const CustomItemsLogic = () => {
	const { isAuthorizedToEdit, story, location, setLocation, openSubpageID } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeCustomItemTitle(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newLocation.data.custom_subpages[customSubpageIndex].items[index].title = e.target.value;
			return newLocation;
		});
	}

	function changeCustomItemText(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newLocation.data.custom_subpages[customSubpageIndex].items[index].text = e.target.value.split("\n");
			return newLocation;
		});
	}

	function addCustomItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newLocation.data.custom_subpages[customSubpageIndex].items.push({ title: "", text: [""], images: [] });
			return newLocation;
		});
	}

	function removeCustomItem(index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newLocation.data.custom_subpages[customSubpageIndex].items.splice(index, 1);
			return newLocation;
		});
	}

	const [isReorderingCustomItems, setIsReorderingCustomItems] = useState(false);
	function toggleIsReorderingCustomItems() {
		setIsReorderingCustomItems((oldIsReorderingCustomItems) => !oldIsReorderingCustomItems);
	}

	function reorderCustomItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempCustomItem = newLocation.data.custom_subpages[customSubpageIndex].items.splice(res.from, 1)[0];
			newLocation.data.custom_subpages[openSubpageID].items.splice(res.to, 0, tempCustomItem);
			return newLocation;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertCustomItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newLocation.data.custom_subpages[customSubpageIndex].items = response.data.value;
			return newLocation;
		});

		return true;
	}

	async function saveCustomItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
			newValue: location.data.custom_subpages.find((e) => e.id === openSubpageID).items,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const [locationImagesCurrDevItemIndex, setLocationImagesCurrDevItemIndex] = useState(-1);
	function openLocationImages(index) {
		setLocationImagesCurrDevItemIndex(index);
	}

	function closeLocationImages() {
		setLocationImagesCurrDevItemIndex(-1);
	}

	function addImageToDevItem(image_id) {
		const newLocationImagesCurrDevItemIndex = JSON.parse(JSON.stringify(locationImagesCurrDevItemIndex));
		let newLocation = JSON.parse(JSON.stringify(location));
		const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
		if (
			newLocation.data.custom_subpages[customSubpageIndex].items[newLocationImagesCurrDevItemIndex].images.findIndex(
				(e) => e.image === image_id
			) !== -1
		)
			return false;
		newLocation.data.custom_subpages[customSubpageIndex].items[newLocationImagesCurrDevItemIndex].images.push({
			image: image_id,
			caption: "",
		});
		setLocation(newLocation);
	}

	const customItemsRef = useRef();
	function onCustomItemsContainerScroll(e) {
		if (customItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		location,
		openSubpageID,
		changeCustomItemTitle,
		changeCustomItemText,
		addCustomItem,
		removeCustomItem,
		isReorderingCustomItems,
		toggleIsReorderingCustomItems,
		reorderCustomItems,
		revertCustomItems,
		saveCustomItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	};
};
