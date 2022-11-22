// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../StoryContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const StoryPrimaryFollowBtnLogic = () => {
	const { isFollowingStory, setIsFollowingStory, story } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	async function onFollowStoryBtnClick() {
		if (!story?._id) return false;
		if (isFollowingStory) {
			const unfollow_story_response = await APIRequest("/story-follow/" + story._id, "DELETE");
			if (unfollow_story_response?.errors) return false;
			setIsFollowingStory(false);
			return true;
		} else {
			const follow_story_response = await APIRequest("/story-follow/" + story._id, "POST");
			console.log(follow_story_response);
			if (follow_story_response?.errors) return false;
			setIsFollowingStory(true);
			return true;
		}
	}

	return { isFollowingStory, story, onFollowStoryBtnClick };
};
