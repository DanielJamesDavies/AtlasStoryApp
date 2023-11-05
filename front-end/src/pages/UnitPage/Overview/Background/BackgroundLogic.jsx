// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";

// Services

// Styles

// Assets

export const BackgroundLogic = () => {
	const { unit_type, unit, unitOverviewForegrounds, unitOverviewBackground, unitVersion, locationMapImages } = useContext(UnitPageContext);
	const overviewForegroundSizeRef = useRef();

	return { unit_type, unit, unitOverviewForegrounds, unitOverviewBackground, unitVersion, overviewForegroundSizeRef, locationMapImages };
};
