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

export const MiscellaneousItemLogic = ({ miscellaneousItem, index, characterImagesCurrDevItemIndex, isEditing }) => {
	const { characterImages, setCharacter } = useContext(CharacterContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function reorderMiscellaneousItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const tempDevImageItem = newCharacter.data.miscellaneous.items[index].images.splice(res.from, 1)[0];
			newCharacter.data.miscellaneous.items[index].images.splice(res.to, 0, tempDevImageItem);
			return newCharacter;
		});
	}

	function changeMiscellaneousItemImageCaption(e, imageIndex) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.miscellaneous.items[index].images[imageIndex].caption = e.target.value;
			return newCharacter;
		});
	}

	function removeDevItemImage(imageIndex) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.miscellaneous.items[index].images.splice(imageIndex, 1);
			return newCharacter;
		});
	}

	function onMiscellaneousItemImageClick(imageIndex) {
		setLightboxImageIDs(miscellaneousItem.images);
		setLightboxIndex(imageIndex);
	}

	const [devItemTextContainerClassName, setDevItemTextContainerClassName] = useState("character-subpage-miscellaneous-item-text-container");
	const [devItemImagesContainerClassName, setDevItemImagesContainerClassName] = useState("character-subpage-miscellaneous-item-images-container");
	useEffect(() => {
		function getDevItemTextContainerClassName() {
			let newClassName = "character-subpage-miscellaneous-item-text-container";
			if (!isEditing && miscellaneousItem?.images?.length === 0)
				newClassName += " character-subpage-miscellaneous-item-text-container-full-width";
			if (!isEditing && miscellaneousItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " character-subpage-miscellaneous-item-text-container-no-width";
			return newClassName;
		}
		function getDevItemImagesContainerClassName() {
			let newClassName = "character-subpage-miscellaneous-item-images-container";
			if (characterImagesCurrDevItemIndex === index) newClassName += " character-subpage-miscellaneous-item-images-container-is-current";
			if (!isEditing && miscellaneousItem?.images?.length === 0)
				newClassName += " character-subpage-miscellaneous-item-images-container-no-width";
			if (!isEditing && miscellaneousItem?.value?.join("").split(" ").join("").length === 0)
				newClassName += " character-subpage-miscellaneous-item-images-container-full-width";
			return newClassName;
		}
		setDevItemTextContainerClassName(getDevItemTextContainerClassName());
		setDevItemImagesContainerClassName(getDevItemImagesContainerClassName());
	}, [
		setDevItemTextContainerClassName,
		setDevItemImagesContainerClassName,
		miscellaneousItem,
		index,
		characterImagesCurrDevItemIndex,
		isEditing,
	]);

	return {
		characterImages,
		reorderMiscellaneousItemImages,
		changeMiscellaneousItemImageCaption,
		removeDevItemImage,
		onMiscellaneousItemImageClick,
		devItemTextContainerClassName,
		devItemImagesContainerClassName,
	};
};
