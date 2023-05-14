// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../../GroupContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SettingsUIDLogic = () => {
	const { story_uid, group_uid, isAuthorizedToEdit, story, group } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [uid, setUid] = useState(group.uid);
	useEffect(() => {
		setUid(group_uid);
	}, [story_uid, group_uid]);

	function changeUid(e) {
		setUid(e.target.value);
	}

	async function revertUid() {
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["uid"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUid(response.data.value);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveUid() {
		setErrors([]);
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["uid"],
			newValue: uid,
		});
		if (!response || response?.errors || !response?.data?.group?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_uid + "/g/" + response?.data?.group?.uid);
		return true;
	}

	return { isAuthorizedToEdit, uid, changeUid, revertUid, saveUid, errors };
};
