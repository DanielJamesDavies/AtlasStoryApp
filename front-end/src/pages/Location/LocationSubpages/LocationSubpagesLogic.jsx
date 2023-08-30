// Packages
import { useState, useContext, useEffect, useLayoutEffect, useRef } from "react";

// Components
import { Details } from "./Subpages/Details/Details";
import { Events } from "./Subpages/Events/Events";
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Miscellaneous } from "./Subpages/Miscellaneous/Miscellaneous";
import { Development } from "./Subpages/Development/Development";
import { Settings } from "./Subpages/Settings/Settings";
import { Custom } from "./Subpages/Custom/Custom";

// Logic

// Context
import { LocationContext } from "../LocationContext";

// Services

// Styles

// Assets

export const LocationSubpagesLogic = ({ locationPrimaryTitleRef, setLocationPrimaryPaddingTop }) => {
	const { location, openSubpageID } = useContext(LocationContext);

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
			const primaryTitleHeight = locationPrimaryTitleRef?.current?.clientHeight;
			if (primaryTitleHeight === 0) {
				setTimeout(() => getSubpagesContainerStyles(), 2);
				return false;
			}
			if (primaryTitleHeight === undefined) return setSubpagesContainerStyles(newSubpagesContainerStyles);

			newSubpagesContainerStyles.paddingTop = 32 + 6 * 2 + primaryTitleHeight + 10 + "px";
			newSubpagesContainerStyles["--locationPrimaryPaddingTop"] = newSubpagesContainerStyles.paddingTop;
			setLocationPrimaryPaddingTop(newSubpagesContainerStyles["--locationPrimaryPaddingTop"]);

			const windowWidth = window?.innerWidth;
			if (windowWidth !== undefined && windowWidth <= 700) {
				newSubpagesContainerStyles.paddingTop = 6 + primaryTitleHeight + 12 + "px";
				newSubpagesContainerStyles["--locationPrimaryPaddingTop"] = newSubpagesContainerStyles.paddingTop;
				setLocationPrimaryPaddingTop(newSubpagesContainerStyles["--locationPrimaryPaddingTop"]);
			}

			setSubpagesContainerStyles(newSubpagesContainerStyles);
		}
		setTimeout(() => getSubpagesContainerStyles(), 2);
		window.addEventListener("resize", getSubpagesContainerStyles);
		return () => {
			window.removeEventListener("resize", getSubpagesContainerStyles);
		};
	}, [setSubpagesContainerStyles, locationPrimaryTitleRef, setLocationPrimaryPaddingTop, location]);

	const [subpage, setSubpage] = useState(null);

	useEffect(() => {
		function getSubpage() {
			switch (openSubpageID) {
				case "details":
					return <Details />;
				case "events":
					return <Events />;
				case "gallery":
					return <Gallery />;
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
