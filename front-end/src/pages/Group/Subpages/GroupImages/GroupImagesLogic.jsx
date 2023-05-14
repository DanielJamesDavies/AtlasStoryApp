// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../GroupContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const GroupImagesLogic = () => {
	const { isAuthorizedToEdit, story, group, setGroup, groupImages, setGroupImages, groupVersion, changeGroupVersion } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);
	const groupImagesContainerRef = useRef();

	useEffect(() => {
		const groupImagesContainerRefCurrent = groupImagesContainerRef?.current;

		function onGroupImagesContainerScroll(e) {
			if (groupImagesContainerRefCurrent.children[0].scrollTop !== 0) e.stopPropagation();
		}

		groupImagesContainerRefCurrent?.addEventListener("wheel", onGroupImagesContainerScroll);
		return () => groupImagesContainerRefCurrent?.removeEventListener("wheel", onGroupImagesContainerScroll);
	}, [groupImagesContainerRef]);

	const addImageInputRef = useRef();

	async function onAddImageToGroupImages(e) {
		const image = await getImageFromFile(e.target.files[0]);
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		let newGroup = JSON.parse(JSON.stringify(group));
		newGroup.data.images.push(new_id_response.data._id);

		setGroup((oldGroup) => {
			let newGroup2 = JSON.parse(JSON.stringify(oldGroup));
			newGroup2.data.images = newGroup.data.images;
			return newGroup;
		});

		setGroupImages((oldGroupImages) => {
			let newGroupImages = JSON.parse(JSON.stringify(oldGroupImages));
			newGroupImages.push({ _id: new_id_response.data._id, image: image.data, isUnsaved: true });
			return newGroupImages;
		});

		return true;
	}

	function removeGroupImage(image_id) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const imageIndex = newGroup.data.images.findIndex((e) => e === image_id);
			if (imageIndex === -1) return newGroup;
			newGroup.data.images.splice(imageIndex, 1);
			return newGroup;
		});

		setGroupImages((oldGroupImages) => {
			let newGroupImages = JSON.parse(JSON.stringify(oldGroupImages));
			const imageIndex = newGroupImages.findIndex((e) => e._id === image_id);
			if (imageIndex === -1) return newGroupImages;
			newGroupImages.splice(imageIndex, 1);
			return newGroupImages;
		});
	}

	const [isReorderingGroupImages, setIsReorderingGroupImages] = useState(false);
	function toggleIsReorderingGroupImages() {
		setIsReorderingGroupImages((oldIsReorderingGroupImages) => !oldIsReorderingGroupImages);
	}

	function reorderGroupImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const tempImage = newGroup.data.images.splice(res.from, 1)[0];
			newGroup.data.images.splice(res.to, 0, tempImage);
			return newGroup;
		});
	}

	async function revertGroupImages() {
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "images"],
		});

		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.images = response.data.value;
			return newGroup;
		});

		if (response?.data?.images) setGroupImages(response.data.images);

		return true;
	}

	async function saveGroupImages() {
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "images"],
			newValue: { group_images: group.data.images, images: groupImages },
		});
		if (!response || response?.errors) return false;

		setGroupImages((oldGroupImages) => {
			let newGroupImages = JSON.parse(JSON.stringify(oldGroupImages));
			newGroupImages = newGroupImages.map((image) => {
				let newImage = JSON.parse(JSON.stringify(image));
				if (newImage.isUnsaved !== undefined) delete newImage.isUnsaved;
				return newImage;
			});
			return newGroupImages;
		});

		if (response?.data?.group) {
			setGroup((oldGroup) => {
				let newGroup = JSON.parse(JSON.stringify(oldGroup));
				newGroup.data.images = response.data.group.data.images;
				newGroup.data.versions = newGroup.data.versions.map((version) => {
					version.gallery = version.gallery.filter(
						(galleryItem) => newGroup.data.images.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
					);
					return version;
				});
				return newGroup;
			});

			let newGroupVersion = JSON.parse(JSON.stringify(groupVersion));
			newGroupVersion.gallery = newGroupVersion.gallery.filter(
				(galleryItem) => response.data.group.data.images.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
			);
			changeGroupVersion(newGroupVersion);
		}

		return true;
	}

	return {
		isAuthorizedToEdit,
		group,
		groupImagesContainerRef,
		addImageInputRef,
		onAddImageToGroupImages,
		removeGroupImage,
		isReorderingGroupImages,
		toggleIsReorderingGroupImages,
		reorderGroupImages,
		revertGroupImages,
		saveGroupImages,
	};
};
