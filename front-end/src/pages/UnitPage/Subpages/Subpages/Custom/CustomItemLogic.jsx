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

export const CustomItemLogic = ({ customItem, index, unitImagesCurrDevItemIndex, isEditing }) => {
	const { unitImages, setUnit, openSubpageID } = useContext(UnitPageContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderCustomItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempDevImageItem = newUnit.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.from, 1)[0];
			newUnit.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.to, 0, tempDevImageItem);
			return newUnit;
		});
	}

	function changeCustomItemImageCaption(e, imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newUnit.data.custom_subpages[customSubpageIndex].items[index].images[imageIndex].caption = e.target.value;
			return newUnit;
		});
	}

	function removeDevItemImage(imageIndex) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const customSubpageIndex = newUnit.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newUnit.data.custom_subpages[customSubpageIndex].items[index].images.splice(imageIndex, 1);
			return newUnit;
		});
	}

	function onCustomItemImageClick(imageIndex) {
		setLightboxImageIDs(customItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("unit-page-subpage-custom-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("unit-page-subpage-custom-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "unit-page-subpage-custom-item-text-container";
			if (!isEditing) {
				if (customItem?.images?.length === 0) newClassName += " unit-page-subpage-custom-item-text-container-full-width";
				if (customItem?.value?.join("").split(" ").join("").length === 0)
					newClassName += " unit-page-subpage-custom-item-text-container-no-width";
			}
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "unit-page-subpage-custom-item-images-container";
			if (unitImagesCurrDevItemIndex === index) newClassName += " unit-page-subpage-custom-item-images-container-is-current";
			if (!isEditing) {
				if (customItem?.images?.length === 0) newClassName += " unit-page-subpage-custom-item-images-container-no-width";
				if (customItem?.value?.join("").split(" ").join("").length === 0)
					newClassName += " unit-page-subpage-custom-item-images-container-full-width";
			}
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, customItem, index, unitImagesCurrDevItemIndex, isEditing]);

	return {
		unitImages,
		reorderCustomItemImages,
		changeCustomItemImageCaption,
		removeDevItemImage,
		onCustomItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
