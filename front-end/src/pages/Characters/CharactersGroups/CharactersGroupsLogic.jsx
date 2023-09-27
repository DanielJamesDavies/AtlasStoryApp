// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services
import getColourWithTint from "../../../services/GetColourWithTint";

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
	} = useContext(CharactersContext);
	const { authorized_user_id, APIRequest } = useContext(APIContext);

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

	const [activeGroupColour, setActiveGroupColour] = useState(false);
	const [activeGroupColourTint, setActiveGroupColourTint] = useState(false);

	useEffect(() => {
		if (group?.data?.colour) {
			try {
				const colours = getColourWithTint(group?.data?.colour);
				setActiveGroupColour(colours[0]);
				setActiveGroupColourTint(colours[1]);
			} catch {
				setActiveGroupColour(group?.data?.colour);
				setActiveGroupColourTint(group?.data?.colour);
			}
		}
	}, [group]);

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
		activeGroupColour,
		activeGroupColourTint,
	};
};
