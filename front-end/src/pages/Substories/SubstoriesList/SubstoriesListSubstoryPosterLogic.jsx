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
	const { story, substories, substoriesPosterBackgrounds } = useContext(SubstoriesContext);
	const { changeLocation } = useContext(RoutesContext);

	const [substory, setSubstory] = useState(false);
	const [posterBackground, setPosterBackground] = useState(false);

	useEffect(() => {
		const newSubstory = substories?.find((e) => e._id === substoryID);
		setSubstory(newSubstory);

		const newPosterBackground = substoriesPosterBackgrounds?.find((e) => e._id === newSubstory?.data?.posterBackground)?.image;
		setPosterBackground(newPosterBackground === undefined ? false : newPosterBackground);
	}, [substoryID, substories, substoriesPosterBackgrounds, setSubstory, setPosterBackground]);

	function navigateToSubstory(e) {
		e.preventDefault();
		if (story?.uid && substory?.uid) changeLocation("/s/" + story.uid + "/s/" + substory.uid, e.button === 1);
	}

	function onSubstoryMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	// Substory Colour Styles
	const [posterStyles, setPosterStyles] = useState({});

	useEffect(() => {
		setPosterStyles(substory?.data?.colour ? { borderColor: substory.data.colour } : {});
	}, [substory, setPosterStyles]);

	return { story, substory, posterBackground, navigateToSubstory, onSubstoryMouseDown, posterStyles };
};
