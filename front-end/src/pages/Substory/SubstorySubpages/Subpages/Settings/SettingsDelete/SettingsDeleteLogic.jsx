// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SettingsDeleteLogic = () => {
	const { story_uid, isAuthorizedToEdit, story, substory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [errors, setErrors] = useState([]);

	async function deleteSubstory() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "DELETE", {
			story_id: story._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_uid + "/substories");
		return true;
	}

	return { isAuthorizedToEdit, deleteSubstory, errors };
};
