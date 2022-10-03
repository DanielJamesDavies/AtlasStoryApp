// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../SubstoryContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const SubstoryImagesLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory, substoryImages, setSubstoryImages } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const substoryImagesContainerRef = useRef();

	useEffect(() => {
		const substoryImagesContainerRefCurrent = substoryImagesContainerRef?.current;

		function onSubstoryImagesContainerScroll(e) {
			if (substoryImagesContainerRefCurrent.children[0].scrollTop !== 0) e.stopPropagation();
		}

		substoryImagesContainerRefCurrent?.addEventListener("wheel", onSubstoryImagesContainerScroll);
		return () => substoryImagesContainerRefCurrent?.removeEventListener("wheel", onSubstoryImagesContainerScroll);
	}, [substoryImagesContainerRef]);

	const addImageInputRef = useRef();

	async function onAddImageToSubstoryImages(e) {
		const image = await getImageFromFile(e.target.files[0]);
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.images.push(new_id_response.data._id);

		setSubstory((oldSubstory) => {
			let newSubstory2 = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory2.data.images = newSubstory.data.images;
			return newSubstory;
		});

		setSubstoryImages((oldSubstoryImages) => {
			let newSubstoryImages = JSON.parse(JSON.stringify(oldSubstoryImages));
			newSubstoryImages.push({ _id: new_id_response.data._id, image: image.data, isUnsaved: true });
			return newSubstoryImages;
		});

		return true;
	}

	function removeSubstoryImage(image_id) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const imageIndex = newSubstory.data.images.findIndex((e) => e === image_id);
			if (imageIndex === -1) return newSubstory;
			newSubstory.data.images.splice(imageIndex, 1);
			return newSubstory;
		});

		setSubstoryImages((oldSubstoryImages) => {
			let newSubstoryImages = JSON.parse(JSON.stringify(oldSubstoryImages));
			const imageIndex = newSubstoryImages.findIndex((e) => e._id === image_id);
			if (imageIndex === -1) return newSubstoryImages;
			newSubstoryImages.splice(imageIndex, 1);
			return newSubstoryImages;
		});
	}

	const [isReorderingSubstoryImages, setIsReorderingSubstoryImages] = useState(false);
	function toggleIsReorderingSubstoryImages() {
		setIsReorderingSubstoryImages((oldIsReorderingSubstoryImages) => !oldIsReorderingSubstoryImages);
	}

	function reorderSubstoryImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const tempImage = newSubstory.data.images.splice(res.from, 1)[0];
			newSubstory.data.images.splice(res.to, 0, tempImage);
			return newSubstory;
		});
	}

	async function revertSubstoryImages() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "images"],
		});

		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.images = response.data.value;
			return newSubstory;
		});

		if (response?.data?.images) setSubstoryImages(response.data.images);

		return true;
	}

	async function saveSubstoryImages() {
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "images"],
			newValue: { substory_images: substory.data.images, images: substoryImages },
		});
		if (!response || response?.errors) return false;

		setSubstoryImages((oldSubstoryImages) => {
			let newSubstoryImages = JSON.parse(JSON.stringify(oldSubstoryImages));
			newSubstoryImages = newSubstoryImages.map((image) => {
				let newImage = JSON.parse(JSON.stringify(image));
				if (newImage.isUnsaved !== undefined) delete newImage.isUnsaved;
				return newImage;
			});
			return newSubstoryImages;
		});

		if (response?.data?.substory) {
			setSubstory((oldSubstory) => {
				let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
				newSubstory.data.images = response.data.substory.data.images;
				newSubstory.data.gallery = newSubstory.data.gallery.filter(
					(galleryItem) => newSubstory.data.images.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
				);
				return newSubstory;
			});
		}

		return true;
	}

	return {
		isAuthorizedToEdit,
		substory,
		substoryImagesContainerRef,
		addImageInputRef,
		onAddImageToSubstoryImages,
		removeSubstoryImage,
		isReorderingSubstoryImages,
		toggleIsReorderingSubstoryImages,
		reorderSubstoryImages,
		revertSubstoryImages,
		saveSubstoryImages,
	};
};
