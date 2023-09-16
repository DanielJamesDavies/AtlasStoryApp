// Packages
import { useContext, useState, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { LocationContext } from "./LocationContext";

// Services

// Styles

// Assets

export const LocationLogic = () => {
	const { location, locationOverviewBackground, isOnOverviewSection, setIsOnOverviewSection } = useContext(LocationContext);
	const [locationPrimaryPaddingTop, setLocationPrimaryPaddingTop] = useState(false);
	const [locationStyle, setLocationStyle] = useState(false);

	useEffect(() => {
		function getColourTint(hex, amount) {
			let [r, g, b] = hex.match(/.{2}/g);

			r = Math.max(Math.min(255, parseInt(r, 16) + amount), 0).toString(16);
			if (parseInt(r, 16) + amount > 255) amount *= 0.5;
			g = Math.max(Math.min(255, parseInt(g, 16) + amount), 0).toString(16);
			b = Math.max(Math.min(255, parseInt(b, 16) + amount), 0).toString(16);

			return `#${(r.length < 2 ? "0" : "") + r}${(g.length < 2 ? "0" : "") + g}${(b.length < 2 ? "0" : "") + b}`;
		}

		function getLocationStyle() {
			let newLocationStyle = {};

			newLocationStyle["--locationColour"] = location?.data?.colour ? location.data.colour : "#0044ff";

			newLocationStyle["--locationGlowColour"] = "rgba(0, 68, 255, 0.8)";
			if (location?.data?.colour) {
				const newColour = "0x" + location?.data?.colour?.substring(1).toUpperCase();
				newLocationStyle["--locationGlowColour"] =
					"rgba(" + ((newColour >> 16) & 0xff) + ", " + ((newColour >> 8) & 0xff) + ", " + (newColour & 0xff) + ", 0.8)";
			}

			if (locationPrimaryPaddingTop !== false)
				newLocationStyle["--locationPrimaryPaddingTop"] = JSON.parse(JSON.stringify(locationPrimaryPaddingTop));

			if (location?.data?.colour) {
				try {
					let bigint = parseInt(location?.data?.colour.substring(1), 16);
					let r = (bigint >> 16) & 255;
					let g = (bigint >> 8) & 255;
					let b = bigint & 255;
					const brightness = (r + g + b) / 3;
					const new_hex = getColourTint(location?.data?.colour.substring(1), brightness > 128 ? -28 : 60);
					newLocationStyle["--locationColourTint"] = new_hex;
				} catch {
					newLocationStyle["--locationColourTint"] = location?.data?.colour;
				}
			} else {
				newLocationStyle["--locationColourTint"] = "#0044ff";
			}

			setLocationStyle(newLocationStyle);
		}
		setTimeout(() => getLocationStyle(), 20);
	}, [setLocationStyle, location, locationPrimaryPaddingTop]);

	const locationContainerRef = useRef();
	const locationOverviewContainerRef = useRef();
	const locationSubpagesContainerRef = useRef();

	const touchStartCoords = useRef({ x: 0, y: 0 });
	useEffect(() => {
		const onWheel = (e) => (!location || !locationStyle || e?.ctrlKey ? null : setIsOnOverviewSection(Math.sign(e?.deltaY) === -1));
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

		const locationContainerRefCurrent = locationContainerRef?.current;
		locationContainerRefCurrent?.addEventListener("wheel", onWheel);
		locationContainerRefCurrent?.addEventListener("touchstart", onTouchStart);
		locationContainerRefCurrent?.addEventListener("touchmove", onTouchMove);
		return () => {
			locationContainerRefCurrent?.removeEventListener("wheel", onWheel);
			locationContainerRefCurrent?.removeEventListener("touchstart", onTouchStart);
			locationContainerRefCurrent?.removeEventListener("touchmove", onTouchMove);
		};
	}, [location, locationStyle, locationContainerRef, setIsOnOverviewSection]);

	useEffect(() => {
		const onOverviewWheel = (e) => {
			if (
				locationOverviewRefCurrent?.clientHeight < locationOverviewRefCurrent?.scrollHeight &&
				locationOverviewRefCurrent?.scrollTop !== locationOverviewRefCurrent?.scrollHeight - locationOverviewRefCurrent?.clientHeight
			)
				e.stopPropagation();
		};
		const onSubpagesWheel = (e) => {
			if (locationSubpagesRefCurrent?.clientHeight < locationSubpagesRefCurrent?.scrollHeight && locationSubpagesRefCurrent?.scrollTop !== 0)
				e.stopPropagation();
		};

		const locationOverviewRefCurrent = locationOverviewContainerRef?.current;
		locationOverviewRefCurrent?.addEventListener("wheel", onOverviewWheel);

		const locationSubpagesRefCurrent = locationSubpagesContainerRef?.current;
		locationSubpagesRefCurrent?.addEventListener("wheel", onSubpagesWheel);
		return () => {
			locationOverviewRefCurrent?.removeEventListener("wheel", onOverviewWheel);
			locationSubpagesRefCurrent?.removeEventListener("wheel", onSubpagesWheel);
		};
	}, [locationOverviewContainerRef, locationSubpagesContainerRef, isOnOverviewSection]);

	const locationPrimaryTitleRef = useRef();

	return {
		location,
		locationOverviewBackground,
		locationStyle,
		isOnOverviewSection,
		locationContainerRef,
		locationOverviewContainerRef,
		locationSubpagesContainerRef,
		locationPrimaryTitleRef,
		setLocationPrimaryPaddingTop,
	};
};
