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
	const { substory, isOnOverviewSection, setIsOnOverviewSection } = useContext(SubstoryContext);
	const [substoryStyle, setSubstoryStyle] = useState(false);

	useEffect(() => {
		function getSubstoryStyle() {
			let newSubstoryStyle = {};
			newSubstoryStyle["--substoryColour"] = substory?.data?.colour ? substory.data.colour : "#0044ff";
			newSubstoryStyle["--substoryGlowColour"] = "rgba(0, 68, 255, 0.8)";
			if (substory?.data?.colour) {
				const newColour = "0x" + substory?.data?.colour?.substring(1).toUpperCase();
				newSubstoryStyle["--substoryGlowColour"] =
					"rgba(" + ((newColour >> 16) & 0xff) + ", " + ((newColour >> 8) & 0xff) + ", " + (newColour & 0xff) + ", 0.8)";
			}
			setSubstoryStyle(newSubstoryStyle);
		}
		getSubstoryStyle();
	}, [setSubstoryStyle, substory]);

	const substoryContainerRef = useRef();
	const substoryOverviewContainerRef = useRef();
	const substorySubpagesContainerRef = useRef();

	useEffect(() => {
		const onWheel = (e) => (!substory || e?.ctrlKey ? null : setIsOnOverviewSection(Math.sign(e?.deltaY) === -1));
		const substoryContainerRefCurrent = substoryContainerRef?.current;
		substoryContainerRefCurrent?.addEventListener("wheel", onWheel);
		return () => substoryContainerRefCurrent?.removeEventListener("wheel", onWheel);
	}, [substory, substoryContainerRef, setIsOnOverviewSection]);

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
		substoryStyle,
		isOnOverviewSection,
		substoryContainerRef,
		substoryOverviewContainerRef,
		substorySubpagesContainerRef,
		substoryPrimaryTitleRef,
	};
};
