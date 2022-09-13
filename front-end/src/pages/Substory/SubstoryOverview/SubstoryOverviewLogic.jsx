// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";

// Services

// Styles

// Assets

export const SubstoryOverviewLogic = () => {
	const { substoryOverviewBackground } = useContext(SubstoryContext);

	return { substoryOverviewBackground };
};
