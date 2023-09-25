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

export const SettingsPrimaryCharacterLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function toggleIsPrimaryCharacter() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.isPrimaryCharacter = !newUnit.isPrimaryCharacter;
			return newUnit;
		});
	}

	async function revertIsPrimaryCharacter() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["isPrimaryCharacter"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.isPrimaryCharacter = response.data.value;
			return newUnit;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveIsPrimaryCharacter() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["isPrimaryCharacter"],
			newValue: unit.isPrimaryCharacter,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { unit_type, isAuthorizedToEdit, unit, toggleIsPrimaryCharacter, revertIsPrimaryCharacter, saveIsPrimaryCharacter, errors };
};
