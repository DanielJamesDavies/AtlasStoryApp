// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const UserStoryItemLogic = ({ storyID }) => {
	const { stories } = useContext(UserContext);
	const [story, setStory] = useState(false);

	useEffect(() => {
		function getStory() {
			if (!stories) return;
			const newStory = stories?.find((e) => e._id === storyID);
			if (!newStory) return false;
			return newStory;
		}

		setStory(getStory());
	}, [storyID, stories, setStory]);

	const { changeLocation } = useContext(RoutesContext);

	function navigateToStory() {
		changeLocation("/s/" + story.url);
	}

	function navigateToOwner(e) {
		e.stopPropagation();
		if (story?.owner?.username) changeLocation("/u/" + story.owner.username);
	}

	return { story, navigateToStory, navigateToOwner };
};
