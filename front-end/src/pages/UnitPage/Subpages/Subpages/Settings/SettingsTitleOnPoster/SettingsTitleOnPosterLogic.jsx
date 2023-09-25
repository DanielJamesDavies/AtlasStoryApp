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

export const SettingsTitleOnPosterLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function toggleIsTitleOnPoster() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.isTitleOnPoster = !newUnit.data.isTitleOnPoster;
			return newUnit;
		});
	}

	async function revertIsTitleOnPoster() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "isTitleOnPoster"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.isTitleOnPoster = response.data.value;
			return newUnit;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveIsTitleOnPoster() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "isTitleOnPoster"],
			newValue: unit.data.isTitleOnPoster,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { unit_type, isAuthorizedToEdit, unit, toggleIsTitleOnPoster, revertIsTitleOnPoster, saveIsTitleOnPoster, errors };
};
