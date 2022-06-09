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

	// Wheel Scroll
	const characterContainerRef = useRef();

	useEffect(() => {
		function onWheel(e) {
			setIsOnOverviewSection(Math.sign(e?.deltaY) === -1);
		}
		const characterContainerRefCurrent = characterContainerRef?.current;
		characterContainerRefCurrent?.addEventListener("wheel", onWheel);
		return () => characterContainerRefCurrent.removeEventListener("wheel", onWheel);
	}, [characterContainerRef, setIsOnOverviewSection]);

	useEffect(() => {
		function onWheel(e) {
			if (e?.target?.parentNode?.clientHeight < e?.target?.scrollHeight) e.stopPropagation();
		}
		const characterOverviewRefCurrent = characterOverviewContainerRef?.current?.children[0];
		const characterSubpagesRefCurrent = characterSubpagesContainerRef?.current?.children[0];
		characterOverviewRefCurrent?.addEventListener("wheel", onWheel);
		characterSubpagesRefCurrent?.addEventListener("wheel", onWheel);
		return () => {
			characterOverviewRefCurrent?.removeEventListener("wheel", onWheel);
			characterSubpagesRefCurrent?.removeEventListener("wheel", onWheel);
		};
	}, [characterOverviewContainerRef, characterSubpagesContainerRef, isOnOverviewSection]);

	return { characterStyle, isOnOverviewSection, characterContainerRef, characterOverviewContainerRef, characterSubpagesContainerRef };
};
