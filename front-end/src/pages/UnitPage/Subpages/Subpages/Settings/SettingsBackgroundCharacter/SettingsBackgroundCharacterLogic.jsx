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

export const SettingsBackgroundCharacterLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function toggleIsBackgroundCharacter() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.isBackgroundCharacter = !newUnit.isBackgroundCharacter;
			return newUnit;
		});
	}

	async function revertIsBackgroundCharacter() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["isBackgroundCharacter"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.isBackgroundCharacter = response.data.value;
			return newUnit;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveIsBackgroundCharacter() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["isBackgroundCharacter"],
			newValue: unit.isBackgroundCharacter,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { unit_type, isAuthorizedToEdit, unit, toggleIsBackgroundCharacter, revertIsBackgroundCharacter, saveIsBackgroundCharacter, errors };
};
