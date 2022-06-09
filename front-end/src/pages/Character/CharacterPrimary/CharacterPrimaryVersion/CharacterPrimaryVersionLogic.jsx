// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../CharacterContext";

// Services

// Styles

// Assets

export const CharacterPrimaryVersionLogic = () => {
	const { characterVersion, decrementCharacterVersion, incrementCharacterVersion } = useContext(CharacterContext);

	return { characterVersion, decrementCharacterVersion, incrementCharacterVersion };
};
