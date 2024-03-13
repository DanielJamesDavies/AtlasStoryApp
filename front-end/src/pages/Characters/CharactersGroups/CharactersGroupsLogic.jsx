// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CharactersGroupsLogic = () => {
	const {
		isAuthorizedToEdit,
		story,
		setStory,
		storyGroups,
		setStoryGroups,
		group,
		changeGroup,
		setIsDisplayingCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
		toggleIsReorderingCharacters,
		setIsDisplayingCreateCharacterForm,
	} = useContext(CharactersContext);
	const { authorized_user_id, APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	function openCreateGroupForm() {
		setIsDisplayingCreateGroupForm(true);
	}

	async function changeGroupsOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newStory = JSON.parse(JSON.stringify(story));
		const tempStoryGroup = newStory.data.groups.splice(res.from, 1)[0];
		newStory.data.groups.splice(res.to, 0, tempStoryGroup);
		setStory(newStory);

		let newGroups = JSON.parse(JSON.stringify(storyGroups));
		const tempGroup = newGroups.splice(res.from, 1)[0];
		newGroups.splice(res.to, 0, tempGroup);
		setStoryGroups(newGroups);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "groups"],
			newValue: newStory.data.groups,
		});
	}

	function navigateToGroup(e) {
		if (story?.uid && group?.uid) changeLocation("/s/" + story.uid + "/g/" + group.uid, e.button === 1);
	}

	function openCreateCharacterForm() {
		setIsDisplayingCreateCharacterForm(true);
	}

	return {
		isAuthorizedToEdit,
		authorized_user_id,
		story,
		storyGroups,
		group,
		changeGroup,
		openCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
		changeGroupsOrder,
		openCreateCharacterForm,
		navigateToGroup,
		toggleIsReorderingCharacters,
	};
};
