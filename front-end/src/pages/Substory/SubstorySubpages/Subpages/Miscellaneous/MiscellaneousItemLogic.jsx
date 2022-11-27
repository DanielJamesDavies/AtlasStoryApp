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

export const MiscellaneousItemLogic = ({ miscellaneousItem, index, substoryImagesCurrDevItemIndex, isEditing }) => {
	const { substoryImages, setSubstory } = useContext(SubstoryContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderMiscellaneousItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			const tempDevImageItem = newSubstory.data.miscellaneous.items[index].images.splice(res.from, 1)[0];
			newSubstory.data.miscellaneous.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newSubstory;
		});
	}

	function changeMiscellaneousItemImageCaption(e, imageIndex) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.miscellaneous.items[index].images[imageIndex].caption = e.target.value;
			return newSubstory;
		});
	}

	function removeDevItemImage(imageIndex) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.miscellaneous.items[index].images.splice(imageIndex, 1);
			return newSubstory;
		});
	}

	function onMiscellaneousItemImageClick(imageIndex) {
		setLightboxImageIDs(miscellaneousItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("substory-subpage-miscellaneous-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("substory-subpage-miscellaneous-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "substory-subpage-miscellaneous-item-text-container";
			if (!isEditing && miscellaneousItem?.images?.length === 0)
				newClassName += " substory-subpage-miscellaneous-item-text-container-full-width";
			if (!isEditing && miscellaneousItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " substory-subpage-miscellaneous-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "substory-subpage-miscellaneous-item-images-container";
			if (substoryImagesCurrDevItemIndex === index) newClassName += " substory-subpage-miscellaneous-item-images-container-is-current";
			if (!isEditing && miscellaneousItem?.images?.length === 0)
				newClassName += " substory-subpage-miscellaneous-item-images-container-no-width";
			if (!isEditing && miscellaneousItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " substory-subpage-miscellaneous-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, miscellaneousItem, index, substoryImagesCurrDevItemIndex, isEditing]);

	return {
		substoryImages,
		reorderMiscellaneousItemImages,
		changeMiscellaneousItemImageCaption,
		removeDevItemImage,
		onMiscellaneousItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
