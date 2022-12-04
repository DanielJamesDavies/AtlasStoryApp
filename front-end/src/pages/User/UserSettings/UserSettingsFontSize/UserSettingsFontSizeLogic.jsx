// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { AppContext } from "../../../../context/AppContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const UserSettingsFontSizeLogic = () => {
	const { fontSize, setFontSize } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);

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
		const response = await APIRequest("/user/", "PATCH", { path: ["data", "fontSize"], newValue: newFontSizeID });
		if (response?.errors) return setErrors(response.errors);
	}

	return { fontSize, changeFontSize, fontSizes, errors };
};
