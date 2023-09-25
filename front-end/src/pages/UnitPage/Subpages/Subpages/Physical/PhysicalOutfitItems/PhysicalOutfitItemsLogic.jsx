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

export const PhysicalOutfitItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion, changeUnitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changePhysicalOutfitItemTitle(e, index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.outfits[index].title = e.target.value;
		changeUnitVersion(newUnitVersion);
	}

	function changePhysicalOutfitItemText(e, index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.outfits[index].text = e.target.value.split("\n");
		changeUnitVersion(newUnitVersion);
	}

	function changePhysicalOutfitItemImageCaption(e, index, imageIndex) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.outfits[index].images[imageIndex].caption = e.target.value;
		changeUnitVersion(newUnitVersion);
	}

	function removePhysicalOutfitItemImage(index, imageIndex) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.outfits[index].images.splice(imageIndex, 1);
		changeUnitVersion(newUnitVersion);
	}

	function addPhysicalOutfitItem() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.outfits.push({ title: "", text: [""], images: [] });
		changeUnitVersion(newUnitVersion);
	}

	function removePhysicalOutfitItem(index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.outfits.splice(index, 1);
		changeUnitVersion(newUnitVersion);
	}

	const [isReorderingPhysicalOutfitItems, setIsReorderingPhysicalOutfitItems] = useState(false);
	function toggleIsReorderingPhysicalOutfitItems() {
		setIsReorderingPhysicalOutfitItems((oldIsReorderingPhysicalOutfitItems) => !oldIsReorderingPhysicalOutfitItems);
	}

	function reorderPhysicalOutfitItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempPhysicalOutfitItem = newUnitVersion.physical.outfits.splice(res.from, 1)[0];
		newUnitVersion.physical.outfits.splice(res.to, 0, tempPhysicalOutfitItem);
		changeUnitVersion(newUnitVersion);
	}

	function reorderPhysicalOutfitItemImages(res, index) {
		if (res.from === undefined || res.to === undefined) return false;
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempPhysicalAttributeItemImage = newUnitVersion.physical.outfits[index].images.splice(res.from, 1)[0];
		newUnitVersion.physical.outfits[index].images.splice(res.to, 0, tempPhysicalAttributeItemImage);
		changeUnitVersion(newUnitVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertPhysicalOutfitItems() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "physical", "outfits"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.physical.outfits = response.data.value;
		changeUnitVersion(newUnitVersion);

		return true;
	}

	async function savePhysicalOutfitItems() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "physical", "outfits"],
			newValue: unitVersion.physical.outfits,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const physicalOutfitItemsRef = useRef();
	function onPhysicalOutfitItemsContainerScroll(e) {
		if (physicalOutfitItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unitVersion,
		changePhysicalOutfitItemTitle,
		changePhysicalOutfitItemText,
		changePhysicalOutfitItemImageCaption,
		removePhysicalOutfitItemImage,
		addPhysicalOutfitItem,
		removePhysicalOutfitItem,
		isReorderingPhysicalOutfitItems,
		toggleIsReorderingPhysicalOutfitItems,
		reorderPhysicalOutfitItems,
		reorderPhysicalOutfitItemImages,
		revertPhysicalOutfitItems,
		savePhysicalOutfitItems,
		errors,
		physicalOutfitItemsRef,
		onPhysicalOutfitItemsContainerScroll,
	};
};
