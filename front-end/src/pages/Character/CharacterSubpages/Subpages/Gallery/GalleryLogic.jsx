// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";

// Services

// Styles

// Assets

export const GalleryLogic = () => {
	const { characterVersion } = useContext(CharacterContext);

	return { characterVersion };
};
