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
	const { character, isOnOverviewSection, setIsOnOverviewSection, setCharacterPaddingTop } = useContext(CharacterContext);
	const [characterStyle, setCharacterStyle] = useState(false);
	const characterPrimaryRef = useRef();

	useEffect(() => {
		function getCharacterStyle() {
			if (!character) return false;

			let newCharacterStyle = {};

			newCharacterStyle["--characterColour"] = character?.data?.colour ? character.data.colour : "#0044ff";
			newCharacterStyle["--characterGlowColour"] = getGlowColour(character?.data?.colour);

			const primaryHeight = characterPrimaryRef?.current?.clientHeight;
			if (primaryHeight !== undefined) {
				let characterPaddingTop = primaryHeight + 10;
				if (window?.innerWidth !== undefined && window?.innerWidth <= 700) characterPaddingTop = 6 + primaryHeight + 12;
				newCharacterStyle["--characterPaddingTop"] = characterPaddingTop + "px";
				setCharacterPaddingTop(characterPaddingTop);
			}

			setCharacterStyle((oldCharacterStyle) => {
				if (!character?.data?.colour && oldCharacterStyle["--characterColour"] !== "#0044ff") {
					newCharacterStyle["--characterColour"] = oldCharacterStyle["--characterColour"];
					newCharacterStyle["--characterGlowColour"] = oldCharacterStyle["--characterGlowColour"];
				}
				return newCharacterStyle;
			});
		}

		function getGlowColour(colour) {
			if (!colour) return "rgba(0, 0, 0, 0)";
			const newColour = "0x" + colour.substring(1).toUpperCase();
			return "rgba(" + ((newColour >> 16) & 0xff) + ", " + ((newColour >> 8) & 0xff) + ", " + (newColour & 0xff) + ", 0.8)";
		}

		setTimeout(() => getCharacterStyle(), 100);
		setTimeout(() => getCharacterStyle(), 200);
		setTimeout(() => getCharacterStyle(), 400);
		setTimeout(() => getCharacterStyle(), 600);
		setTimeout(() => getCharacterStyle(), 800);
		setTimeout(() => getCharacterStyle(), 1000);
		setTimeout(() => getCharacterStyle(), 1200);
		window.addEventListener("resize", getCharacterStyle);
		return () => {
			window.removeEventListener("resize", getCharacterStyle);
		};
	}, [setCharacterStyle, character, setCharacterPaddingTop]);

	const characterContainerRef = useRef();
	const characterOverviewContainerRef = useRef();
	const characterSubpagesContainerRef = useRef();

	const touchStartCoords = useRef({ x: 0, y: 0 });
	useEffect(() => {
		const onWheel = (e) => (!character || !characterStyle || e?.ctrlKey ? null : setIsOnOverviewSection(Math.sign(e?.deltaY) === -1));
		const onTouchStart = (e) => {
			touchStartCoords.current = { x: e.touches[0].pageX, y: e.touches[0].pageY };
		};
		const onTouchMove = (e) => {
			const touchMoveCoords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
			if (Math.abs(touchStartCoords.current.y - touchMoveCoords.y) > 24) return (touchStartCoords.current = { x: 0, y: 0 });
			const deltaX = touchStartCoords.current.x - touchMoveCoords.x;
			if (Math.abs(deltaX) < window.innerWidth * 0.3) return;
			setIsOnOverviewSection(Math.sign(deltaX) === -1);
			touchStartCoords.current = { x: 0, y: 0 };
		};

		const characterContainerRefCurrent = characterContainerRef?.current;
		characterContainerRefCurrent?.addEventListener("wheel", onWheel);
		characterContainerRefCurrent?.addEventListener("touchstart", onTouchStart);
		characterContainerRefCurrent?.addEventListener("touchmove", onTouchMove);
		return () => {
			characterContainerRefCurrent?.removeEventListener("wheel", onWheel);
			characterContainerRefCurrent?.removeEventListener("touchstart", onTouchStart);
			characterContainerRefCurrent?.removeEventListener("touchmove", onTouchMove);
		};
	}, [character, characterStyle, characterContainerRef, setIsOnOverviewSection]);

	useEffect(() => {
		const onOverviewWheel = (e) => {
			if (
				characterOverviewRefCurrent?.clientHeight < characterOverviewRefCurrent?.scrollHeight &&
				characterOverviewRefCurrent?.scrollTop !== characterOverviewRefCurrent?.scrollHeight - characterOverviewRefCurrent?.clientHeight
			)
				e.stopPropagation();
		};
		const onSubpagesWheel = (e) => {
			if (
				characterSubpagesRefCurrent?.clientHeight < characterSubpagesRefCurrent?.scrollHeight &&
				characterSubpagesRefCurrent?.scrollTop !== 0
			)
				e.stopPropagation();
		};

		const characterOverviewRefCurrent = characterOverviewContainerRef?.current;
		characterOverviewRefCurrent?.addEventListener("wheel", onOverviewWheel);

		const characterSubpagesRefCurrent = characterSubpagesContainerRef?.current;
		characterSubpagesRefCurrent?.addEventListener("wheel", onSubpagesWheel);
		return () => {
			characterOverviewRefCurrent?.removeEventListener("wheel", onOverviewWheel);
			characterSubpagesRefCurrent?.removeEventListener("wheel", onSubpagesWheel);
		};
	}, [characterOverviewContainerRef, characterSubpagesContainerRef, isOnOverviewSection]);

	return {
		characterStyle,
		characterPrimaryRef,
		isOnOverviewSection,
		characterContainerRef,
		characterOverviewContainerRef,
		characterSubpagesContainerRef,
	};
};
