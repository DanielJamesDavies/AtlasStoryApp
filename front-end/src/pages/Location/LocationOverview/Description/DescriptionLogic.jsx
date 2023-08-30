// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../LocationContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const LocationOverviewDescriptionLogic = () => {
	const { isAuthorizedToEdit, story, location, setLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	function changeDescription(e) {
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.description = e.target.value.split("\n");
		setLocation(newLocation);
	}

	async function revertDescription() {
		const response = await APIRequest("/location/get-value/" + location._id, "POST", {
			story_id: story._id,
			path: ["data", "description"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.description = response.data.value;
		setLocation(newLocation);

		return true;
	}

	async function saveDescription() {
		const response = await APIRequest("/location/" + location._id, "PATCH", {
			story_id: story._id,
			path: ["data", "description"],
			newValue: location.data.description,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, location, changeDescription, revertDescription, saveDescription };
};
