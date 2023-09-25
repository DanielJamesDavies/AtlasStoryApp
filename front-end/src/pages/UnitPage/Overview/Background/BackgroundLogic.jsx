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
	const { unit_type, unitOverviewForegrounds, unitOverviewBackground, unitVersion } = useContext(UnitPageContext);
	const overviewForegroundSizeRef = useRef();

	return { unit_type, unitOverviewForegrounds, unitOverviewBackground, unitVersion, overviewForegroundSizeRef };
};
