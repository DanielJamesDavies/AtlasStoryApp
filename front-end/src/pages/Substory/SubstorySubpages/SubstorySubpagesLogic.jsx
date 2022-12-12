// Packages
import { useState, useContext, useEffect, useLayoutEffect, useRef } from "react";

// Components
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Plot } from "./Subpages/Plot/Plot";
import { Soundtrack } from "./Subpages/Soundtrack/Soundtrack";
import { Miscellaneous } from "./Subpages/Miscellaneous/Miscellaneous";
import { Development } from "./Subpages/Development/Development";
import { Settings } from "./Subpages/Settings/Settings";

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";

// Services

// Styles

// Assets

export const SubstorySubpagesLogic = ({ substoryPrimaryTitleRef, setSubstoryPrimaryPaddingTop }) => {
	const { openSubpageID } = useContext(SubstoryContext);

	const subpageContainerRef = useRef();

	useEffect(() => {
		const subpageContainerRefCurrent = subpageContainerRef?.current;
		function onWheel(e) {
			if (subpageContainerRefCurrent?.scrollTop === 0) return;
			e.stopPropagation();
		}
		subpageContainerRefCurrent?.addEventListener("wheel", onWheel);
		return () => subpageContainerRefCurrent?.removeEventListener("wheel", onWheel);
	}, [subpageContainerRef]);

	const [subpagesContainerStyles, setSubpagesContainerStyles] = useState({});
	useLayoutEffect(() => {
		function getSubpagesContainerStyles(e) {
			let newSubpagesContainerStyles = {};
			const primaryTitleHeight = substoryPrimaryTitleRef?.current?.clientHeight;
			if (primaryTitleHeight === undefined) return setSubpagesContainerStyles(newSubpagesContainerStyles);

			newSubpagesContainerStyles.paddingTop = "calc((32px + 8px * 2) + " + primaryTitleHeight + "px + 24px)";
			newSubpagesContainerStyles["--substoryPrimaryPaddingTop"] = 32 + 8 * 2 + primaryTitleHeight + 24 + "px";
			setSubstoryPrimaryPaddingTop(newSubpagesContainerStyles["--substoryPrimaryPaddingTop"]);

			const windowWidth = window?.innerWidth;
			if (windowWidth !== undefined && windowWidth <= 700) {
				newSubpagesContainerStyles.paddingTop = "calc(6px + " + primaryTitleHeight + "px + 12px)";
				newSubpagesContainerStyles["--substoryPrimaryPaddingTop"] = 6 + primaryTitleHeight + 12 + "px";
				setSubstoryPrimaryPaddingTop(newSubpagesContainerStyles["--substoryPrimaryPaddingTop"]);
			}

			setSubpagesContainerStyles(newSubpagesContainerStyles);
		}
		setTimeout(() => getSubpagesContainerStyles(), 100);
		setTimeout(() => getSubpagesContainerStyles(), 200);
		setTimeout(() => getSubpagesContainerStyles(), 400);
		setTimeout(() => getSubpagesContainerStyles(), 600);
		setTimeout(() => getSubpagesContainerStyles(), 800);
		setTimeout(() => getSubpagesContainerStyles(), 1000);
		setTimeout(() => getSubpagesContainerStyles(), 1200);
		window.addEventListener("resize", getSubpagesContainerStyles);
		return () => {
			window.removeEventListener("resize", getSubpagesContainerStyles);
		};
	}, [setSubpagesContainerStyles, substoryPrimaryTitleRef, setSubstoryPrimaryPaddingTop]);

	const [subpage, setSubpage] = useState(null);

	useEffect(() => {
		function getSubpage() {
			switch (openSubpageID) {
				case "gallery":
					return <Gallery />;
				case "plot":
					return <Plot />;
				case "characters":
					return null;
				case "locations":
					return null;
				case "soundtrack":
					return <Soundtrack />;
				case "miscellaneous":
					return <Miscellaneous />;
				case "development":
					return <Development />;
				case "settings":
					return <Settings />;
				default:
					return null;
			}
		}
		setSubpage(getSubpage());
	}, [openSubpageID]);

	return { subpageContainerRef, subpagesContainerStyles, subpage };
};
