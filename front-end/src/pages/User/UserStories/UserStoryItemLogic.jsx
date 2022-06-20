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

	function navigateToStory(e) {
		changeLocation("/s/" + story.uid, e.button === 1);
	}

	function navigateToOwner(e) {
		e.stopPropagation();
		if (story?.data?.owner?.username) changeLocation("/u/" + story.data.owner.username, e.button === 1);
	}

	function onStoryItemMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	return { story, navigateToStory, navigateToOwner, onStoryItemMouseDown };
};
