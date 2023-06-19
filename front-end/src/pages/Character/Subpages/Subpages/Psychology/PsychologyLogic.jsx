// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";

// Services

// Styles

// Assets

export const PsychologyLogic = () => {
	const { characterVersion } = useContext(CharacterContext);

	return { characterVersion };
};
