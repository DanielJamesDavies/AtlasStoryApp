// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";

// Services

// Styles

// Assets

export const TopSectionLogic = () => {
	const { unit, unit_type, unitVersion, story, storyIcon, unitOverviewBackground, unitOverviewForegrounds } = useContext(UnitPageContext);
	const unitImageContainerRef = useRef();
	const unitImageRef = useRef();
	const overviewForegroundSizeRef = useRef();

	return {
		unit,
		unit_type,
		unitVersion,
		story,
		storyIcon,
		unitOverviewBackground,
		unitOverviewForegrounds,
		unitImageContainerRef,
		unitImageRef,
		overviewForegroundSizeRef,
	};
};
