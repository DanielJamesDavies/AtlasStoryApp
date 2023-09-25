// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../UnitPageContext";

// Services

// Styles

// Assets

export const OverviewLogic = () => {
	const { unitOverviewBackground } = useContext(UnitPageContext);

	return { unitOverviewBackground };
};
