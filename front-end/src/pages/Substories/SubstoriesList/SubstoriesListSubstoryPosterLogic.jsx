// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../SubstoriesContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SubstoriesListSubstoryPosterLogic = ({ substoryID }) => {
	const { story, storySubstories, substoriesPosterBackgrounds } = useContext(SubstoriesContext);
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
		if (story?.uid && substory?.uid) changeLocation("/s/" + story.uid + "/s/" + substory.uid, e.button === 1);
	}

	function onSubstoryMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	// Substory Colour Styles
	const [posterContainerStyles, setPosterContainerStyles] = useState({});

	useEffect(() => {
		setPosterContainerStyles({ "--substoryColour": substory?.data?.colour ? substory.data.colour : "#0044ff" });
	}, [substory, setPosterContainerStyles]);

	return { story, substory, navigateToSubstory, onSubstoryMouseDown, posterContainerStyles };
};
