// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";

// Services

// Styles

// Assets

export const PsychologyLogic = () => {
	const { unitVersion } = useContext(UnitPageContext);

	return { unitVersion };
};
