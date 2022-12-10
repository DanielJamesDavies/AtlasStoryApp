// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";

// Services

// Styles

// Assets

export const SettingsLogic = () => {
	const { isDisplayingSettings, setIsDisplayingSettings } = useContext(UserContext);

	function closeSettings() {
		setIsDisplayingSettings(false);
	}

	return { isDisplayingSettings, closeSettings };
};
