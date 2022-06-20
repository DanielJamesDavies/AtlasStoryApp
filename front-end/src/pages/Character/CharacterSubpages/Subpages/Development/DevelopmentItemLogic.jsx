// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";

// Services

// Styles

// Assets

export const DevelopmentItemLogic = ({ index }) => {
	const { characterImages, characterVersion, changeCharacterVersion } = useContext(CharacterContext);

	async function reorderDevelopmentItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempDevImageItem = newCharacterVersion.development.items[index].images.splice(res.from, 1)[0];
		newCharacterVersion.development.items[index].images.splice(res.to, 0, tempDevImageItem);
		changeCharacterVersion(newCharacterVersion);
	}

	function changeDevelopmentItemImageCaption(e, imageIndex) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.development.items[index].images[imageIndex].caption = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	function removeDevItemImage(imageIndex) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.development.items[index].images.splice(imageIndex, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	return { characterImages, reorderDevelopmentItemImages, changeDevelopmentItemImageCaption, removeDevItemImage };
};
