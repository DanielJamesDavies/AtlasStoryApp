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

export const EventsItemsLogic = () => {
	const { isAuthorizedToEdit, story, location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeEventsItemTitle(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.events.items[index].title = e.target.value;
			return newLocation;
		});
	}

	function changeEventsItemText(e, index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.events.items[index].text = e.target.value.split("\n");
			return newLocation;
		});
	}

	function addEventsItem() {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.events.items.push({ title: "", text: [""], images: [] });
			return newLocation;
		});
	}

	function removeEventsItem(index) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.events.items.splice(index, 1);
			return newLocation;
		});
	}

	const [isReorderingEventsItems, setIsReorderingEventsItems] = useState(false);
	function toggleIsReorderingEventsItems() {
		setIsReorderingEventsItems((oldIsReorderingEventsItems) => !oldIsReorderingEventsItems);
	}

	function reorderEventsItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempEventsItem = newLocation.data.events.items.splice(res.from, 1)[0];
			newLocation.data.events.items.splice(res.to, 0, tempEventsItem);
			return newLocation;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertEventsItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "events", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.events.items = response.data.value;
			return newLocation;
		});

		return true;
	}

	async function saveEventsItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "events", "items"],
			newValue: location.data.events.items,
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
		if (newLocation.data.events.items[newLocationImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newLocation.data.events.items[newLocationImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setLocation(newLocation);
	}

	const eventsItemsRef = useRef();
	function onEventsItemsContainerScroll(e) {
		if (eventsItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		location,
		changeEventsItemTitle,
		changeEventsItemText,
		addEventsItem,
		removeEventsItem,
		isReorderingEventsItems,
		toggleIsReorderingEventsItems,
		reorderEventsItems,
		revertEventsItems,
		saveEventsItems,
		errors,
		locationImagesCurrDevItemIndex,
		openLocationImages,
		closeLocationImages,
		addImageToDevItem,
		eventsItemsRef,
		onEventsItemsContainerScroll,
	};
};
