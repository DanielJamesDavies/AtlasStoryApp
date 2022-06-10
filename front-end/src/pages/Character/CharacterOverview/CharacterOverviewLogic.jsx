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
	const { characterOverviewBackground } = useContext(CharacterContext);

	return { characterOverviewBackground };
};
