// Packages
import { useEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services
import getImageFromFile from "../../services/GetImageFromFile";

// Styles

// Assets

export const ImageInputLogic = ({ className, isCircular, onChange, maxFileSizeInKBs }) => {
	const inputRef = useRef();

	const [imageInputClassName, setImageInputClassName] = useState(
		!isCircular
			? className
				? "image-input " + className
				: "image-input"
			: className
			? "image-input image-input-circular " + className
			: "image-input image-input-circular"
	);

	useEffect(() => {
		function getImageInputClassName() {
			let newClassName = "image-input";
			if (isCircular) newClassName += " image-input-circular";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setImageInputClassName(getImageInputClassName());
	}, [setImageInputClassName, className, isCircular]);

	async function onInputChange(e) {
		const image = await getImageFromFile(e.target.files[0], { maxFileSizeInKBs });
		inputRef.current.value = [];
		if (image?.error || !image?.data) return await onChange(false);
		await onChange(image.data);
	}

	return { inputRef, imageInputClassName, onInputChange };
};
