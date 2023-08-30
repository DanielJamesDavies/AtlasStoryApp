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

export const MiscellaneousItemLogic = ({ miscellaneousItem, index, locationImagesCurrDevItemIndex, isEditing }) => {
	const { locationImages, setLocation } = useContext(LocationContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderMiscellaneousItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempDevImageItem = newLocation.data.miscellaneous.items[index].images.splice(res.from, 1)[0];
			newLocation.data.miscellaneous.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newLocation;
		});
	}

	function changeMiscellaneousItemImageCaption(e, imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.miscellaneous.items[index].images[imageIndex].caption = e.target.value;
			return newLocation;
		});
	}

	function removeDevItemImage(imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.miscellaneous.items[index].images.splice(imageIndex, 1);
			return newLocation;
		});
	}

	function onMiscellaneousItemImageClick(imageIndex) {
		setLightboxImageIDs(miscellaneousItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("location-subpage-miscellaneous-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("location-subpage-miscellaneous-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "location-subpage-miscellaneous-item-text-container";
			if (miscellaneousItem?.images?.length === 0) newClassName += " location-subpage-miscellaneous-item-text-container-full-width";
			if (miscellaneousItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-miscellaneous-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "location-subpage-miscellaneous-item-images-container";
			if (locationImagesCurrDevItemIndex === index) newClassName += " location-subpage-miscellaneous-item-images-container-is-current";
			if (miscellaneousItem?.images?.length === 0) newClassName += " location-subpage-miscellaneous-item-images-container-no-width";
			if (miscellaneousItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-miscellaneous-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, miscellaneousItem, index, locationImagesCurrDevItemIndex, isEditing]);

	return {
		locationImages,
		reorderMiscellaneousItemImages,
		changeMiscellaneousItemImageCaption,
		removeDevItemImage,
		onMiscellaneousItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
