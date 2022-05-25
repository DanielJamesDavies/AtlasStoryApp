import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const StoryContext = createContext();

const StoryProvider = ({ children, story_url }) => {
	const [story, setStory] = useState(false);
	const [members, setMembers] = useState([]);
	const [icon, setIcon] = useState(false);
	const [banner, setBanner] = useState(false);
	const [primaryCharacters, setPrimaryCharacters] = useState(false);
	const [isAuthorizedStoryProfile, setIsAuthorizedStoryProfile] = useState(false);
	const [isDisplayingCreateStoryForm, setIsDisplayingCreateStoryForm] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		let reloadTimer = setTimeout(() => getStory(), 1);

		async function getStory() {
			if (!story_url) return setStory(false);
			if (story.url === story_url) return;

			// Story Data
			const response = await APIRequest("/story?url=" + story_url, "GET");
			if (!response?.data?.story || response?.error) {
				setStory(false);
				setIcon(false);
				setBanner(false);
				setIsAuthorizedStoryProfile(false);
				return;
			}

			setIsAuthorizedStoryProfile(response.data?.isAuthorizedStory);

			if (story_url === response.data.story.url) setStory(response.data.story);

			if (response.data.story?.members) getStoryMembers(response.data.story.members);
			if (response.data.story?.icon) getStoryIcon(response.data.story.icon);
			if (response.data.story?.banner) getStoryBanner(response.data.story.banner);
			if (response.data.story?._id) getStoryPrimaryCharacter(response.data.story._id);
		}

		async function getStoryMembers(members) {
			let newStoryMembers = await Promise.all(members.map(async (member) => await getStoryMember(member)));
			newStoryMembers = newStoryMembers.filter((e) => e !== false);
			setMembers(newStoryMembers);
		}

		async function getStoryMember(member) {
			let memberResponse = await APIRequest("/user/" + member.user_id, "GET");
			if (memberResponse?.error || !memberResponse?.data?.user) return false;
			return {
				_id: memberResponse?.data?.user?._id,
				username: memberResponse?.data?.user?.username,
				nickname: memberResponse?.data?.user?.nickname,
				type: member.type,
			};
		}

		async function getStoryIcon(iconID) {
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setIcon(false);
			setIcon(response.data.image);
		}

		async function getStoryBanner(bannerID) {
			const response = await APIRequest("/image/" + bannerID, "GET");
			if (response?.error || !response?.data?.image) return setBanner(false);
			setBanner(response.data.image);
		}

		async function getStoryPrimaryCharacter(storyID) {
			const response = await APIRequest("/character/primary-character?story_id=" + storyID, "GET");
			if (response?.error || !response?.data?.characters) return setPrimaryCharacters(false);
			setPrimaryCharacters(response.data.characters);
		}

		if (story.url !== story_url) getStory();

		return () => {
			clearTimeout(reloadTimer);
		};
	}, [location, story_url, APIRequest, story, setStory, setMembers, setIcon, setBanner, setPrimaryCharacters]);

	return (
		<StoryContext.Provider
			value={{
				story,
				setStory,
				members,
				icon,
				banner,
				primaryCharacters,
				isAuthorizedStoryProfile,
				isDisplayingCreateStoryForm,
				setIsDisplayingCreateStoryForm,
			}}
		>
			{children}
		</StoryContext.Provider>
	);
};

export default StoryProvider;
