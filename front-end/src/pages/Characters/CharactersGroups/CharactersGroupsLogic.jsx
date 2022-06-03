// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersGroupsLogic = () => {
	const {
		isAuthorizedToEdit,
		story,
		setStory,
		groups,
		group,
		changeGroup,
		setIsDisplayingCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
	} = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	function openCreateGroupForm() {
		setIsDisplayingCreateGroupForm(true);
	}

	async function changeGroupsOrder(res) {
		let newStory = JSON.parse(JSON.stringify(story));

		if (res.from === undefined || res.to === undefined) return;

		const tempGroup = newStory.data.groups.splice(res.from, 1)[0];
		newStory.data.groups.splice(res.to, 0, tempGroup);

		setStory(newStory);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "groups"],
			newValue: newStory.data.groups,
		});
	}

	return {
		isAuthorizedToEdit,
		story,
		groups,
		group,
		changeGroup,
		openCreateGroupForm,
		isReorderingGroups,
		toggleIsReorderingGroups,
		changeGroupsOrder,
	};
};
