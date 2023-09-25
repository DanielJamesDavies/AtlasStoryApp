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

export const DevelopmentItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeDevelopmentItemTitle(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.development.items[index].title = e.target.value;
			return newUnit;
		});
	}

	function changeDevelopmentItemText(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.development.items[index].text = e.target.value.split("\n");
			return newUnit;
		});
	}

	function addDevelopmentItem() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.development.items.push({ title: "", text: [""], images: [] });
			return newUnit;
		});
	}

	function removeDevelopmentItem(index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.development.items.splice(index, 1);
			return newUnit;
		});
	}

	const [isReorderingDevelopmentItems, setIsReorderingDevelopmentItems] = useState(false);
	function toggleIsReorderingDevelopmentItems() {
		setIsReorderingDevelopmentItems((oldIsReorderingDevelopmentItems) => !oldIsReorderingDevelopmentItems);
	}

	function reorderDevelopmentItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempDevelopmentItem = newUnit.data.development.items.splice(res.from, 1)[0];
			newUnit.data.development.items.splice(res.to, 0, tempDevelopmentItem);
			return newUnit;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertDevelopmentItems() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "development", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.development.items = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveDevelopmentItems() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "development", "items"],
			newValue: unit.data.development.items,
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
		if (newUnit.data.development.items[newunitImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newUnit.data.development.items[newunitImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setUnit(newUnit);
	}

	const developmentItemsRef = useRef();
	function onDevelopmentItemsContainerScroll(e) {
		if (developmentItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unit,
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
		unitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	};
};
