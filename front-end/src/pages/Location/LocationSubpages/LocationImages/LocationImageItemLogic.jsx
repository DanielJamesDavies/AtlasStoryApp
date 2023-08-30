// Packages
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../LocationContext";

// Services

// Styles

// Assets

export const LocationImageItemLogic = ({ image_id }) => {
	const { locationImages } = useContext(LocationContext);
	const [image, setImage] = useState(false);

	useEffect(() => {
		function getImage() {
			if (!image_id) return false;
			const newImage = locationImages.find((e) => e._id === image_id);
			if (!newImage) return false;
			return newImage;
		}
		setImage(getImage());
	}, [image_id, setImage, locationImages]);

	return { image };
};
