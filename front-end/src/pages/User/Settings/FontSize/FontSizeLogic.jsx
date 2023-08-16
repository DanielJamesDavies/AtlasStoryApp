// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { AppContext } from "../../../../context/AppContext";

// Services

// Styles

// Assets

export const FontSizeLogic = () => {
	const { fontSize, setFontSize } = useContext(AppContext);

	const fontSizes = [
		{ id: "xs", label: "Extra Small" },
		{ id: "s", label: "Small" },
		{ id: "m", label: "Medium" },
		{ id: "l", label: "Large" },
	];
	const [errors, setErrors] = useState([]);

	async function changeFontSize(index) {
		setErrors([]);
		const newFontSizeID = fontSizes[index]?.id;
		setFontSize(newFontSizeID);
		localStorage.setItem("atlas_font_size", newFontSizeID);
	}

	return { fontSize, changeFontSize, fontSizes, errors };
};
