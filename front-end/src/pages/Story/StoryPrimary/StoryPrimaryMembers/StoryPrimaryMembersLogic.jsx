// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../StoryContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const StoryPrimaryMembersLogic = () => {
	const { members } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);

	function navigateToMember(e, memberUsername) {
		if (!memberUsername) return;
		changeLocation("/u/" + memberUsername, e.button === 1);
	}

	return { members, navigateToMember };
};
