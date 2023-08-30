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

export const CustomItemLogic = ({ customItem, index, locationImagesCurrDevItemIndex, isEditing }) => {
	const { locationImages, setLocation, openSubpageID } = useContext(LocationContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderCustomItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempDevImageItem = newLocation.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.from, 1)[0];
			newLocation.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.to, 0, tempDevImageItem);
			return newLocation;
		});
	}

	function changeCustomItemImageCaption(e, imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newLocation.data.custom_subpages[customSubpageIndex].items[index].images[imageIndex].caption = e.target.value;
			return newLocation;
		});
	}

	function removeDevItemImage(imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const customSubpageIndex = newLocation.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newLocation.data.custom_subpages[customSubpageIndex].items[index].images.splice(imageIndex, 1);
			return newLocation;
		});
	}

	function onCustomItemImageClick(imageIndex) {
		setLightboxImageIDs(customItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("location-subpage-custom-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("location-subpage-custom-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "location-subpage-custom-item-text-container";
			if (customItem?.images?.length === 0) newClassName += " location-subpage-custom-item-text-container-full-width";
			if (customItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-custom-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "location-subpage-custom-item-images-container";
			if (locationImagesCurrDevItemIndex === index) newClassName += " location-subpage-custom-item-images-container-is-current";
			if (customItem?.images?.length === 0) newClassName += " location-subpage-custom-item-images-container-no-width";
			if (customItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-custom-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, customItem, index, locationImagesCurrDevItemIndex, isEditing]);

	return {
		locationImages,
		reorderCustomItemImages,
		changeCustomItemImageCaption,
		removeDevItemImage,
		onCustomItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
