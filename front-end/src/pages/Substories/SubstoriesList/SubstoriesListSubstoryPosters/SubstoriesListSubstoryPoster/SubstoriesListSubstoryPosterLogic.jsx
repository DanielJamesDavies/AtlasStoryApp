// Packages
import { useContext, useRef, useState, useEffect, useLayoutEffect } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../../../SubstoriesContext";
import { RoutesContext } from "../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SubstoriesListSubstoryPosterLogic = ({ substoryID }) => {
	const { story, storySubstories, substoriesPosterBackgrounds, shine_svg } = useContext(SubstoriesContext);
	const { changeLocation } = useContext(RoutesContext);

	const [substory, setSubstory] = useState(false);

	useEffect(() => {
		if (substoryID) {
			const newSubstory = storySubstories?.find((e) => e._id === substoryID);
			setSubstory(newSubstory);
		}
	}, [substoryID, storySubstories, substoriesPosterBackgrounds, setSubstory]);

	function navigateToSubstory(e) {
		if (e.button === 2) return;
		e.preventDefault();
		if (story?.uid && substory?.uid) changeLocation("/s/" + story.uid + "/p/" + substory.uid, e.button === 1);
	}

	function onSubstoryMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	// Substory Colour Styles
	const [posterContainerStyles, setPosterContainerStyles] = useState({});

	useEffect(() => {
		setPosterContainerStyles({ "--substoryColour": substory?.data?.colour ? substory.data.colour : "#0044ff" });
	}, [substory, setPosterContainerStyles]);

	// Substory Title Styles
	const posterTitleContainerRef = useRef();
	const [posterTitleContainerStyles, setPosterTitleContainerStyles] = useState({});

	useLayoutEffect(() => {
		async function getPosterTitleContainerStyles(attempts = 1) {
			setPosterTitleContainerStyles({});

			await new Promise((resolve) => setTimeout(resolve, 5));

			if (!posterTitleContainerRef?.current) return;

			let newPosterTitleContainerStyles = {};

			const max_height = window?.innerWidth >= 950 ? 175 : 80;

			const posterTitleContainerHeight = posterTitleContainerRef?.current?.clientHeight;
			let currTitleContainerBottom = getComputedStyle(posterTitleContainerRef?.current).getPropertyValue("--titleContainerBottom");
			currTitleContainerBottom = parseInt(currTitleContainerBottom.substring(0, currTitleContainerBottom.length - 2));

			if (posterTitleContainerHeight > max_height || currTitleContainerBottom === 8) {
				newPosterTitleContainerStyles["--titleContainerBottom"] = "8px";
			}

			let currTitleFontSize = getComputedStyle(posterTitleContainerRef?.current).getPropertyValue("--titleFontSize");
			newPosterTitleContainerStyles["--titleFontSize"] = currTitleFontSize ? currTitleFontSize : undefined;

			let currTitleSubstoryFontSize = getComputedStyle(posterTitleContainerRef?.current).getPropertyValue("--titleSubstoryFontSize");
			newPosterTitleContainerStyles["--titleSubstoryFontSize"] = currTitleSubstoryFontSize ? currTitleSubstoryFontSize : undefined;

			let currTitleStoryFontSize = getComputedStyle(posterTitleContainerRef?.current).getPropertyValue("--titleStoryFontSize");
			newPosterTitleContainerStyles["--titleStoryFontSize"] = currTitleStoryFontSize ? currTitleStoryFontSize : undefined;

			setPosterTitleContainerStyles(newPosterTitleContainerStyles);

			getPosterTitleFontSize(newPosterTitleContainerStyles, max_height);

			if (attempts <= 3) getPosterTitleContainerStyles(attempts + 1);
		}

		async function getPosterTitleFontSize(inputNewPosterTitleContainerStyles, max_height) {
			let newPosterTitleContainerStyles = JSON.parse(JSON.stringify(inputNewPosterTitleContainerStyles));

			await new Promise((resolve) => setTimeout(resolve, 1));

			const posterTitleContainerHeight = posterTitleContainerRef?.current?.clientHeight;

			if (posterTitleContainerHeight <= max_height) return;

			newPosterTitleContainerStyles["--titleFontSize"] = getNewPosterTitleContainerIntPropertyValue("--titleFontSize") + "px";
			newPosterTitleContainerStyles["--titleSubstoryFontSize"] = getNewPosterTitleContainerIntPropertyValue("--titleSubstoryFontSize") + "px";
			newPosterTitleContainerStyles["--titleStoryFontSize"] = getNewPosterTitleContainerIntPropertyValue("--titleStoryFontSize") + "px";

			setPosterTitleContainerStyles(newPosterTitleContainerStyles);

			getPosterTitleFontSize(newPosterTitleContainerStyles, max_height);
		}

		function getNewPosterTitleContainerIntPropertyValue(variable_name) {
			let currValue = getComputedStyle(posterTitleContainerRef?.current).getPropertyValue(variable_name);
			return parseInt(currValue.substring(0, currValue.length - 2)) - 0.1;
		}

		getPosterTitleContainerStyles();
		window.addEventListener("resize", getPosterTitleContainerStyles);
		return () => window.removeEventListener("resize", getPosterTitleContainerStyles);
	}, [setPosterTitleContainerStyles, posterTitleContainerRef, substory]);

	return {
		story,
		substory,
		navigateToSubstory,
		onSubstoryMouseDown,
		posterContainerStyles,
		posterTitleContainerRef,
		posterTitleContainerStyles,
		shine_svg,
	};
};
