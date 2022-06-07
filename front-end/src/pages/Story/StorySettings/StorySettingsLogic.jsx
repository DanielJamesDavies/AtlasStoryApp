// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const StorySettingsLogic = () => {
	const { isDisplayingSettings, setIsDisplayingSettings } = useContext(StoryContext);

	function closeSettings() {
		setIsDisplayingSettings(false);
	}

	return { isDisplayingSettings, closeSettings };
};
