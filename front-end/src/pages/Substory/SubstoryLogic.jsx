// Packages
import { useContext, useState, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "./SubstoryContext";

// Services

// Styles

// Assets

export const SubstoryLogic = () => {
	const { substory, substoryOverviewBackground, isOnOverviewSection, setIsOnOverviewSection } = useContext(SubstoryContext);
	const [substoryPrimaryPaddingTop, setSubstoryPrimaryPaddingTop] = useState(false);
	const [substoryStyle, setSubstoryStyle] = useState(false);

	useEffect(() => {
		function getColourTint(hex, amount) {
			let [r, g, b] = hex.match(/.{2}/g);

			r = Math.max(Math.min(255, parseInt(r, 16) + amount), 0).toString(16);
			if (parseInt(r, 16) + amount > 255) amount *= 0.5;
			g = Math.max(Math.min(255, parseInt(g, 16) + amount), 0).toString(16);
			b = Math.max(Math.min(255, parseInt(b, 16) + amount), 0).toString(16);

			return `#${(r.length < 2 ? "0" : "") + r}${(g.length < 2 ? "0" : "") + g}${(b.length < 2 ? "0" : "") + b}`;
		}

		function getSubstoryStyle() {
			let newSubstoryStyle = {};

			newSubstoryStyle["--substoryColour"] = substory?.data?.colour ? substory.data.colour : "#0044ff";

			newSubstoryStyle["--substoryGlowColour"] = "rgba(0, 68, 255, 0.8)";
			if (substory?.data?.colour) {
				const newColour = "0x" + substory?.data?.colour?.substring(1).toUpperCase();
				newSubstoryStyle["--substoryGlowColour"] =
					"rgba(" + ((newColour >> 16) & 0xff) + ", " + ((newColour >> 8) & 0xff) + ", " + (newColour & 0xff) + ", 0.8)";
			}

			if (substoryPrimaryPaddingTop !== false)
				newSubstoryStyle["--substoryPrimaryPaddingTop"] = JSON.parse(JSON.stringify(substoryPrimaryPaddingTop));

			if (substory?.data?.colour) {
				try {
					let bigint = parseInt(substory?.data?.colour.substring(1), 16);
					let r = (bigint >> 16) & 255;
					let g = (bigint >> 8) & 255;
					let b = bigint & 255;
					const brightness = (r + g + b) / 3;
					const new_hex = getColourTint(substory?.data?.colour.substring(1), brightness > 128 ? -28 : 60);
					newSubstoryStyle["--substoryColourTint"] = new_hex;
				} catch {
					newSubstoryStyle["--substoryColourTint"] = substory?.data?.colour;
				}
			} else {
				newSubstoryStyle["--substoryColourTint"] = "#0044ff";
			}

			setSubstoryStyle(newSubstoryStyle);
		}
		setTimeout(() => getSubstoryStyle(), 20);
	}, [setSubstoryStyle, substory, substoryPrimaryPaddingTop]);

	const substoryContainerRef = useRef();
	const substoryOverviewContainerRef = useRef();
	const substorySubpagesContainerRef = useRef();

	const touchStartCoords = useRef({ x: 0, y: 0 });
	useEffect(() => {
		const onWheel = (e) => (!substory || !substoryStyle || e?.ctrlKey ? null : setIsOnOverviewSection(Math.sign(e?.deltaY) === -1));
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

		const substoryContainerRefCurrent = substoryContainerRef?.current;
		substoryContainerRefCurrent?.addEventListener("wheel", onWheel);
		substoryContainerRefCurrent?.addEventListener("touchstart", onTouchStart);
		substoryContainerRefCurrent?.addEventListener("touchmove", onTouchMove);
		return () => {
			substoryContainerRefCurrent?.removeEventListener("wheel", onWheel);
			substoryContainerRefCurrent?.removeEventListener("touchstart", onTouchStart);
			substoryContainerRefCurrent?.removeEventListener("touchmove", onTouchMove);
		};
	}, [substory, substoryStyle, substoryContainerRef, setIsOnOverviewSection]);

	useEffect(() => {
		const onOverviewWheel = (e) => {
			if (
				substoryOverviewRefCurrent?.clientHeight < substoryOverviewRefCurrent?.scrollHeight &&
				substoryOverviewRefCurrent?.scrollTop !== substoryOverviewRefCurrent?.scrollHeight - substoryOverviewRefCurrent?.clientHeight
			)
				e.stopPropagation();
		};
		const onSubpagesWheel = (e) => {
			if (substorySubpagesRefCurrent?.clientHeight < substorySubpagesRefCurrent?.scrollHeight && substorySubpagesRefCurrent?.scrollTop !== 0)
				e.stopPropagation();
		};

		const substoryOverviewRefCurrent = substoryOverviewContainerRef?.current;
		substoryOverviewRefCurrent?.addEventListener("wheel", onOverviewWheel);

		const substorySubpagesRefCurrent = substorySubpagesContainerRef?.current;
		substorySubpagesRefCurrent?.addEventListener("wheel", onSubpagesWheel);
		return () => {
			substoryOverviewRefCurrent?.removeEventListener("wheel", onOverviewWheel);
			substorySubpagesRefCurrent?.removeEventListener("wheel", onSubpagesWheel);
		};
	}, [substoryOverviewContainerRef, substorySubpagesContainerRef, isOnOverviewSection]);

	const substoryPrimaryTitleRef = useRef();

	return {
		substory,
		substoryOverviewBackground,
		substoryStyle,
		isOnOverviewSection,
		substoryContainerRef,
		substoryOverviewContainerRef,
		substorySubpagesContainerRef,
		substoryPrimaryTitleRef,
		setSubstoryPrimaryPaddingTop,
	};
};
