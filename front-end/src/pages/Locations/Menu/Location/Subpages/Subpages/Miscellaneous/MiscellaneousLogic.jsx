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

export const MiscellaneousLogic = () => {
	const { isAuthorizedToEdit, story, locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeMiscellaneousItemTitle(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.miscellaneous.items[index].title = e.target.value;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.miscellaneous.items[index].title = e.target.value;
		setLocations(newLocations);
	}

	function changeMiscellaneousItemText(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.miscellaneous.items[index].text = e.target.value.split("\n");
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.miscellaneous.items[index].text = e.target.value.split("\n");
		setLocations(newLocations);
	}

	function addMiscellaneousItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.miscellaneous.items.push({ title: "", text: [""], images: [] });
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.miscellaneous.items.push({ title: "", text: [""], images: [] });
		setLocations(newLocations);
	}

	function removeMiscellaneousItem(index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.miscellaneous.items.splice(index, 1);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.miscellaneous.items.splice(index, 1);
		setLocations(newLocations);
	}

	const [isReorderingMiscellaneousItems, setIsReorderingMiscellaneousItems] = useState(false);
	function toggleIsReorderingMiscellaneousItems() {
		setIsReorderingMiscellaneousItems((oldIsReorderingMiscellaneousItems) => !oldIsReorderingMiscellaneousItems);
	}

	function reorderMiscellaneousItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempMiscellaneousItem = newLocation.data.miscellaneous.items.splice(res.from, 1)[0];
			newLocation.data.miscellaneous.items.splice(res.to, 0, tempMiscellaneousItem);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const tempMiscellaneousItem = newLocations[locationIndex].data.miscellaneous.items.splice(res.from, 1)[0];
		newLocations[locationIndex].data.miscellaneous.items.splice(res.to, 0, tempMiscellaneousItem);
		setLocations(newLocations);
	}

	const [errors, setErrors] = useState([]);

	async function revertMiscellaneousItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.miscellaneous.items = response.data.value;
			return newLocation;
		});

		return true;
	}

	async function saveMiscellaneousItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
			newValue: location.data.miscellaneous.items,
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
		if (newLocation.data.miscellaneous.items[newLocationImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1)
			return false;
		newLocation.data.miscellaneous.items[newLocationImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setLocation(newLocation);

		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		if (
			newLocations[locationIndex].data.miscellaneous.items[newLocationImagesCurrDevItemIndex].images.findIndex(
				(e) => e.image === image_id
			) !== -1
		)
			return false;
		newLocations[locationIndex].data.miscellaneous.items[newLocationImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setLocations(newLocations);
	}

	const miscellaneousItemsRef = useRef();
	function onMiscellaneousItemsContainerScroll(e) {
		if (miscellaneousItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		location,
		changeMiscellaneousItemTitle,
		changeMiscellaneousItemText,
		addMiscellaneousItem,
		removeMiscellaneousItem,
		isReorderingMiscellaneousItems,
		toggleIsReorderingMiscellaneousItems,
		reorderMiscellaneousItems,
		revertMiscellaneousItems,
		saveMiscellaneousItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	};
};
