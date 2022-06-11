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

export const SettingsURLLogic = () => {
	const { story_url, character_url, isAuthorizedToEdit, story, character } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [url, setUrl] = useState(character.url);
	useEffect(() => {
		setUrl(character_url);
	}, [story_url, character_url]);

	function changeUrl(e) {
		setUrl(e.target.value);
	}

	async function revertUrl() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["url"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		setUrl(response.data.value);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveUrl() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["url"],
			newValue: url,
		});
		if (!response || response?.errors || !response?.data?.character?.url) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_url + "/c/" + response?.data?.character?.url);
		return true;
	}

	return { isAuthorizedToEdit, url, changeUrl, revertUrl, saveUrl, errors };
};
