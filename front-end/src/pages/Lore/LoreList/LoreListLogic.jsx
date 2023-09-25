// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LoreContext } from "../LoreContext";

// Services

// Styles

// Assets

export const LoreListLogic = () => {
	const { story, lore } = useContext(LoreContext);
	return { story, lore };
};
