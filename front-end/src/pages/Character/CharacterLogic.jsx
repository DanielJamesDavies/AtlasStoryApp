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
	const { character, isOnOverviewSection, setIsOnOverviewSection } = useContext(CharacterContext);
	const [characterStyle, setCharacterStyle] = useState({ "--characterColour": character?.data?.colour ? character.data.colour : "#0044ff" });

	useEffect(() => {
		function getGlowColour(colour) {
			if (!colour) return "rgba(0, 68, 255, 0.8)";
			const newColour = "0x" + colour.substring(1).toUpperCase();
			return "rgba(" + ((newColour >> 16) & 0xff) + ", " + ((newColour >> 8) & 0xff) + ", " + (newColour & 0xff) + ", 0.8)";
		}
		setCharacterStyle({
			"--characterColour": character?.data?.colour ? character.data.colour : "#0044ff",
			"--characterGlowColour": getGlowColour(character?.data?.colour),
		});
	}, [setCharacterStyle, character]);

	const characterContainerRef = useRef();
	const characterOverviewContainerRef = useRef();
	const characterSubpagesContainerRef = useRef();

	useEffect(() => {
		const onWheel = (e) => setIsOnOverviewSection(Math.sign(e?.deltaY) === -1);
		const characterContainerRefCurrent = characterContainerRef?.current;
		characterContainerRefCurrent?.addEventListener("wheel", onWheel);
		return () => characterContainerRefCurrent?.removeEventListener("wheel", onWheel);
	}, [characterContainerRef, setIsOnOverviewSection]);

	useEffect(() => {
		const onWheel = (e) => {
			if (characterOverviewRefCurrent?.clientHeight < characterOverviewRefCurrent?.scrollHeight) e.stopPropagation();
		};

		const characterOverviewRefCurrent = characterOverviewContainerRef?.current;
		characterOverviewRefCurrent?.addEventListener("wheel", onWheel);

		const characterSubpagesRefCurrent = characterSubpagesContainerRef?.current;
		characterSubpagesRefCurrent?.addEventListener("wheel", onWheel);
		return () => {
			characterOverviewRefCurrent?.removeEventListener("wheel", onWheel);
			characterSubpagesRefCurrent?.removeEventListener("wheel", onWheel);
		};
	}, [characterOverviewContainerRef, characterSubpagesContainerRef, isOnOverviewSection]);

	return { characterStyle, isOnOverviewSection, characterContainerRef, characterOverviewContainerRef, characterSubpagesContainerRef };
};
