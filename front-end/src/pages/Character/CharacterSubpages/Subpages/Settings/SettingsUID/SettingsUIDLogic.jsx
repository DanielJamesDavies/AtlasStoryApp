// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SettingsUIDLogic = () => {
	const { story_uid, character_uid, isAuthorizedToEdit, story, character } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [uid, setUid] = useState(character.uid);
	useEffect(() => {
		setUid(character_uid);
	}, [story_uid, character_uid]);

	function changeUid(e) {
		setUid(e.target.value);
	}

	async function revertUid() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
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
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["uid"],
			newValue: uid,
		});
		if (!response || response?.errors || !response?.data?.character?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_uid + "/c/" + response?.data?.character?.uid);
		return true;
	}

	return { isAuthorizedToEdit, uid, changeUid, revertUid, saveUid, errors };
};
