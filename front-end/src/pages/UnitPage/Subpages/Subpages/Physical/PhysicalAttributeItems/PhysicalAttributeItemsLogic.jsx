// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PhysicalAttributeItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion, changeUnitVersion, unitVersionItemCopying, changeUnitVersionItemCopying, pasteVersionItemCopying } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changePhysicalAttributeItemTitle(e, index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.attributes[index].title = e.target.value;
		changeUnitVersion(newUnitVersion);
	}

	function changePhysicalAttributeItemText(e, index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.attributes[index].text = e.target.value.split("\n");
		changeUnitVersion(newUnitVersion);
	}

	function changePhysicalAttributeItemImageCaption(e, index, imageIndex) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.attributes[index].images[imageIndex].caption = e.target.value;
		changeUnitVersion(newUnitVersion);
	}

	function removePhysicalAttributeItemImage(index, imageIndex) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.attributes[index].images.splice(imageIndex, 1);
		changeUnitVersion(newUnitVersion);
	}

	function addPhysicalAttributeItem() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.attributes.push({ title: "", text: [""], images: [] });
		changeUnitVersion(newUnitVersion);
	}

	function removePhysicalAttributeItem(index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.attributes.splice(index, 1);
		changeUnitVersion(newUnitVersion);
	}

	function defaultPhysicalAttributeItems() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const defaultPhysicalAttributeItemsTitles = [
			"Gender",
			"Hairstyle",
			"Facial Hair",
			"Hair Colour",
			"Eye Colour",
			"Voice Descriptives",
			"Height",
			"Build",
			"Ethnicity",
			"Skin Colour",
			"Scars",
		];
		let newPhysicalAttributeItems = defaultPhysicalAttributeItemsTitles.map((title) => {
			const correspondingItem = newUnitVersion.physical.attributes.find((e) => e.title === title);
			if (correspondingItem) return correspondingItem;
			return { title, text: [""], images: [] };
		});
		newPhysicalAttributeItems = newPhysicalAttributeItems.concat(
			newUnitVersion.physical.attributes.filter((e) => !defaultPhysicalAttributeItemsTitles.includes(e.title))
		);
		newUnitVersion.physical.attributes = newPhysicalAttributeItems;
		changeUnitVersion(newUnitVersion);
	}

	const [isReorderingPhysicalAttributeItems, setIsReorderingPhysicalAttributeItems] = useState(false);
	function toggleIsReorderingPhysicalAttributeItems() {
		setIsReorderingPhysicalAttributeItems((oldIsReorderingPhysicalAttributeItems) => !oldIsReorderingPhysicalAttributeItems);
	}

	function reorderPhysicalAttributeItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempPhysicalAttributeItem = newUnitVersion.physical.attributes.splice(res.from, 1)[0];
		newUnitVersion.physical.attributes.splice(res.to, 0, tempPhysicalAttributeItem);
		changeUnitVersion(newUnitVersion);
	}

	function reorderPhysicalAttributeItemImages(res, index) {
		if (res.from === undefined || res.to === undefined) return false;
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempPhysicalAttributeItemImage = newUnitVersion.physical.attributes[index].images.splice(res.from, 1)[0];
		newUnitVersion.physical.attributes[index].images.splice(res.to, 0, tempPhysicalAttributeItemImage);
		changeUnitVersion(newUnitVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertPhysicalAttributeItems() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "physical", "attributes"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.attributes = response.data.value;
		changeUnitVersion(newUnitVersion);

		return true;
	}

	async function savePhysicalAttributeItems() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "physical", "attributes"],
			newValue: unitVersion.physical.attributes,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const physicalAttributeItemsRef = useRef();
	function onPhysicalAttributeItemsContainerScroll(e) {
		if (physicalAttributeItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	function copyVersionValue() {
		changeUnitVersionItemCopying(["physical", "attributes"]);
	}

	function pasteVersionValue() {
		pasteVersionItemCopying(["physical", "attributes"]);
	}

	return {
		isAuthorizedToEdit,
		unitVersion,
		changePhysicalAttributeItemTitle,
		changePhysicalAttributeItemText,
		changePhysicalAttributeItemImageCaption,
		removePhysicalAttributeItemImage,
		addPhysicalAttributeItem,
		removePhysicalAttributeItem,
		defaultPhysicalAttributeItems,
		isReorderingPhysicalAttributeItems,
		toggleIsReorderingPhysicalAttributeItems,
		reorderPhysicalAttributeItems,
		reorderPhysicalAttributeItemImages,
		revertPhysicalAttributeItems,
		savePhysicalAttributeItems,
		errors,
		physicalAttributeItemsRef,
		onPhysicalAttributeItemsContainerScroll,
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue,
	};
};
