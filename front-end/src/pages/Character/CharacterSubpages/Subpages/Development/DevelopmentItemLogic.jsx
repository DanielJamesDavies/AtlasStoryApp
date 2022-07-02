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
	const { characterImages, setCharacter } = useContext(CharacterContext);

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

	return { characterImages, reorderDevelopmentItemImages, changeDevelopmentItemImageCaption, removeDevItemImage };
};
