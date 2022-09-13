// Packages
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../SubstoryContext";

// Services

// Styles

// Assets

export const SubstoryImageItemLogic = ({ image_id }) => {
	const { substoryImages } = useContext(SubstoryContext);
	const [image, setImage] = useState(false);

	useEffect(() => {
		function getImage() {
			if (!image_id) return false;
			const newImage = substoryImages.find((e) => e._id === image_id);
			if (!newImage) return false;
			return newImage;
		}
		setImage(getImage());
	}, [image_id, setImage, substoryImages]);

	return { image };
};
