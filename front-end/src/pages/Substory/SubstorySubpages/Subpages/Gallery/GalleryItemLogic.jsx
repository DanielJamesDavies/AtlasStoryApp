// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../SubstoryContext";

// Services

// Styles

// Assets

export const GalleryItemLogic = ({ image, index }) => {
	const { substoryImages, substory, setSubstory } = useContext(SubstoryContext);

	const [galleryItemImage, setGalleryItemImage] = useState(false);

	useEffect(() => {
		function getGalleryItemImage() {
			if (!image?.image) return false;
			let newGalleryItemImage = substoryImages.find((e) => e._id === image.image);
			if (!newGalleryItemImage) return false;
			return newGalleryItemImage.image;
		}
		setGalleryItemImage(getGalleryItemImage());
	}, [setGalleryItemImage, substoryImages, image]);

	function changeGalleryItemCaption(e) {
		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.gallery[index].caption = e.target.value;
		setSubstory(newSubstory);
	}

	return { galleryItemImage, changeGalleryItemCaption };
};
