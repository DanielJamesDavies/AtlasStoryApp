// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../CharacterContext";

// Services

// Styles

// Assets

export const ChangeOverviewBackgroundLogic = () => {
	const { isAuthorizedToEdit, setIsOnOverviewSection, setOpenSubpageID } = useContext(CharacterContext);

	function onClickChangeOverviewBackground() {
		setIsOnOverviewSection(false);
		setOpenSubpageID("settings");
	}

	return { isAuthorizedToEdit, onClickChangeOverviewBackground };
};
