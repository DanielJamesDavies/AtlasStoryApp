// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";

// Services

// Styles

// Assets

export const GalleryItemLogic = ({ image }) => {
	const { characterImages } = useContext(CharacterContext);

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

	return { galleryItemImage };
};
