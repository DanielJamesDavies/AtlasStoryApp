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
	const { changeLocationAndParameters } = useContext(RoutesContext);

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
		let unit_type_main_page = "";
		switch (unit_type) {
			case "character":
			case "group":
				unit_type_main_page = "/characters";
				break;
			case "plot":
				unit_type_main_page = "/plots";
				break;
			case "location":
				unit_type_main_page = "/locations";
				break;
			case "object":
				unit_type_main_page = "/objects";
				break;
			case "lore":
				unit_type_main_page = "/world-building";
				break;
			default:
				unit_type_main_page = "";
		}
		changeLocationAndParameters("/s/" + story_uid + unit_type_main_page, []);
		return true;
	}

	return { unit_type_title, isAuthorizedToEdit, deleteUnit, errors };
};
