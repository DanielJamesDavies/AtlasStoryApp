// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../GroupContext";

// Services

// Styles

// Assets

export const GalleryItemLogic = ({ image, index }) => {
	const { groupImages, groupVersion, changeGroupVersion } = useContext(GroupContext);

	const [galleryItemImage, setGalleryItemImage] = useState(false);

	useEffect(() => {
		function getGalleryItemImage() {
			if (!image?.image) return false;
			let newGalleryItemImage = groupImages.find((e) => e._id === image.image);
			if (!newGalleryItemImage) return false;
			return newGalleryItemImage.image;
		}
		setGalleryItemImage(getGalleryItemImage());
	}, [setGalleryItemImage, groupImages, image]);

	function changeGalleryItemCaption(e) {
		let newGroupVersion = JSON.parse(JSON.stringify(groupVersion));
		newGroupVersion.gallery[index].caption = e.target.value;
		changeGroupVersion(newGroupVersion);
	}

	return { galleryItemImage, changeGalleryItemCaption };
};
