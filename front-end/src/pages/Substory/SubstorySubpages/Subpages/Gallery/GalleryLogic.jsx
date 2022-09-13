// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../SubstoryContext";
import { APIContext } from "../../../../../context/APIContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const GalleryLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	function addImageToVersionGallery(image_id) {
		let newSubstory = JSON.parse(JSON.stringify(substory));
		if (newSubstory.data.gallery.findIndex((e) => e.image === image_id) !== -1) return false;
		newSubstory.data.gallery.push({ image: image_id, caption: "" });
		setSubstory(newSubstory);
	}

	function removeGalleryItem(index) {
		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.gallery.splice(index, 1);
		setSubstory(newSubstory);
	}

	const [isReorderingGalleryItems, setIsReorderingGalleryItems] = useState(false);
	function toggleIsReorderingGalleryItems() {
		setIsReorderingGalleryItems((oldIsReorderingGalleryItems) => !oldIsReorderingGalleryItems);
	}

	function reorderGalleryItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newSubstory = JSON.parse(JSON.stringify(substory));
		const tempPsychologyItem = newSubstory.gallery.splice(res.from, 1)[0];
		newSubstory.data.gallery.splice(res.to, 0, tempPsychologyItem);
		setSubstory(newSubstory);
	}

	const [errors, setErrors] = useState([]);

	async function revertGalleryItems() {
		setErrors([]);
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "gallery"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.gallery = response.data.value;
		setSubstory(newSubstory);

		return true;
	}

	async function saveGalleryItems() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "gallery"],
			newValue: substory.data.gallery,
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
		setLightboxImageIDs(substory.data.gallery);
		setLightboxIndex(index);
	}

	return {
		isAuthorizedToEdit,
		substory,
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
	};
};
