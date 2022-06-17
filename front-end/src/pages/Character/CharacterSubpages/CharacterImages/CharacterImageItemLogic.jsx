// Packages
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../CharacterContext";

// Services

// Styles

// Assets

export const CharacterImageItemLogic = ({ image_id, index }) => {
	const { characterImages } = useContext(CharacterContext);
	const [image, setImage] = useState(false);

	useEffect(() => {
		function getImage() {
			if (!image_id) return false;
			const newImage = characterImages.find((e) => e._id === image_id)?.image;
			if (!newImage) return false;
			return newImage;
		}
		setImage(getImage());
	}, [image_id, setImage, characterImages]);

	return { image };
};
