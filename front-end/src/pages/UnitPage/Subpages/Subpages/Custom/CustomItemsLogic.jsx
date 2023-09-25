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

export const CustomItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, openSubpageID } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeCustomItemTitle(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newUnit.data.custom_subpages[customSubpageIndex].items[index].title = e.target.value;
			return newUnit;
		});
	}

	function changeCustomItemText(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newUnit.data.custom_subpages[customSubpageIndex].items[index].text = e.target.value.split("\n");
			return newUnit;
		});
	}

	function addCustomItem() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newUnit.data.custom_subpages[customSubpageIndex].items.push({ title: "", text: [""], images: [] });
			return newUnit;
		});
	}

	function removeCustomItem(index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newUnit.data.custom_subpages[customSubpageIndex].items.splice(index, 1);
			return newUnit;
		});
	}

	const [isReorderingCustomItems, setIsReorderingCustomItems] = useState(false);
	function toggleIsReorderingCustomItems() {
		setIsReorderingCustomItems((oldIsReorderingCustomItems) => !oldIsReorderingCustomItems);
	}

	function reorderCustomItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempCustomItem = newUnit.data.custom_subpages[customSubpageIndex].items.splice(res.from, 1)[0];
			newUnit.data.custom_subpages[openSubpageID].items.splice(res.to, 0, tempCustomItem);
			return newUnit;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertCustomItems() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newUnit.data.custom_subpages[customSubpageIndex].items = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveCustomItems() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
			newValue: unit.data.custom_subpages.find((e) => e.id === openSubpageID).items,
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
		const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
		if (
			newUnit.data.custom_subpages[customSubpageIndex].items[newUnitImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !==
			-1
		)
			return false;
		newUnit.data.custom_subpages[customSubpageIndex].items[newUnitImagesCurrDevItemIndex].images.push({
			image: image_id,
			caption: "",
		});
		setUnit(newUnit);
	}

	const customItemsRef = useRef();
	function onCustomItemsContainerScroll(e) {
		if (customItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unit,
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
		UnitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	};
};
