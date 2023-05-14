// Packages
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../GroupContext";

// Services

// Styles

// Assets

export const GroupImageItemLogic = ({ image_id }) => {
	const { groupImages } = useContext(GroupContext);
	const [image, setImage] = useState(false);

	useEffect(() => {
		function getImage() {
			if (!image_id) return false;
			const newImage = groupImages.find((e) => e._id === image_id);
			if (!newImage) return false;
			return newImage;
		}
		setImage(getImage());
	}, [image_id, setImage, groupImages]);

	return { image };
};
