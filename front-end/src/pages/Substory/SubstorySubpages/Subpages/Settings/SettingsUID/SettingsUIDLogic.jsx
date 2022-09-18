// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SettingsUIDLogic = () => {
	const { story_uid, substory_uid, isAuthorizedToEdit, story, substory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [uid, setUid] = useState(substory.uid);
	useEffect(() => {
		setUid(substory_uid);
	}, [story_uid, substory_uid]);

	function changeUid(e) {
		setUid(e.target.value);
	}

	async function revertUid() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["uid"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		setUid(response.data.value);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveUid() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["uid"],
			newValue: uid,
		});
		if (!response || response?.errors || !response?.data?.substory?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_uid + "/s/" + response?.data?.substory?.uid);
		return true;
	}

	return { isAuthorizedToEdit, uid, changeUid, revertUid, saveUid, errors };
};
