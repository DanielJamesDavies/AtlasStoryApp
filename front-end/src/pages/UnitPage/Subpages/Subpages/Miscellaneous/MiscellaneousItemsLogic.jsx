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

export const MiscellaneousItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeMiscellaneousItemTitle(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.miscellaneous.items[index].title = e.target.value;
			return newUnit;
		});
	}

	function changeMiscellaneousItemText(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.miscellaneous.items[index].text = e.target.value.split("\n");
			return newUnit;
		});
	}

	function addMiscellaneousItem() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.miscellaneous.items.push({ title: "", text: [""], images: [] });
			return newUnit;
		});
	}

	function removeMiscellaneousItem(index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.miscellaneous.items.splice(index, 1);
			return newUnit;
		});
	}

	const [isReorderingMiscellaneousItems, setIsReorderingMiscellaneousItems] = useState(false);
	function toggleIsReorderingMiscellaneousItems() {
		setIsReorderingMiscellaneousItems((oldIsReorderingMiscellaneousItems) => !oldIsReorderingMiscellaneousItems);
	}

	function reorderMiscellaneousItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempMiscellaneousItem = newUnit.data.miscellaneous.items.splice(res.from, 1)[0];
			newUnit.data.miscellaneous.items.splice(res.to, 0, tempMiscellaneousItem);
			return newUnit;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertMiscellaneousItems() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.miscellaneous.items = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveMiscellaneousItems() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
			newValue: unit.data.miscellaneous.items,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const [UnitImagesCurrDevItemIndex, setUnitImagesCurrDevItemIndex] = useState(-1);
	function openUnitImages(index) {
		setUnitImagesCurrDevItemIndex(index);
	}

	function closeUnitImages() {
		setUnitImagesCurrDevItemIndex(-1);
	}

	function addImageToDevItem(image_id) {
		const newUnitImagesCurrDevItemIndex = JSON.parse(JSON.stringify(UnitImagesCurrDevItemIndex));
		let newUnit = JSON.parse(JSON.stringify(unit));
		if (newUnit.data.miscellaneous.items[newUnitImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newUnit.data.miscellaneous.items[newUnitImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setUnit(newUnit);
	}

	const miscellaneousItemsRef = useRef();
	function onMiscellaneousItemsContainerScroll(e) {
		if (miscellaneousItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unit,
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
		UnitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	};
};
