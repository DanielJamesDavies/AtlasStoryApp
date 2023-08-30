// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../LocationContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const DetailsItemLogic = ({ detailsItem, index, locationImagesCurrDevItemIndex, isEditing }) => {
	const { locationImages, setLocation } = useContext(LocationContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderDetailsItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempDevImageItem = newLocation.data.details.items[index].images.splice(res.from, 1)[0];
			newLocation.data.details.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newLocation;
		});
	}

	function changeDetailsItemImageCaption(e, imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.details.items[index].images[imageIndex].caption = e.target.value;
			return newLocation;
		});
	}

	function removeDevItemImage(imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.details.items[index].images.splice(imageIndex, 1);
			return newLocation;
		});
	}

	function onDetailsItemImageClick(imageIndex) {
		setLightboxImageIDs(detailsItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("location-subpage-details-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("location-subpage-details-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "location-subpage-details-item-text-container";
			if (detailsItem?.images?.length === 0) newClassName += " location-subpage-details-item-text-container-full-width";
			if (detailsItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-details-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "location-subpage-details-item-images-container";
			if (locationImagesCurrDevItemIndex === index) newClassName += " location-subpage-details-item-images-container-is-current";
			if (detailsItem?.images?.length === 0) newClassName += " location-subpage-details-item-images-container-no-width";
			if (detailsItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-details-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, detailsItem, index, locationImagesCurrDevItemIndex, isEditing]);

	return {
		locationImages,
		reorderDetailsItemImages,
		changeDetailsItemImageCaption,
		removeDevItemImage,
		onDetailsItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
