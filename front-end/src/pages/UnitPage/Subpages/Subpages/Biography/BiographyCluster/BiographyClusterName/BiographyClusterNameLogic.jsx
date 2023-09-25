// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../../UnitPageContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BiographyClusterNameLogic = ({ biographyCluster, changeBiographyCluster }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeBiographyClusterName(e) {
		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.name = e.target.value;
		changeBiographyCluster(newBiographyCluster);
	}

	async function revertBiographyClusterName() {
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "biography", biographyCluster._id, "name"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.name = response.data.value;
		changeBiographyCluster(newBiographyCluster);

		return true;
	}

	async function saveBiographyClusterName() {
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "biography", biographyCluster._id, "name"],
			newValue: biographyCluster.name,
		});
		if (!response) return false;
		return true;
	}

	return { isAuthorizedToEdit, changeBiographyClusterName, revertBiographyClusterName, saveBiographyClusterName };
};
