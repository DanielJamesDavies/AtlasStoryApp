// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const FollowingStoriesLogic = () => {
	const { APIRequest } = useContext(APIContext);
	const [followingStories, setFollowingStories] = useState(false);

	useEffect(() => {
		async function getFollowingStories() {
			const response = await APIRequest("/story-follow/user-following/me", "GET");
			if (!response || response?.errors || !response?.data?.stories) return false;
			setFollowingStories(response.data.stories);
		}
		getFollowingStories();
	}, [setFollowingStories, APIRequest]);

	return { followingStories };
};
