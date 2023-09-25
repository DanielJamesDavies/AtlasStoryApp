// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";
import { APIContext } from "../../../../../context/APIContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const GalleryLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, unitVersion, changeUnitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	function addImageToVersionGallery(image_id) {
		if (["character", "group"].includes(unit_type)) {
			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			if (newUnitVersion.gallery.findIndex((e) => e.image === image_id) !== -1) return false;
			newUnitVersion.gallery.push({ image: image_id, caption: "" });
			changeUnitVersion(newUnitVersion);
		} else {
			let newUnit = JSON.parse(JSON.stringify(unit));
			if (newUnit.data.gallery.findIndex((e) => e.image === image_id) !== -1) return false;
			newUnit.data.gallery.push({ image: image_id, caption: "" });
			setUnit(newUnit);
		}
	}

	function removeGalleryItem(index) {
		if (["character", "group"].includes(unit_type)) {
			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			newUnitVersion.gallery.splice(index, 1);
			changeUnitVersion(newUnitVersion);
		} else {
			let newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.gallery.splice(index, 1);
			setUnit(newUnit);
		}
	}

	const [isReorderingGalleryItems, setIsReorderingGalleryItems] = useState(false);
	function toggleIsReorderingGalleryItems() {
		setIsReorderingGalleryItems((oldIsReorderingGalleryItems) => !oldIsReorderingGalleryItems);
	}

	function reorderGalleryItems(res) {
		if (res.from === undefined || res.to === undefined) return false;

		if (["character", "group"].includes(unit_type)) {
			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			const tempItem = newUnitVersion.gallery.splice(res.from, 1)[0];
			newUnitVersion.gallery.splice(res.to, 0, tempItem);
			changeUnitVersion(newUnitVersion);
		} else {
			let newUnit = JSON.parse(JSON.stringify(unit));
			const tempItem = newUnit.gallery.splice(res.from, 1)[0];
			newUnit.data.gallery.splice(res.to, 0, tempItem);
			setUnit(newUnit);
		}
	}

	const [errors, setErrors] = useState([]);

	async function revertGalleryItems() {
		setErrors([]);

		if (["character", "group"].includes(unit_type)) {
			const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
				story_id: story._id,
				path: ["data", "versions", unitVersion._id, "gallery"],
			});
			if (!response || response?.errors || response?.data?.value === undefined) return false;

			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			newUnitVersion.gallery = response.data.value;
			changeUnitVersion(newUnitVersion);

			return true;
		} else {
			const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
				story_id: story._id,
				path: ["data", "gallery"],
			});
			if (!response || response?.errors || response?.data?.value === undefined) return false;

			let newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.gallery = response.data.value;
			setUnit(newUnit);

			return true;
		}
	}

	async function saveGalleryItems() {
		setErrors([]);
		if (!unit?._id) return;

		if (["character", "group"].includes(unit_type)) {
			const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
				story_id: story._id,
				path: ["data", "versions", unitVersion._id, "gallery"],
				newValue: unitVersion.gallery,
			});
			if (!response || response?.errors) {
				if (response?.errors) setErrors(response.errors);
				return false;
			}
			return true;
		} else {
			const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
				story_id: story._id,
				path: ["data", "gallery"],
				newValue: unit.data.gallery,
			});
			if (!response || response?.errors) {
				if (response?.errors) setErrors(response.errors);
				return false;
			}
			return true;
		}
	}

	const galleryRef = useRef();
	function onGalleryScroll(e) {
		if (galleryRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	function onGalleryItemClick(index) {
		if (["character", "group"].includes(unit_type)) {
			setLightboxImageIDs(unitVersion.gallery);
			setLightboxIndex(index);
		} else {
			setLightboxImageIDs(unit.data.gallery);
			setLightboxIndex(index);
		}
	}

	const [isDisplayingCharactersImages, setIsDisplayingCharactersImages] = useState(false);

	function toggleIsDisplayingCharactersImages() {
		setIsDisplayingCharactersImages((oldIsDisplayingCharactersImages) => !oldIsDisplayingCharactersImages);
	}

	return {
		unit_type,
		isAuthorizedToEdit,
		unit,
		unitVersion,
		addImageToVersionGallery,
		removeGalleryItem,
		isReorderingGalleryItems,
		toggleIsReorderingGalleryItems,
		reorderGalleryItems,
		errors,
		revertGalleryItems,
		saveGalleryItems,
		galleryRef,
		onGalleryScroll,
		onGalleryItemClick,
		isDisplayingCharactersImages,
		toggleIsDisplayingCharactersImages,
	};
};
