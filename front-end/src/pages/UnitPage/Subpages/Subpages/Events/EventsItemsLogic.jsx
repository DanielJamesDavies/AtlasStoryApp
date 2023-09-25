// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const EventsItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeEventsItemTitle(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.events.items[index].title = e.target.value;
			return newUnit;
		});
	}

	function changeEventsItemText(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.events.items[index].text = e.target.value.split("\n");
			return newUnit;
		});
	}

	function addEventsItem() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.events.items.push({ title: "", text: [""], images: [] });
			return newUnit;
		});
	}

	function removeEventsItem(index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.events.items.splice(index, 1);
			return newUnit;
		});
	}

	const [isReorderingEventsItems, setIsReorderingEventsItems] = useState(false);
	function toggleIsReorderingEventsItems() {
		setIsReorderingEventsItems((oldIsReorderingEventsItems) => !oldIsReorderingEventsItems);
	}

	function reorderEventsItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempEventsItem = newUnit.data.events.items.splice(res.from, 1)[0];
			newUnit.data.events.items.splice(res.to, 0, tempEventsItem);
			return newUnit;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertEventsItems() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "events", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.events.items = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveEventsItems() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "events", "items"],
			newValue: unit.data.events.items,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const [unitImagesCurrDevItemIndex, setunitImagesCurrDevItemIndex] = useState(-1);
	function openUnitImages(index) {
		setunitImagesCurrDevItemIndex(index);
	}

	function closeUnitImages() {
		setunitImagesCurrDevItemIndex(-1);
	}

	function addImageToDevItem(image_id) {
		const newunitImagesCurrDevItemIndex = JSON.parse(JSON.stringify(unitImagesCurrDevItemIndex));
		let newUnit = JSON.parse(JSON.stringify(unit));
		if (newUnit.data.events.items[newunitImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newUnit.data.events.items[newunitImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setUnit(newUnit);
	}

	const eventsItemsRef = useRef();
	function onEventsItemsContainerScroll(e) {
		if (eventsItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unit,
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
		unitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		eventsItemsRef,
		onEventsItemsContainerScroll,
	};
};
