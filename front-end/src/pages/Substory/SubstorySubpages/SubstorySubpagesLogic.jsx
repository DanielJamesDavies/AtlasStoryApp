// Packages
import { useState, useContext, useEffect, useLayoutEffect, useRef } from "react";

// Components
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Plot } from "./Subpages/Plot/Plot";
import { Soundtrack } from "./Subpages/Soundtrack/Soundtrack";
import { Miscellaneous } from "./Subpages/Miscellaneous/Miscellaneous";
import { Development } from "./Subpages/Development/Development";
import { Settings } from "./Subpages/Settings/Settings";
import { Custom } from "./Subpages/Custom/Custom";

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";

// Services

// Styles

// Assets

export const SubstorySubpagesLogic = ({ substoryPrimaryTitleRef, setSubstoryPrimaryPaddingTop }) => {
	const { substory, openSubpageID } = useContext(SubstoryContext);

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
		function getSubpagesContainerStyles() {
			let newSubpagesContainerStyles = {};
			const primaryTitleHeight = substoryPrimaryTitleRef?.current?.clientHeight;
			if (primaryTitleHeight === undefined) return setSubpagesContainerStyles(newSubpagesContainerStyles);

			newSubpagesContainerStyles.paddingTop = 32 + 6 * 2 + primaryTitleHeight + 10 + "px";
			newSubpagesContainerStyles["--substoryPrimaryPaddingTop"] = newSubpagesContainerStyles.paddingTop;
			setSubstoryPrimaryPaddingTop(newSubpagesContainerStyles["--substoryPrimaryPaddingTop"]);

			const windowWidth = window?.innerWidth;
			if (windowWidth !== undefined && windowWidth <= 700) {
				newSubpagesContainerStyles.paddingTop = 6 + primaryTitleHeight + 12 + "px";
				newSubpagesContainerStyles["--substoryPrimaryPaddingTop"] = newSubpagesContainerStyles.paddingTop;
				setSubstoryPrimaryPaddingTop(newSubpagesContainerStyles["--substoryPrimaryPaddingTop"]);
			}

			setSubpagesContainerStyles(newSubpagesContainerStyles);
		}
		setTimeout(() => getSubpagesContainerStyles(), 100);
		setTimeout(() => getSubpagesContainerStyles(), 200);
		setTimeout(() => getSubpagesContainerStyles(), 400);
		setTimeout(() => getSubpagesContainerStyles(), 800);
		setTimeout(() => getSubpagesContainerStyles(), 1200);
		setTimeout(() => getSubpagesContainerStyles(), 1600);
		setTimeout(() => getSubpagesContainerStyles(), 2400);
		setTimeout(() => getSubpagesContainerStyles(), 3600);
		window.addEventListener("resize", getSubpagesContainerStyles);
		return () => {
			window.removeEventListener("resize", getSubpagesContainerStyles);
		};
	}, [setSubpagesContainerStyles, substoryPrimaryTitleRef, setSubstoryPrimaryPaddingTop, substory]);

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
					return <Custom />;
			}
		}
		setSubpage(getSubpage());
	}, [openSubpageID]);

	return { subpageContainerRef, subpagesContainerStyles, subpage };
};
