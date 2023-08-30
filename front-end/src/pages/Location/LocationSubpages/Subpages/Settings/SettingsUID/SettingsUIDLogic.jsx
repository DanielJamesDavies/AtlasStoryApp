// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../../LocationContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SettingsUIDLogic = () => {
	const { story_uid, location_uid, isAuthorizedToEdit, story, location } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [uid, setUid] = useState(location.uid);
	useEffect(() => {
		setUid(location_uid);
	}, [story_uid, location_uid]);

	function changeUid(e) {
		setUid(e.target.value);
	}

	async function revertUid() {
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
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
		if (!location?._id) return;
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["uid"],
			newValue: uid,
		});
		if (!response || response?.errors || !response?.data?.location?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		changeLocation("/s/" + story_uid + "/l/" + response?.data?.location?.uid);
		return true;
	}

	return { isAuthorizedToEdit, uid, changeUid, revertUid, saveUid, errors };
};
