// Packages
import { useContext, useState, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "./CharacterContext";

// Services

// Styles

// Assets

export const CharacterLogic = () => {
	const { character, isOnOverviewSection } = useContext(CharacterContext);
	const [characterStyle, setCharacterStyle] = useState({ "--characterColour": character?.data?.colour ? character.data.colour : "#0044ff" });

	useEffect(() => {
		setCharacterStyle({ "--characterColour": character?.data?.colour ? character.data.colour : "#0044ff" });
	}, [setCharacterStyle, character]);

	const characterOverviewContainerRef = useRef();
	const characterSubpagesContainerRef = useRef();

	useEffect(() => {
		function updateScroll() {
			if (isOnOverviewSection) {
				characterOverviewContainerRef?.current.scrollIntoView({ behavior: "smooth", block: "start" });
			} else {
				characterSubpagesContainerRef?.current.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}
		updateScroll();
		window.addEventListener("resize", updateScroll);
		return () => window.removeEventListener("resize", updateScroll);
	}, [characterOverviewContainerRef, characterSubpagesContainerRef, isOnOverviewSection]);

	return { characterStyle, isOnOverviewSection, characterOverviewContainerRef, characterSubpagesContainerRef };
};
