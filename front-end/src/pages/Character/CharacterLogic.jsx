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
	const { character, characterOverviewBackground, isOnOverviewSection, setIsOnOverviewSection, setCharacterPaddingTop } =
		useContext(CharacterContext);
	const [characterStyle, setCharacterStyle] = useState(false);
	const characterPrimaryRef = useRef();

	useEffect(() => {
		function getColourTint(hex, amount) {
			let [r, g, b] = hex.match(/.{2}/g);

			r = Math.max(Math.min(255, parseInt(r, 16) + amount), 0).toString(16);
			if (parseInt(r, 16) + amount > 255) amount *= 0.5;
			g = Math.max(Math.min(255, parseInt(g, 16) + amount), 0).toString(16);
			b = Math.max(Math.min(255, parseInt(b, 16) + amount), 0).toString(16);

			return `#${(r.length < 2 ? "0" : "") + r}${(g.length < 2 ? "0" : "") + g}${(b.length < 2 ? "0" : "") + b}`;
		}

		function getCharacterStyle() {
			if (!character) return false;

			let newCharacterStyle = {};

			newCharacterStyle["--characterColour"] = character?.data?.colour ? character.data.colour : "#0044ff";

			const primaryHeight = characterPrimaryRef?.current?.clientHeight;
			if (!primaryHeight) {
				setTimeout(() => getCharacterStyle(), 2);
			} else {
				let characterPaddingTop = primaryHeight + 10;
				if (window?.innerWidth !== undefined && window?.innerWidth <= 700) characterPaddingTop = 6 + primaryHeight + 12;
				newCharacterStyle["--characterPaddingTop"] = characterPaddingTop + "px";
				setCharacterPaddingTop(characterPaddingTop);
			}

			if (character?.data?.colour) {
				try {
					let bigint = parseInt(character?.data?.colour.substring(1), 16);
					let r = (bigint >> 16) & 255;
					let g = (bigint >> 8) & 255;
					let b = bigint & 255;
					const brightness = (r + g + b) / 3;
					const new_hex = getColourTint(character?.data?.colour.substring(1), brightness > 128 ? -28 : 60);
					newCharacterStyle["--characterColourTint"] = new_hex;
				} catch {
					newCharacterStyle["--characterColourTint"] = character?.data?.colour;
				}
			} else {
				newCharacterStyle["--characterColourTint"] = "#0044ff";
			}

			setCharacterStyle((oldCharacterStyle) => {
				if (!character?.data?.colour && oldCharacterStyle["--characterColour"] !== "#0044ff") {
					newCharacterStyle["--characterColour"] = oldCharacterStyle["--characterColour"];
				}
				return newCharacterStyle;
			});
		}
		setTimeout(() => getCharacterStyle(), 2);
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
			if (Math.abs(deltaX) < window.innerWidth * 0.15) return;
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
		character,
		characterOverviewBackground,
		characterStyle,
		characterPrimaryRef,
		isOnOverviewSection,
		characterContainerRef,
		characterOverviewContainerRef,
		characterSubpagesContainerRef,
	};
};
