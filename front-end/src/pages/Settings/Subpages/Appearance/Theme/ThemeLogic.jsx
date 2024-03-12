// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { AppContext } from "../../../../../context/AppContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const ThemeLogic = () => {
	const { uiTheme, setUITheme } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);

	const themes = [
		{ id: "dark", label: "Dark", styles: { "--themeColour": "#01010a" }, ids: ["dark", "dim"] },
		{ id: "light", label: "Light", styles: { "--themeColour": "#ffffff" }, ids: ["light"] },
	];
	const [errors, setErrors] = useState([]);

	async function changeTheme(newThemeID) {
		setErrors([]);
		setUITheme(newThemeID);
		const response = await APIRequest("/user/", "PATCH", { path: ["data", "uiTheme"], newValue: newThemeID });
		if (response?.errors) return setErrors(response.errors);
	}

	return { uiTheme, changeTheme, themes, errors };
};
