// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const CustomItemLogic = ({ customItem, index, characterImagesCurrDevItemIndex, isEditing }) => {
	const { characterImages, setCharacter, openSubpageID } = useContext(CharacterContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderCustomItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempDevImageItem = newCharacter.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.from, 1)[0];
			newCharacter.data.custom_subpages[customSubpageIndex].items[index].images.splice(res.to, 0, tempDevImageItem);
			return newCharacter;
		});
	}

	function changeCustomItemImageCaption(e, imageIndex) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newCharacter.data.custom_subpages[customSubpageIndex].items[index].images[imageIndex].caption = e.target.value;
			return newCharacter;
		});
	}

	function removeDevItemImage(imageIndex) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newCharacter.data.custom_subpages[customSubpageIndex].items[index].images.splice(imageIndex, 1);
			return newCharacter;
		});
	}

	function onCustomItemImageClick(imageIndex) {
		setLightboxImageIDs(customItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("character-subpage-custom-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("character-subpage-custom-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "character-subpage-custom-item-text-container";
			if (customItem?.images?.length === 0) newClassName += " character-subpage-custom-item-text-container-full-width";
			if (customItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " character-subpage-custom-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "character-subpage-custom-item-images-container";
			if (characterImagesCurrDevItemIndex === index) newClassName += " character-subpage-custom-item-images-container-is-current";
			if (customItem?.images?.length === 0) newClassName += " character-subpage-custom-item-images-container-no-width";
			if (customItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " character-subpage-custom-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, customItem, index, characterImagesCurrDevItemIndex, isEditing]);

	return {
		characterImages,
		reorderCustomItemImages,
		changeCustomItemImageCaption,
		removeDevItemImage,
		onCustomItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
