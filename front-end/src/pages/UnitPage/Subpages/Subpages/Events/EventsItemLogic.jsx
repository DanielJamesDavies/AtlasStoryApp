// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const EventsItemLogic = ({ eventsItem, index, unitImagesCurrDevItemIndex, isEditing }) => {
	const { unit, setUnit, unitImages } = useContext(UnitPageContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderEventsItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempDevImageItem = newUnit.data.events.items[index].images.splice(res.from, 1)[0];
			newUnit.data.events.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newUnit;
		});
	}

	function changeEventsItemImageCaption(e, imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.events.items[index].images[imageIndex].caption = e.target.value;
			return newUnit;
		});
	}

	function removeDevItemImage(imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.events.items[index].images.splice(imageIndex, 1);
			return newUnit;
		});
	}

	function onEventsItemImageClick(imageIndex) {
		setLightboxImageIDs(eventsItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("unit-page-subpage-events-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("unit-page-subpage-events-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "unit-page-subpage-events-item-text-container";
			if (!isEditing) {
				if (eventsItem?.images?.length === 0) newClassName += " unit-page-subpage-events-item-text-container-full-width";
				if (!eventsItem?.text || eventsItem?.text?.join("")?.replaceAll(" ", "")?.length === 0)
					newClassName += " unit-page-subpage-events-item-text-container-no-width";
			}
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "unit-page-subpage-events-item-images-container";
			if (unitImagesCurrDevItemIndex === index) newClassName += " unit-page-subpage-events-item-images-container-is-current";
			if (!isEditing) {
				if (eventsItem?.images?.length === 0) newClassName += " unit-page-subpage-events-item-images-container-no-width";
				if (!eventsItem?.text || eventsItem?.text?.join("")?.replaceAll(" ", "")?.length === 0)
					newClassName += " unit-page-subpage-events-item-images-container-full-width";
			}
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [unit, setDevItemTextContainerClassName, setDevItemImagesContainerClassName, eventsItem, index, unitImagesCurrDevItemIndex, isEditing]);

	return {
		unitImages,
		reorderEventsItemImages,
		changeEventsItemImageCaption,
		removeDevItemImage,
		onEventsItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
