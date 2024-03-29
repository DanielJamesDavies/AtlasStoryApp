// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../context/StoryContext";
import { RoutesContext } from "../../../../context/RoutesContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const ButtonsLogic = () => {
	const { isAuthorizedToEdit, isFollowingStory, setIsFollowingStory, story, setIsDisplayingSettings } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);
	const { APIRequest, user_id } = useContext(APIContext);

	function goToStoryNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/notes", e.button === 1);
	}

	function openSettings() {
		setIsDisplayingSettings(true);
	}

	async function leaveStory() {
		const leave_story_response = await APIRequest("/story/leave/" + story._id, "POST", { story_id: story._id });
		if (leave_story_response?.errors) return false;
		changeLocation("/");
		return true;
	}

	async function onFollowStoryBtnClick() {
		if (!story?._id) return false;
		if (isFollowingStory) {
			const unfollow_story_response = await APIRequest("/story-follow/" + story._id, "DELETE");
			if (unfollow_story_response?.errors) return false;
			setIsFollowingStory(false);
		} else {
			const follow_story_response = await APIRequest("/story-follow/" + story._id, "POST");
			if (follow_story_response?.errors) return false;
			setIsFollowingStory(true);
		}
		return true;
	}

	return { user_id, isAuthorizedToEdit, isFollowingStory, story, goToStoryNotes, openSettings, leaveStory, onFollowStoryBtnClick };
};
