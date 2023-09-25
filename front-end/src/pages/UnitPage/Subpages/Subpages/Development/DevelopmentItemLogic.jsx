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

export const DevelopmentItemLogic = ({ developmentItem, index, unitImagesCurrDevItemIndex, isEditing }) => {
	const { unit, setUnit, unitImages } = useContext(UnitPageContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderDevelopmentItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempDevImageItem = newUnit.data.development.items[index].images.splice(res.from, 1)[0];
			newUnit.data.development.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newUnit;
		});
	}

	function changeDevelopmentItemImageCaption(e, imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.development.items[index].images[imageIndex].caption = e.target.value;
			return newUnit;
		});
	}

	function removeDevItemImage(imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.development.items[index].images.splice(imageIndex, 1);
			return newUnit;
		});
	}

	function onDevelopmentItemImageClick(imageIndex) {
		setLightboxImageIDs(developmentItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("unit-page-subpage-development-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("unit-page-subpage-development-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "unit-page-subpage-development-item-text-container";
			if (!isEditing) {
				if (developmentItem?.images?.length === 0) newClassName += " unit-page-subpage-development-item-text-container-full-width";
				if (!developmentItem?.text || developmentItem?.text?.join("")?.replaceAll(" ", "")?.length === 0)
					newClassName += " unit-page-subpage-development-item-text-container-no-width";
			}
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "unit-page-subpage-development-item-images-container";
			if (unitImagesCurrDevItemIndex === index) newClassName += " unit-page-subpage-development-item-images-container-is-current";
			if (!isEditing) {
				if (developmentItem?.images?.length === 0) newClassName += " unit-page-subpage-development-item-images-container-no-width";
				if (!developmentItem?.text || developmentItem?.text?.join("")?.replaceAll(" ", "")?.length === 0)
					newClassName += " unit-page-subpage-development-item-images-container-full-width";
			}
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [unit, setDevItemTextContainerClassName, setDevItemImagesContainerClassName, developmentItem, index, unitImagesCurrDevItemIndex, isEditing]);

	return {
		unitImages,
		reorderDevelopmentItemImages,
		changeDevelopmentItemImageCaption,
		removeDevItemImage,
		onDevelopmentItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
