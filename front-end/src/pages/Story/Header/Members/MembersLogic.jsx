// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../context/StoryContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const MembersLogic = () => {
	const { storyMembers } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);

	function navigateToMember(e, memberUsername) {
		if (!memberUsername) return;
		changeLocation("/u/" + memberUsername, e.button === 1);
	}

	return { storyMembers, navigateToMember };
};
