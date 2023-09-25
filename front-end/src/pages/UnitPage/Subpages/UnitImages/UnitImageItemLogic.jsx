// Packages
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";

// Services

// Styles

// Assets

export const UnitImageItemLogic = ({ image_id }) => {
	const { unitImages } = useContext(UnitPageContext);
	const [image, setImage] = useState(false);

	useEffect(() => {
		function getImage() {
			if (!image_id) return false;
			const newImage = unitImages.find((e) => e._id === image_id);
			if (!newImage) return false;
			return newImage;
		}
		setImage(getImage());
	}, [image_id, setImage, unitImages]);

	return { image };
};
