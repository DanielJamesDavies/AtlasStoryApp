// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services

// Styles

// Assets

export const CharacterOverviewLogic = () => {
	const { characterOverviewBackground, characterVersion, characterOverviewForegrounds } = useContext(CharacterContext);

	return { characterOverviewBackground, characterVersion, characterOverviewForegrounds };
};
