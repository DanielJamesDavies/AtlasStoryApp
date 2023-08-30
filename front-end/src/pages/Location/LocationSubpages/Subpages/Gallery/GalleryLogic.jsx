// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../LocationContext";
import { APIContext } from "../../../../../context/APIContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const GalleryLogic = () => {
	const { isAuthorizedToEdit, story, location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	function addImageToVersionGallery(image_id) {
		let newLocation = JSON.parse(JSON.stringify(location));
		if (newLocation.data.gallery.findIndex((e) => e.image === image_id) !== -1) return false;
		newLocation.data.gallery.push({ image: image_id, caption: "" });
		setLocation(newLocation);
	}

	function removeGalleryItem(index) {
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.gallery.splice(index, 1);
		setLocation(newLocation);
	}

	const [isReorderingGalleryItems, setIsReorderingGalleryItems] = useState(false);
	function toggleIsReorderingGalleryItems() {
		setIsReorderingGalleryItems((oldIsReorderingGalleryItems) => !oldIsReorderingGalleryItems);
	}

	function reorderGalleryItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newLocation = JSON.parse(JSON.stringify(location));
		const tempPsychologyItem = newLocation.gallery.splice(res.from, 1)[0];
		newLocation.data.gallery.splice(res.to, 0, tempPsychologyItem);
		setLocation(newLocation);
	}

	const [errors, setErrors] = useState([]);

	async function revertGalleryItems() {
		setErrors([]);
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "gallery"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.gallery = response.data.value;
		setLocation(newLocation);

		return true;
	}

	async function saveGalleryItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "gallery"],
			newValue: location.data.gallery,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const galleryRef = useRef();
	function onGalleryScroll(e) {
		if (galleryRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	function onGalleryItemClick(index) {
		setLightboxImageIDs(location.data.gallery);
		setLightboxIndex(index);
	}

	const [isDisplayingLocationsImages, setIsDisplayingLocationsImages] = useState(false);

	function toggleIsDisplayingLocationsImages() {
		setIsDisplayingLocationsImages((oldIsDisplayingLocationsImages) => !oldIsDisplayingLocationsImages);
	}

	return {
		isAuthorizedToEdit,
		location,
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
		isDisplayingLocationsImages,
		toggleIsDisplayingLocationsImages,
	};
};
