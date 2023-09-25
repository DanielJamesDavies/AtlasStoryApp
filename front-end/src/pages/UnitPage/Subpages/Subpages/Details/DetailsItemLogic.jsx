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

export const DetailsItemLogic = ({ detailsItem, index, unitImagesCurrDevItemIndex, isEditing }) => {
	const { unit, setUnit, unitImages } = useContext(UnitPageContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderDetailsItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempDevImageItem = newUnit.data.details.items[index].images.splice(res.from, 1)[0];
			newUnit.data.details.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newUnit;
		});
	}

	function changeDetailsItemImageCaption(e, imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.details.items[index].images[imageIndex].caption = e.target.value;
			return newUnit;
		});
	}

	function removeDevItemImage(imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.details.items[index].images.splice(imageIndex, 1);
			return newUnit;
		});
	}

	function onDetailsItemImageClick(imageIndex) {
		setLightboxImageIDs(detailsItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("unit-page-subpage-details-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("unit-page-subpage-details-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "unit-page-subpage-details-item-text-container";
			if (!isEditing) {
				if (detailsItem?.images?.length === 0) newClassName += " unit-page-subpage-details-item-text-container-full-width";
				if (!detailsItem?.text || detailsItem?.text?.join("")?.replaceAll(" ", "")?.length === 0)
					newClassName += " unit-page-subpage-details-item-text-container-no-width";
			}
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "unit-page-subpage-details-item-images-container";
			if (unitImagesCurrDevItemIndex === index) newClassName += " unit-page-subpage-details-item-images-container-is-current";
			if (!isEditing) {
				if (detailsItem?.images?.length === 0) newClassName += " unit-page-subpage-details-item-images-container-no-width";
				if (!detailsItem?.text || detailsItem?.text?.join("")?.replaceAll(" ", "")?.length === 0)
					newClassName += " unit-page-subpage-details-item-images-container-full-width";
			}
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [unit, setDevItemTextContainerClassName, setDevItemImagesContainerClassName, detailsItem, index, unitImagesCurrDevItemIndex, isEditing]);

	return {
		unitImages,
		reorderDetailsItemImages,
		changeDetailsItemImageCaption,
		removeDevItemImage,
		onDetailsItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
