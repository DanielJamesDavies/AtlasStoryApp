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

export const DevelopmentItemLogic = ({ developmentItem, index, substoryImagesCurrDevItemIndex, isEditing }) => {
	const { substoryImages, setSubstory } = useContext(SubstoryContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderDevelopmentItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const tempDevImageItem = newSubstory.data.development.items[index].images.splice(res.from, 1)[0];
			newSubstory.data.development.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newSubstory;
		});
	}

	function changeDevelopmentItemImageCaption(e, imageIndex) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.development.items[index].images[imageIndex].caption = e.target.value;
			return newSubstory;
		});
	}

	function removeDevItemImage(imageIndex) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.development.items[index].images.splice(imageIndex, 1);
			return newSubstory;
		});
	}

	function onDevelopmentItemImageClick(imageIndex) {
		setLightboxImageIDs(developmentItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("substory-subpage-development-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("substory-subpage-development-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "substory-subpage-development-item-text-container";
			if (developmentItem?.images?.length === 0) newClassName += " substory-subpage-development-item-text-container-full-width";
			if (developmentItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " substory-subpage-development-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "substory-subpage-development-item-images-container";
			if (substoryImagesCurrDevItemIndex === index) newClassName += " substory-subpage-development-item-images-container-is-current";
			if (developmentItem?.images?.length === 0) newClassName += " substory-subpage-development-item-images-container-no-width";
			if (developmentItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " substory-subpage-development-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, developmentItem, index, substoryImagesCurrDevItemIndex, isEditing]);

	return {
		substoryImages,
		reorderDevelopmentItemImages,
		changeDevelopmentItemImageCaption,
		removeDevItemImage,
		onDevelopmentItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
