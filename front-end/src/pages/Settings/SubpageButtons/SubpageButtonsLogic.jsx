// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SettingsContext } from "../SettingsContext";

// Services

// Styles

// Assets

export const SubpageButtonsLogic = () => {
	const { openSubpageID, setOpenSubpageID } = useContext(SettingsContext);
	const subpages = [
		{ id: "account", name: "Account" },
		{ id: "security&privacy", name: "Security & Privacy" },
		{ id: "appearance", name: "Appearance" },
		{ id: "connections", name: "Connections" },
		{ id: "cookies", name: "Cookies" },
	];

	function changeSubpage(id) {
		setOpenSubpageID(id);
	}

	return { openSubpageID, subpages, changeSubpage };
};
