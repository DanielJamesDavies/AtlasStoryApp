// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../LocationContext";

// Services

// Styles

// Assets

export const GalleryItemLogic = ({ image, index }) => {
	const { locationImages, location, setLocation } = useContext(LocationContext);

	const [galleryItemImage, setGalleryItemImage] = useState(false);

	useEffect(() => {
		function getGalleryItemImage() {
			if (!image?.image) return false;
			let newGalleryItemImage = locationImages.find((e) => e._id === image.image);
			if (!newGalleryItemImage) return false;
			return newGalleryItemImage.image;
		}
		setGalleryItemImage(getGalleryItemImage());
	}, [setGalleryItemImage, locationImages, image]);

	function changeGalleryItemCaption(e) {
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.gallery[index].caption = e.target.value;
		setLocation(newLocation);
	}

	return { galleryItemImage, changeGalleryItemCaption };
};
