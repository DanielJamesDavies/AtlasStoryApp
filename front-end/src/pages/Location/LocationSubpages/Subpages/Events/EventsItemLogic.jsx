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

export const EventsItemLogic = ({ eventsItem, index, locationImagesCurrDevItemIndex, isEditing }) => {
	const { locationImages, setLocation } = useContext(LocationContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderEventsItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			const tempDevImageItem = newLocation.data.events.items[index].images.splice(res.from, 1)[0];
			newLocation.data.events.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newLocation;
		});
	}

	function changeEventsItemImageCaption(e, imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.events.items[index].images[imageIndex].caption = e.target.value;
			return newLocation;
		});
	}

	function removeDevItemImage(imageIndex) {
		setLocation((oldLocation) => {
			let newLocation = JSON.parse(JSON.stringify(oldLocation));
			newLocation.data.events.items[index].images.splice(imageIndex, 1);
			return newLocation;
		});
	}

	function onEventsItemImageClick(imageIndex) {
		setLightboxImageIDs(eventsItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("location-subpage-events-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("location-subpage-events-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "location-subpage-events-item-text-container";
			if (eventsItem?.images?.length === 0) newClassName += " location-subpage-events-item-text-container-full-width";
			if (eventsItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-events-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "location-subpage-events-item-images-container";
			if (locationImagesCurrDevItemIndex === index) newClassName += " location-subpage-events-item-images-container-is-current";
			if (eventsItem?.images?.length === 0) newClassName += " location-subpage-events-item-images-container-no-width";
			if (eventsItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " location-subpage-events-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, eventsItem, index, locationImagesCurrDevItemIndex, isEditing]);

	return {
		locationImages,
		reorderEventsItemImages,
		changeEventsItemImageCaption,
		removeDevItemImage,
		onEventsItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
