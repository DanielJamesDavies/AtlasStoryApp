// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsGroupLogic = () => {
	const { unit_type, story_uid, unit_uid, isAuthorizedToEdit, story, unit, storyGroups } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const [group, setGroup] = useState(false);
	useEffect(() => {
		function getGroup() {
			const newGroup = storyGroups.find((e) => e._id === unit.group_id);
			if (!newGroup) setGroup(false);
			setGroup(newGroup);
		}
		getGroup();
	}, [story_uid, unit_uid, storyGroups, unit]);

	function changeGroup(e) {
		const newGroup = storyGroups[e];
		if (newGroup) setGroup(newGroup);
	}

	async function revertGroup() {
		if (!group) return false;

		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
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
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
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

	return { unit_type, isAuthorizedToEdit, storyGroups, group, changeGroup, revertGroup, saveGroup, errors };
};
