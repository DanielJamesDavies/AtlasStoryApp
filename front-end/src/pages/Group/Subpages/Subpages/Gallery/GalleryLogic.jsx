// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../GroupContext";
import { APIContext } from "../../../../../context/APIContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const GalleryLogic = () => {
	const { isAuthorizedToEdit, story, group, groupVersion, changeGroupVersion } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	function addImageToVersionGallery(image_id) {
		let newGroupVersion = JSON.parse(JSON.stringify(groupVersion));
		if (newGroupVersion.gallery.findIndex((e) => e.image === image_id) !== -1) return false;
		newGroupVersion.gallery.push({ image: image_id, caption: "" });
		changeGroupVersion(newGroupVersion);
	}

	function removeGalleryItem(index) {
		let newGroupVersion = JSON.parse(JSON.stringify(groupVersion));
		newGroupVersion.gallery.splice(index, 1);
		changeGroupVersion(newGroupVersion);
	}

	const [isReorderingGalleryItems, setIsReorderingGalleryItems] = useState(false);
	function toggleIsReorderingGalleryItems() {
		setIsReorderingGalleryItems((oldIsReorderingGalleryItems) => !oldIsReorderingGalleryItems);
	}

	function reorderGalleryItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newGroupVersion = JSON.parse(JSON.stringify(groupVersion));
		const tempPsychologyItem = newGroupVersion.gallery.splice(res.from, 1)[0];
		newGroupVersion.gallery.splice(res.to, 0, tempPsychologyItem);
		changeGroupVersion(newGroupVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertGalleryItems() {
		setErrors([]);
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", groupVersion._id, "gallery"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newGroupVersion = JSON.parse(JSON.stringify(groupVersion));
		newGroupVersion.gallery = response.data.value;
		changeGroupVersion(newGroupVersion);

		return true;
	}

	async function saveGalleryItems() {
		setErrors([]);
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", groupVersion._id, "gallery"],
			newValue: groupVersion.gallery,
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
		setLightboxImageIDs(groupVersion.gallery);
		setLightboxIndex(index);
	}

	const [isDisplayingGroupsImages, setIsDisplayingGroupsImages] = useState(false);

	function toggleIsDisplayingGroupsImages() {
		setIsDisplayingGroupsImages((oldIsDisplayingGroupsImages) => !oldIsDisplayingGroupsImages);
	}

	return {
		isAuthorizedToEdit,
		groupVersion,
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
		isDisplayingGroupsImages,
		toggleIsDisplayingGroupsImages,
	};
};
