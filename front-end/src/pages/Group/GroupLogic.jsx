// Packages
import { useContext, useState, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { GroupContext } from "./GroupContext";

// Services

// Styles

// Assets

export const GroupLogic = () => {
	const { group, groupOverviewBackground, isOnOverviewSection, setIsOnOverviewSection, setGroupPaddingTop } = useContext(GroupContext);
	const [groupStyle, setGroupStyle] = useState(false);
	const groupPrimaryRef = useRef();

	useEffect(() => {
		function getColourTint(hex, amount) {
			let [r, g, b] = hex.match(/.{2}/g);

			r = Math.max(Math.min(255, parseInt(r, 16) + amount), 0).toString(16);
			if (parseInt(r, 16) + amount > 255) amount *= 0.5;
			g = Math.max(Math.min(255, parseInt(g, 16) + amount), 0).toString(16);
			b = Math.max(Math.min(255, parseInt(b, 16) + amount), 0).toString(16);

			return `#${(r.length < 2 ? "0" : "") + r}${(g.length < 2 ? "0" : "") + g}${(b.length < 2 ? "0" : "") + b}`;
		}

		function getGroupStyle() {
			if (!group) return false;

			let newGroupStyle = {};

			newGroupStyle["--groupColour"] = group?.data?.colour ? group.data.colour : "#0044ff";
			newGroupStyle["--groupGlowColour"] = getGlowColour(group?.data?.colour);

			const primaryHeight = groupPrimaryRef?.current?.clientHeight;
			if (primaryHeight !== undefined) {
				let groupPaddingTop = primaryHeight + 10;
				if (window?.innerWidth !== undefined && window?.innerWidth <= 700) groupPaddingTop = 6 + primaryHeight + 12;
				newGroupStyle["--groupPaddingTop"] = groupPaddingTop + "px";
				setGroupPaddingTop(groupPaddingTop);
			}

			if (group?.data?.colour) {
				try {
					let bigint = parseInt(group?.data?.colour.substring(1), 16);
					let r = (bigint >> 16) & 255;
					let g = (bigint >> 8) & 255;
					let b = bigint & 255;
					const brightness = (r + g + b) / 3;
					const new_hex = getColourTint(group?.data?.colour.substring(1), brightness > 128 ? -28 : 60);
					newGroupStyle["--groupColourTint"] = new_hex;
				} catch {
					newGroupStyle["--groupColourTint"] = group?.data?.colour;
				}
			} else {
				newGroupStyle["--groupColourTint"] = "#0044ff";
			}

			setGroupStyle((oldGroupStyle) => {
				if (!group?.data?.colour && oldGroupStyle["--groupColour"] !== "#0044ff") {
					newGroupStyle["--groupColour"] = oldGroupStyle["--groupColour"];
					newGroupStyle["--groupGlowColour"] = oldGroupStyle["--groupGlowColour"];
				}
				return newGroupStyle;
			});
		}

		function getGlowColour(colour) {
			if (!colour) return "rgba(0, 0, 0, 0)";
			const newColour = "0x" + colour.substring(1).toUpperCase();
			return "rgba(" + ((newColour >> 16) & 0xff) + ", " + ((newColour >> 8) & 0xff) + ", " + (newColour & 0xff) + ", 0.8)";
		}
		getGroupStyle();
		setTimeout(() => getGroupStyle(), 100);
		setTimeout(() => getGroupStyle(), 200);
		setTimeout(() => getGroupStyle(), 400);
		setTimeout(() => getGroupStyle(), 600);
		setTimeout(() => getGroupStyle(), 800);
		setTimeout(() => getGroupStyle(), 1000);
		setTimeout(() => getGroupStyle(), 1200);
		setTimeout(() => getGroupStyle(), 2000);
		setTimeout(() => getGroupStyle(), 3000);
		window.addEventListener("resize", getGroupStyle);
		return () => {
			window.removeEventListener("resize", getGroupStyle);
		};
	}, [setGroupStyle, group, setGroupPaddingTop]);

	const groupContainerRef = useRef();
	const groupOverviewContainerRef = useRef();
	const groupSubpagesContainerRef = useRef();

	const touchStartCoords = useRef({ x: 0, y: 0 });
	useEffect(() => {
		const onWheel = (e) => (!group || !groupStyle || e?.ctrlKey ? null : setIsOnOverviewSection(Math.sign(e?.deltaY) === -1));
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

		const groupContainerRefCurrent = groupContainerRef?.current;
		groupContainerRefCurrent?.addEventListener("wheel", onWheel);
		groupContainerRefCurrent?.addEventListener("touchstart", onTouchStart);
		groupContainerRefCurrent?.addEventListener("touchmove", onTouchMove);
		return () => {
			groupContainerRefCurrent?.removeEventListener("wheel", onWheel);
			groupContainerRefCurrent?.removeEventListener("touchstart", onTouchStart);
			groupContainerRefCurrent?.removeEventListener("touchmove", onTouchMove);
		};
	}, [group, groupStyle, groupContainerRef, setIsOnOverviewSection]);

	useEffect(() => {
		const onOverviewWheel = (e) => {
			if (
				groupOverviewRefCurrent?.clientHeight < groupOverviewRefCurrent?.scrollHeight &&
				groupOverviewRefCurrent?.scrollTop !== groupOverviewRefCurrent?.scrollHeight - groupOverviewRefCurrent?.clientHeight
			)
				e.stopPropagation();
		};
		const onSubpagesWheel = (e) => {
			if (groupSubpagesRefCurrent?.clientHeight < groupSubpagesRefCurrent?.scrollHeight && groupSubpagesRefCurrent?.scrollTop !== 0)
				e.stopPropagation();
		};

		const groupOverviewRefCurrent = groupOverviewContainerRef?.current;
		groupOverviewRefCurrent?.addEventListener("wheel", onOverviewWheel);

		const groupSubpagesRefCurrent = groupSubpagesContainerRef?.current;
		groupSubpagesRefCurrent?.addEventListener("wheel", onSubpagesWheel);
		return () => {
			groupOverviewRefCurrent?.removeEventListener("wheel", onOverviewWheel);
			groupSubpagesRefCurrent?.removeEventListener("wheel", onSubpagesWheel);
		};
	}, [groupOverviewContainerRef, groupSubpagesContainerRef, isOnOverviewSection]);

	return {
		group,
		groupOverviewBackground,
		groupStyle,
		groupPrimaryRef,
		isOnOverviewSection,
		groupContainerRef,
		groupOverviewContainerRef,
		groupSubpagesContainerRef,
	};
};
