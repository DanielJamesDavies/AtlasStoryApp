// Packages
import { useState, useContext, useEffect, useLayoutEffect } from "react";

// Components
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Plot } from "./Subpages/Plot/Plot";

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";

// Services

// Styles

// Assets

export const SubstorySubpagesLogic = ({ substoryPrimaryTitleRef }) => {
	const { openSubpageID } = useContext(SubstoryContext);

	const [subpagesContainerStyles, setSubpagesContainerStyles] = useState({});
	useLayoutEffect(() => {
		function getSubpagesContainerStyles(e) {
			let newSubpagesContainerStyles = {};
			const primaryTitleHeight = substoryPrimaryTitleRef?.current?.clientHeight;
			if (primaryTitleHeight === undefined) return setSubpagesContainerStyles(newSubpagesContainerStyles);
			newSubpagesContainerStyles.paddingTop = "calc((32px + 8px * 2) + " + primaryTitleHeight + "px + 24px)";
			const windowWidth = window?.innerWidth;
			if (windowWidth !== undefined && windowWidth <= 700)
				newSubpagesContainerStyles.paddingTop = "calc(6px + " + primaryTitleHeight + "px + 12px)";
			setSubpagesContainerStyles(newSubpagesContainerStyles);
		}
		setTimeout(() => getSubpagesContainerStyles(), 100);
		setTimeout(() => getSubpagesContainerStyles(), 200);
		setTimeout(() => getSubpagesContainerStyles(), 400);
		window.addEventListener("resize", getSubpagesContainerStyles);
		return () => {
			window.removeEventListener("resize", getSubpagesContainerStyles);
		};
	}, [setSubpagesContainerStyles, substoryPrimaryTitleRef]);

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
				case "miscellaneous":
					return null;
				case "development":
					return null;
				case "settings":
					return null;
				default:
					return null;
			}
		}
		setSubpage(getSubpage());
	}, [openSubpageID]);

	return { subpagesContainerStyles, subpage };
};
