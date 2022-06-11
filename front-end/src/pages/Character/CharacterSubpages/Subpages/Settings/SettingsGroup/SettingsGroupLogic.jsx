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
	const { story_url, character_url, isAuthorizedToEdit, story, character, groups } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [group, setGroup] = useState(character.group);
	useEffect(() => {
		function getGroup() {
			const newGroup = groups.find((e) => e._id === character.group_id);
			if (newGroup) return newGroup;
			return {};
		}
		setGroup(getGroup());
	}, [story_url, character_url, groups, character]);

	function changeGroup(e) {
		const newGroup = groups[e];
		if (newGroup) setGroup(newGroup);
	}

	async function revertGroup() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["group_id"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		const newGroup = groups.find((e) => e._id === response.data.value);
		if (newGroup) setGroup(newGroup);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveGroup() {
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

	return { isAuthorizedToEdit, groups, group, changeGroup, revertGroup, saveGroup, errors };
};
