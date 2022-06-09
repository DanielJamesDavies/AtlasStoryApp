// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";
import { AppContext } from "../../../context/AppContext";

// Services

// Styles

// Assets

export const CharacterOverviewLogic = () => {
	const { character, characterOverviewBackground } = useContext(CharacterContext);
	const { accentColour } = useContext(AppContext);

	const [backgroundGlowStyle, setBackgroundGlowStyle] = useState({});

	useEffect(() => {
		function getBackgroundGlowStyle() {
			let colour = accentColour;
			if (character?.data?.colour) colour = character.data.colour;
			let rgb = parseInt(colour.slice(1, 3), 16) + "," + parseInt(colour.slice(3, 5), 16) + "," + parseInt(colour.slice(5, 7), 16);
			return { background: "radial-gradient(circle at 50% 50%, rgba(" + rgb + ", 0.9), transparent 38%)" };
		}
		setBackgroundGlowStyle(getBackgroundGlowStyle());
	}, [setBackgroundGlowStyle, character, accentColour]);

	return { characterOverviewBackground, backgroundGlowStyle };
};
