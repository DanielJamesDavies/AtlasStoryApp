// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../LocationContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const LocationImagesLogic = () => {
	const { isAuthorizedToEdit, story, location, setLocation, locationImages, setLocationImages } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);
	const locationImagesContainerRef = useRef();

	useEffect(() => {
		const locationImagesContainerRefCurrent = locationImagesContainerRef?.current;

		function onLocationImagesContainerScroll(e) {
			if (locationImagesContainerRefCurrent.children[0].scrollTop !== 0) e.stopPropagation();
		}

		locationImagesContainerRefCurrent?.addEventListener("wheel", onLocationImagesContainerScroll);
		return () => locationImagesContainerRefCurrent?.removeEventListener("wheel", onLocationImagesContainerScroll);
	}, [locationImagesContainerRef]);

	const addImageInputRef = useRef();

	async function onAddImageToLocationImages(e) {
		const image = await getImageFromFile(e.target.files[0]);
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.images.push(new_id_response.data._id);

		setLocation((oldLocation) => {
			let newLocation2 = JSON.parse(JSON.stringify(oldLocation));
			newLocation2.data.images = newLocation.data.images;
			return newLocation;
		});

		setLocationImages((oldLocationImages) => {
			let newLocationImages = JSON.parse(JSON.stringify(oldLocationImages));
			newLocationImages.push({ _id: new_id_response.data._id, image: image.data, isUnsaved: true });
			return newLocationImages;
		});

		return true;
	}

	function removeLocationImage(image_id) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const imageIndex = newLocation.data.images.findIndex((e) => e === image_id);
			if (imageIndex === -1) return newLocation;
			newLocation.data.images.splice(imageIndex, 1);
			return newLocation;
		});

		setLocationImages((oldLocationImages) => {
			let newLocationImages = JSON.parse(JSON.stringify(oldLocationImages));
			const imageIndex = newLocationImages.findIndex((e) => e._id === image_id);
			if (imageIndex === -1) return newLocationImages;
			newLocationImages.splice(imageIndex, 1);
			return newLocationImages;
		});
	}

	const [isReorderingLocationImages, setIsReorderingLocationImages] = useState(false);
	function toggleIsReorderingLocationImages() {
		setIsReorderingLocationImages((oldIsReorderingLocationImages) => !oldIsReorderingLocationImages);
	}

	function reorderLocationImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempImage = newLocation.data.images.splice(res.from, 1)[0];
			newLocation.data.images.splice(res.to, 0, tempImage);
			return newLocation;
		});
	}

	async function revertLocationImages() {
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "images"],
		});

		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.images = response.data.value;
			return newLocation;
		});

		if (response?.data?.images) setLocationImages(response.data.images);

		return true;
	}

	async function saveLocationImages() {
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "images"],
			newValue: { location_images: location.data.images, images: locationImages },
		});
		if (!response || response?.errors) return false;

		setLocationImages((oldLocationImages) => {
			let newLocationImages = JSON.parse(JSON.stringify(oldLocationImages));
			newLocationImages = newLocationImages.map((image) => {
				let newImage = JSON.parse(JSON.stringify(image));
				if (newImage.isUnsaved !== undefined) delete newImage.isUnsaved;
				return newImage;
			});
			return newLocationImages;
		});

		if (response?.data?.location) {
			setLocation((oldLocation) => {
				let newLocation = JSON.parse(JSON.stringify(oldLocation));
				newLocation.data.images = response.data.location.data.images;
				newLocation.data.gallery = newLocation.data.gallery.filter(
					(galleryItem) => newLocation.data.images.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
				);
				return newLocation;
			});
		}

		return true;
	}

	return {
		isAuthorizedToEdit,
		location,
		locationImagesContainerRef,
		addImageInputRef,
		onAddImageToLocationImages,
		removeLocationImage,
		isReorderingLocationImages,
		toggleIsReorderingLocationImages,
		reorderLocationImages,
		revertLocationImages,
		saveLocationImages,
	};
};
