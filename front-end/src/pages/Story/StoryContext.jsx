import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { AppContext } from "../../context/AppContext";
import { RoutesContext } from "../../context/RoutesContext";

export const StoryContext = createContext();

const StoryProvider = ({ children, story_url }) => {
	const [isAuthorizedToModify, setIsAuthorizedToModify] = useState(false);
	const [story, setStory] = useState(false);
	const [members, setMembers] = useState([]);
	const [icon, setIcon] = useState(false);
	const [banner, setBanner] = useState(false);
	const [primaryCharacters, setPrimaryCharacters] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { changeAccentColour, changeAccentColourHover } = useContext(AppContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		async function getStory() {
			if (!story_url) return setStory(false);
			if (story.url === story_url) return;

			// Story Data
			const response = await APIRequest("/story?url=" + story_url, "GET");
			if (!response?.data?.story || response?.error || story_url !== response.data.story.url) {
				setStory(false);
				setIcon(false);
				setBanner(false);
				setIsAuthorizedToModify(false);
				return;
			}

			setStory(response.data.story);

			setIsAuthorizedToModify(response?.data?.isAuthorizedToModify);

			if (response?.data?.story?.data?.colours?.accent) changeAccentColour(response.data.story.data.colours.accent);
			if (response?.data?.story?.data?.colours?.accentHover) changeAccentColourHover(response.data.story.data.colours.accentHover);

			if (response.data.story?.data?.members) getStoryMembers(response.data.story.data.members);
			if (response.data.story?.data?.icon) getStoryIcon(response.data.story.data.icon);
			if (response.data.story?.data?.banner) getStoryBanner(response.data.story.data.banner);
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

		let reloadTimer = setTimeout(() => getStory(), 1);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [
		location,
		story_url,
		APIRequest,
		story,
		setStory,
		setMembers,
		setIcon,
		setBanner,
		setPrimaryCharacters,
		setIsAuthorizedToModify,
		changeAccentColour,
		changeAccentColourHover,
	]);

	return (
		<StoryContext.Provider
			value={{
				story,
				setStory,
				members,
				icon,
				banner,
				primaryCharacters,
				isAuthorizedToModify,
			}}
		>
			{children}
		</StoryContext.Provider>
	);
};

export default StoryProvider;
