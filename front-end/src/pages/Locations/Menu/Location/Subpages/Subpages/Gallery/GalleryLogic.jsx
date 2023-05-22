// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../LocationContext";
import { APIContext } from "../../../../../../../context/APIContext";
import { LightboxContext } from "../../../../../../../context/LightboxContext";

// Services
import getImageFromFile from "../../../../../../../services/GetImageFromFile";

// Styles

// Assets

export const GalleryLogic = () => {
	const { isAuthorizedToEdit, story, location, changeLocation, locationImages, setLocationImages } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);
	const addImageInputRef = useRef();

	async function addImage(e) {
		const image = await getImageFromFile(e.target.files[0]);
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.gallery.push({ image: new_id_response.data._id, caption: "" });
		changeLocation(newLocation);

		setLocationImages((oldLocationImages) => {
			let newLocationImages = JSON.parse(JSON.stringify(oldLocationImages));
			newLocationImages.push({ _id: new_id_response.data._id, image: image.data });
			return newLocationImages;
		});

		return true;
	}

	function removeGalleryItem(index) {
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.gallery.splice(index, 1);
		changeLocation(newLocation);
	}

	const [isReorderingGalleryItems, setIsReorderingGalleryItems] = useState(false);
	function toggleIsReorderingGalleryItems() {
		setIsReorderingGalleryItems((oldIsReorderingGalleryItems) => !oldIsReorderingGalleryItems);
	}

	function reorderGalleryItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newLocation = JSON.parse(JSON.stringify(location));
		const tempItem = newLocation.data.gallery.splice(res.from, 1)[0];
		newLocation.data.gallery.splice(res.to, 0, tempItem);
		changeLocation(newLocation);
	}

	const [errors, setErrors] = useState([]);

	async function revertGalleryItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "gallery"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.gallery = response.data.value;
		changeLocation(newLocation);

		return true;
	}

	async function saveGalleryItems() {
		setErrors([]);
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "gallery"],
			newValue: { gallery: location.data.gallery, images: locationImages },
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	function onGalleryItemClick(index) {
		setLightboxImageIDs(location.data.gallery);
		setLightboxIndex(index);
	}

	return {
		isAuthorizedToEdit,
		location,
		addImageInputRef,
		addImage,
		removeGalleryItem,
		isReorderingGalleryItems,
		toggleIsReorderingGalleryItems,
		reorderGalleryItems,
		errors,
		revertGalleryItems,
		saveGalleryItems,
		onGalleryItemClick,
	};
};
