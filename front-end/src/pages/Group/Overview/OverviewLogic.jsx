// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../GroupContext";

// Services

// Styles

// Assets

export const GroupOverviewLogic = () => {
	const { groupOverviewBackground } = useContext(GroupContext);

	return { groupOverviewBackground };
};
