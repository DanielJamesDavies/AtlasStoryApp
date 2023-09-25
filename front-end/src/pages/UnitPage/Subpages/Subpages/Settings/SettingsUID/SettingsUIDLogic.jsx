// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SettingsUIDLogic = () => {
	const { unit_type, type_url_key, story_uid, unit_uid, isAuthorizedToEdit, story, unit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [uid, setUid] = useState(unit.uid);
	useEffect(() => {
		setUid(unit_uid);
	}, [story_uid, unit_uid]);

	function changeUid(e) {
		setUid(e.target.value);
	}

	async function revertUid() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["uid"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUid(response.data.value);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveUid() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["uid"],
			newValue: uid,
		});
		if (!response || response?.errors || !response?.data[unit_type]?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_uid + "/" + type_url_key + "/" + response?.data[unit_type]?.uid);
		return true;
	}

	return { isAuthorizedToEdit, uid, changeUid, revertUid, saveUid, errors };
};
