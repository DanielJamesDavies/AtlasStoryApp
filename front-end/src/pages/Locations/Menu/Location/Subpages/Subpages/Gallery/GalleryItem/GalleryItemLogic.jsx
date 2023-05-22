// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../../LocationContext";

// Services

// Styles

// Assets

export const GalleryItemLogic = ({ item, index }) => {
	const { location, locationImages, changeLocation } = useContext(LocationContext);

	const [image, setImage] = useState(false);

	useEffect(() => {
		function getImage() {
			if (!item?.image) return setImage(false);
			let newImage = locationImages.find((e) => e._id === item.image);
			if (!newImage?.image) return setImage(false);
			setImage(newImage.image);
		}
		getImage();
	}, [setImage, locationImages, item]);

	function changeGalleryItemCaption(e) {
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.gallery[index].caption = e.target.value;
		changeLocation(newLocation);
	}

	return { image, changeGalleryItemCaption };
};
