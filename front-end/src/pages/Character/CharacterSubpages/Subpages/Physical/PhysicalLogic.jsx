// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";
import { LightboxContext } from "../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const PhysicalLogic = () => {
	const { characterVersion, changeCharacterVersion, characterImages } = useContext(CharacterContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	const [characterImagesCurrItem, setCharacterImagesCurrItem] = useState(false);
	function openCharacterImages(type, index) {
		setCharacterImagesCurrItem({ type, index });
	}

	function closeCharacterImages() {
		setCharacterImagesCurrItem(false);
	}

	function addImageToItem(image_id) {
		const newCharacterImagesCurrItem = JSON.parse(JSON.stringify(characterImagesCurrItem));
		if (newCharacterImagesCurrItem === false) return;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		if (
			newCharacterVersion.physical[newCharacterImagesCurrItem?.type][newCharacterImagesCurrItem?.index].images.findIndex(
				(e) => e.image === image_id
			) !== -1
		)
			return false;
		newCharacterVersion.physical[newCharacterImagesCurrItem?.type][newCharacterImagesCurrItem?.index].images.push({
			image: image_id,
			caption: "",
		});
		changeCharacterVersion(newCharacterVersion);
	}

	function onPhysicalItemImageClick(type, itemIndex, imageIndex) {
		setLightboxImageIDs(characterVersion.physical[type][itemIndex].images);
		setLightboxIndex(imageIndex);
	}

	return { characterImagesCurrItem, characterImages, openCharacterImages, closeCharacterImages, addImageToItem, onPhysicalItemImageClick };
};
