// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsCardNameColourLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeColour(colour) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.cardNameColour = colour;
			return newUnit;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertColour() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "cardNameColour"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.cardNameColour = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveColour() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "cardNameColour"],
			newValue: unit.data.cardNameColour,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, unit_type, unit, changeColour, revertColour, saveColour, errors };
};
