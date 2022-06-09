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
	const { characterGalleryImages } = useContext(CharacterContext);

	const [galleryItemImage, setGalleryItemImage] = useState(false);

	useEffect(() => {
		function getGalleryItemImage() {
			if (!image) return false;
			let newGalleryItemImage = characterGalleryImages.find((e) => e._id === image);
			if (!newGalleryItemImage) return false;
			return newGalleryItemImage.image;
		}
		setGalleryItemImage(getGalleryItemImage());
	}, [setGalleryItemImage, characterGalleryImages, image]);

	return { galleryItemImage };
};
