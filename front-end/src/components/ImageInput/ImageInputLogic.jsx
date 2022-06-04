// Packages
import { useRef } from "react";

// Components

// Logic

// Context

// Services
import getImageFromFile from "../../services/GetImageFromFile";

// Styles

// Assets

export const ImageInputLogic = ({ onChange }) => {
	const inputRef = useRef();

	async function onInputChange(e) {
		const image = await getImageFromFile(e.target.files[0]);
		inputRef.current.value = [];
		if (image?.error || !image?.data) return await onChange(false);
		await onChange(image.data);
	}

	return { inputRef, onInputChange };
};
