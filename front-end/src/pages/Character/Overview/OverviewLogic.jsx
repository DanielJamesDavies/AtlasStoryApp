// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services

// Styles

// Assets

export const CharacterOverviewLogic = () => {
	const { characterOverviewBackground, characterVersion, characterOverviewForegrounds } = useContext(CharacterContext);
	const overviewForegroundSizeRef = useRef();

	return { characterOverviewBackground, characterVersion, characterOverviewForegrounds, overviewForegroundSizeRef };
};
