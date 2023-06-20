// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../SubstoryContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const CustomItemLogic = ({ customItem, index, substoryImagesCurrDevItemIndex, isEditing }) => {
	const { substoryImages, setSubstory, openSubpageID } = useContext(SubstoryContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderCustomItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempDevImageItem = newSubstory.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.from, 1)[0];
			newSubstory.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.to, 0, tempDevImageItem);
			return newSubstory;
		});
	}

	function changeCustomItemImageCaption(e, imageIndex) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newSubstory.data.custom_subpages[customSubpageIndex].items[index].images[imageIndex].caption = e.target.value;
			return newSubstory;
		});
	}

	function removeDevItemImage(imageIndex) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newSubstory.data.custom_subpages[customSubpageIndex].items[index].images.splice(imageIndex, 1);
			return newSubstory;
		});
	}

	function onCustomItemImageClick(imageIndex) {
		setLightboxImageIDs(customItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("substory-subpage-custom-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("substory-subpage-custom-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "substory-subpage-custom-item-text-container";
			if (customItem?.images?.length === 0) newClassName += " substory-subpage-custom-item-text-container-full-width";
			if (customItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " substory-subpage-custom-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "substory-subpage-custom-item-images-container";
			if (substoryImagesCurrDevItemIndex === index) newClassName += " substory-subpage-custom-item-images-container-is-current";
			if (customItem?.images?.length === 0) newClassName += " substory-subpage-custom-item-images-container-no-width";
			if (customItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " substory-subpage-custom-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, customItem, index, substoryImagesCurrDevItemIndex, isEditing]);

	return {
		substoryImages,
		reorderCustomItemImages,
		changeCustomItemImageCaption,
		removeDevItemImage,
		onCustomItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
