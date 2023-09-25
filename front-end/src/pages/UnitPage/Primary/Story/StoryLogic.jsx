// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";

// Services

// Styles

// Assets

export const UnitPagePrimaryStoryLogic = () => {
	const { story, storyIcon } = useContext(UnitPageContext);

	return { story, storyIcon };
};
