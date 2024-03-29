// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../../../../../context/APIContext";
import { LocationsContext } from "../../../../../LocationsContext";
import { LocationContext } from "../../../LocationContext";

// Services

// Styles

// Assets

export const DevelopmentLogic = () => {
	const { isAuthorizedToEdit, story, locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeDevelopmentItemTitle(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.development.items[index].title = e.target.value;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.development.items[index].title = e.target.value;
		setLocations(newLocations);
	}

	function changeDevelopmentItemText(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.development.items[index].text = e.target.value.split("\n");
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.development.items[index].text = e.target.value.split("\n");
		setLocations(newLocations);
	}

	function addDevelopmentItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.development.items.push({ title: "", text: [""], images: [] });
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.development.items.push({ title: "", text: [""], images: [] });
		setLocations(newLocations);
	}

	function removeDevelopmentItem(index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.development.items.splice(index, 1);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.development.items.splice(index, 1);
		setLocations(newLocations);
	}

	const [isReorderingDevelopmentItems, setIsReorderingDevelopmentItems] = useState(false);
	function toggleIsReorderingDevelopmentItems() {
		setIsReorderingDevelopmentItems((oldIsReorderingDevelopmentItems) => !oldIsReorderingDevelopmentItems);
	}

	function reorderDevelopmentItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempDevelopmentItem = newLocation.data.development.items.splice(res.from, 1)[0];
			newLocation.data.development.items.splice(res.to, 0, tempDevelopmentItem);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const tempDevelopmentItem = newLocations[locationIndex].data.development.items.splice(res.from, 1)[0];
		newLocations[locationIndex].data.development.items.splice(res.to, 0, tempDevelopmentItem);
		setLocations(newLocations);
	}

	const [errors, setErrors] = useState([]);

	async function revertDevelopmentItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "development", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.development.items = response.data.value;
			return newLocation;
		});

		return true;
	}

	async function saveDevelopmentItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "development", "items"],
			newValue: location.data.development.items,
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
		if (newLocation.data.development.items[newLocationImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1)
			return false;
		newLocation.data.development.items[newLocationImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setLocation(newLocation);

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (
			newLocations[locationIndex].data.development.items[newLocationImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !==
			-1
		)
			return false;
		newLocations[locationIndex].data.development.items[newLocationImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setLocations(newLocations);
	}

	const developmentItemsRef = useRef();
	function onDevelopmentItemsContainerScroll(e) {
		if (developmentItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		location,
		changeDevelopmentItemTitle,
		changeDevelopmentItemText,
		addDevelopmentItem,
		removeDevelopmentItem,
		isReorderingDevelopmentItems,
		toggleIsReorderingDevelopmentItems,
		reorderDevelopmentItems,
		revertDevelopmentItems,
		saveDevelopmentItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	};
};
