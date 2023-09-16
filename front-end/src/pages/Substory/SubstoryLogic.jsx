// Packages
import { useContext, useState, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "./SubstoryContext";

// Services
import getColourWithTint from "../../services/GetColourWithTint";

// Styles

// Assets

export const SubstoryLogic = () => {
	const { substory, substoryOverviewBackground, isOnOverviewSection, setIsOnOverviewSection } = useContext(SubstoryContext);
	const [substoryPrimaryPaddingTop, setSubstoryPrimaryPaddingTop] = useState(false);
	const [substoryStyle, setSubstoryStyle] = useState(false);

	useEffect(() => {
		function getSubstoryStyle() {
			let newSubstoryStyle = {};

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
					const colours = getColourWithTint(substory?.data?.colour);
					newSubstoryStyle["--substoryColour"] = colours[0];
					newSubstoryStyle["--substoryColourTint"] = colours[1];
				} catch {
					newSubstoryStyle["--substoryColour"] = substory?.data?.colour;
					newSubstoryStyle["--substoryColourTint"] = substory?.data?.colour;
				}
			} else {
				newSubstoryStyle["--substoryColour"] = "#0044ff";
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
