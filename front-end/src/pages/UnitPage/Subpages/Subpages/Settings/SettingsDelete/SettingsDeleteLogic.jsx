// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SettingsDeleteLogic = () => {
	const { unit_type, unit_type_title, story_uid, isAuthorizedToEdit, story, unit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [errors, setErrors] = useState([]);

	async function deleteUnit() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "DELETE", {
			story_id: story._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_uid + "/units");
		return true;
	}

	return { unit_type_title, isAuthorizedToEdit, deleteUnit, errors };
};
