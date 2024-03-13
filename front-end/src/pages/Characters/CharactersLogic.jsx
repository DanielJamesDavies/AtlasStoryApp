// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "./CharactersContext";

// Services
import getColourWithTint from "../../services/GetColourWithTint";

// Styles

// Assets

export const CharactersLogic = () => {
	const { story, group } = useContext(CharactersContext);
	const [activeGroupColour, setActiveGroupColour] = useState(false);
	const [activeGroupColourTint, setActiveGroupColourTint] = useState(false);

	useEffect(() => {
		console.log(group);
		if (group?.data?.colour) {
			try {
				const colours = getColourWithTint(group?.data?.colour);
				setActiveGroupColour(colours[0]);
				setActiveGroupColourTint(colours[1]);
			} catch {
				setActiveGroupColour(group?.data?.colour);
				setActiveGroupColourTint(group?.data?.colour);
			}
		}
	}, [story, group]);

	return { story, activeGroupColour, activeGroupColourTint };
};
