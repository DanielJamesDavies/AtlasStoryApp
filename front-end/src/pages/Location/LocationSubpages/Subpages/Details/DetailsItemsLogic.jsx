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

export const DetailsItemsLogic = () => {
	const { isAuthorizedToEdit, story, location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeDetailsItemTitle(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.details.items[index].title = e.target.value;
			return newLocation;
		});
	}

	function changeDetailsItemText(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.details.items[index].text = e.target.value.split("\n");
			return newLocation;
		});
	}

	function addDetailsItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.details.items.push({ title: "", text: [""], images: [] });
			return newLocation;
		});
	}

	function removeDetailsItem(index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.details.items.splice(index, 1);
			return newLocation;
		});
	}

	const [isReorderingDetailsItems, setIsReorderingDetailsItems] = useState(false);
	function toggleIsReorderingDetailsItems() {
		setIsReorderingDetailsItems((oldIsReorderingDetailsItems) => !oldIsReorderingDetailsItems);
	}

	function reorderDetailsItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempDetailsItem = newLocation.data.details.items.splice(res.from, 1)[0];
			newLocation.data.details.items.splice(res.to, 0, tempDetailsItem);
			return newLocation;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertDetailsItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "details", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.details.items = response.data.value;
			return newLocation;
		});

		return true;
	}

	async function saveDetailsItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "details", "items"],
			newValue: location.data.details.items,
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
		if (newLocation.data.details.items[newLocationImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newLocation.data.details.items[newLocationImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setLocation(newLocation);
	}

	const detailsItemsRef = useRef();
	function onDetailsItemsContainerScroll(e) {
		if (detailsItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		location,
		changeDetailsItemTitle,
		changeDetailsItemText,
		addDetailsItem,
		removeDetailsItem,
		isReorderingDetailsItems,
		toggleIsReorderingDetailsItems,
		reorderDetailsItems,
		revertDetailsItems,
		saveDetailsItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		detailsItemsRef,
		onDetailsItemsContainerScroll,
	};
};
