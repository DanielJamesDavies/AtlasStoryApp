// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../../../../LocationsContext";
import { LocationContext } from "../../../../LocationContext";
import { LightboxContext } from "../../../../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const DevelopmentItemLogic = ({ developmentItem, index, isEditing }) => {
	const { locations, setLocations, selectedLocationId } = useContext(LocationsContext);
	const { locationImages, setLocation } = useContext(LocationContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderDevelopmentItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempDevImageItem = newLocation.data.development.items[index].images.splice(res.from, 1)[0];
			newLocation.data.development.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		const tempDevImageItem = newLocations[locationIndex].data.development.items[index].images.splice(res.from, 1)[0];
		newLocations[locationIndex].data.development.items[index].images.splice(res.to, 0, tempDevImageItem);
		setLocations(newLocations);
	}

	function changeDevelopmentItemImageCaption(e, imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.development.items[index].images[imageIndex].caption = e.target.value;
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.development.items[index].images[imageIndex].caption = e.target.value;
		setLocations(newLocations);
	}

	function removeDevItemImage(imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.development.items[index].images.splice(imageIndex, 1);
			return newLocation;
		});
		const newSelectedLocationId = JSON.parse(JSON.stringify(selectedLocationId));
		let newLocations = JSON.parse(JSON.stringify(locations));
		const locationIndex = newLocations.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newSelectedLocationId));
		newLocations[locationIndex].data.development.items[index].images.splice(imageIndex, 1);
		setLocations(newLocations);
	}

	function onDevelopmentItemImageClick(imageIndex) {
		setLightboxImageIDs(developmentItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("location-subpage-development-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("location-subpage-development-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "location-subpage-development-item-text-container";
			if (developmentItem?.images?.length === 0) newClassName += " location-subpage-development-item-text-container-full-width";
			if (developmentItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-development-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "location-subpage-development-item-images-container";
			if (developmentItem?.images?.length === 0) newClassName += " location-subpage-development-item-images-container-no-width";
			if (developmentItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-development-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, developmentItem, index, isEditing]);

	return {
		locationImages,
		reorderDevelopmentItemImages,
		changeDevelopmentItemImageCaption,
		removeDevItemImage,
		onDevelopmentItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
