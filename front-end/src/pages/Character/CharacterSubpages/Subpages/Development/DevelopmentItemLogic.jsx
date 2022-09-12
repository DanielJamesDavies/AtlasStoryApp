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

export const DevelopmentItemLogic = ({ developmentItem, index, characterImagesCurrDevItemIndex, isEditing }) => {
	const { characterImages, setCharacter } = useContext(CharacterContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderDevelopmentItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const tempDevImageItem = newCharacter.data.development.items[index].images.splice(res.from, 1)[0];
			newCharacter.data.development.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newCharacter;
		});
	}

	function changeDevelopmentItemImageCaption(e, imageIndex) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.development.items[index].images[imageIndex].caption = e.target.value;
			return newCharacter;
		});
	}

	function removeDevItemImage(imageIndex) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.development.items[index].images.splice(imageIndex, 1);
			return newCharacter;
		});
	}

	function onDevelopmentItemImageClick(imageIndex) {
		setLightboxImageIDs(developmentItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("character-subpage-development-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("character-subpage-development-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "character-subpage-development-item-text-container";
			if (!isEditing && developmentItem?.images?.length === 0)
				newClassName += " character-subpage-development-item-text-container-full-width";
			if (!isEditing && developmentItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " character-subpage-development-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "character-subpage-development-item-images-container";
			if (characterImagesCurrDevItemIndex === index) newClassName += " character-subpage-development-item-images-container-is-current";
			if (!isEditing && developmentItem?.images?.length === 0)
				newClassName += " character-subpage-development-item-images-container-no-width";
			if (!isEditing && developmentItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " character-subpage-development-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [setDevItemTextContainerClassName, setDevItemImagesContainerClassName, developmentItem, index, characterImagesCurrDevItemIndex, isEditing]);

	return {
		characterImages,
		reorderDevelopmentItemImages,
		changeDevelopmentItemImageCaption,
		removeDevItemImage,
		onDevelopmentItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
