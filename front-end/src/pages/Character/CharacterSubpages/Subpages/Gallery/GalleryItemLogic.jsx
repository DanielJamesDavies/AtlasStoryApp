// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";

// Services

// Styles

// Assets

export const GalleryItemLogic = ({ image, index }) => {
	const { characterImages, characterVersion, changeCharacterVersion } = useContext(CharacterContext);

	const [galleryItemImage, setGalleryItemImage] = useState(false);

	useEffect(() => {
		function getGalleryItemImage() {
			if (!image?.image) return false;
			let newGalleryItemImage = characterImages.find((e) => e._id === image.image);
			if (!newGalleryItemImage) return false;
			return newGalleryItemImage.image;
		}
		setGalleryItemImage(getGalleryItemImage());
	}, [setGalleryItemImage, characterImages, image]);

	function changeGalleryItemCaption(e) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.gallery[index].caption = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	return { galleryItemImage, changeGalleryItemCaption };
};
