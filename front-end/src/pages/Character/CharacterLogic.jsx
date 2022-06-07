// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "./CharacterContext";

// Services

// Styles

// Assets

export const CharacterLogic = () => {
	const { character } = useContext(CharacterContext);
	const [characterStyle, setCharacterStyle] = useState({ "--characterColour": character?.data?.colour ? character.data.colour : "#0044ff" });

	useEffect(() => {
		setCharacterStyle({ "--characterColour": character?.data?.colour ? character.data.colour : "#0044ff" });
	}, [setCharacterStyle, character]);

	return { characterStyle };
};
