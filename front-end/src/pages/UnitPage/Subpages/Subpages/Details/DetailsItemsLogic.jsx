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

export const DetailsItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeDetailsItemTitle(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.details.items[index].title = e.target.value;
			return newUnit;
		});
	}

	function changeDetailsItemText(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.details.items[index].text = e.target.value.split("\n");
			return newUnit;
		});
	}

	function addDetailsItem() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.details.items.push({ title: "", text: [""], images: [] });
			return newUnit;
		});
	}

	function removeDetailsItem(index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.details.items.splice(index, 1);
			return newUnit;
		});
	}

	const [isReorderingDetailsItems, setIsReorderingDetailsItems] = useState(false);
	function toggleIsReorderingDetailsItems() {
		setIsReorderingDetailsItems((oldIsReorderingDetailsItems) => !oldIsReorderingDetailsItems);
	}

	function reorderDetailsItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempDetailsItem = newUnit.data.details.items.splice(res.from, 1)[0];
			newUnit.data.details.items.splice(res.to, 0, tempDetailsItem);
			return newUnit;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertDetailsItems() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "details", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.details.items = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveDetailsItems() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "details", "items"],
			newValue: unit.data.details.items,
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
		if (newUnit.data.details.items[newunitImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newUnit.data.details.items[newunitImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setUnit(newUnit);
	}

	const detailsItemsRef = useRef();
	function onDetailsItemsContainerScroll(e) {
		if (detailsItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unit,
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
		unitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		detailsItemsRef,
		onDetailsItemsContainerScroll,
	};
};
