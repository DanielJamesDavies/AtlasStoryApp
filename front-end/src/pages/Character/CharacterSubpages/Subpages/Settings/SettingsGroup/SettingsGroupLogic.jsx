// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsGroupLogic = () => {
	const { story_uid, character_uid, isAuthorizedToEdit, story, character, storyGroups } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [group, setGroup] = useState(false);
	useEffect(() => {
		function getGroup() {
			const newGroup = storyGroups.find((e) => e._id === character.group_id);
			if (!newGroup) setGroup(false);
			setGroup(newGroup);
		}
		getGroup();
	}, [story_uid, character_uid, storyGroups, character]);

	function changeGroup(e) {
		const newGroup = storyGroups[e];
		if (newGroup) setGroup(newGroup);
	}

	async function revertGroup() {
		if (!group) return false;

		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["group_id"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		const newGroup = storyGroups.find((e) => e._id === response.data.value);
		if (newGroup) setGroup(newGroup);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveGroup() {
		if (!group) return false;

		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["group_id"],
			newValue: group,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, storyGroups, group, changeGroup, revertGroup, saveGroup, errors };
};
