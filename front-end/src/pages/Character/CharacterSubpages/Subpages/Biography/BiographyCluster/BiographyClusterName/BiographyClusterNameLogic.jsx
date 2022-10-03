// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BiographyClusterNameLogic = ({ biographyCluster, changeBiographyCluster }) => {
	const { isAuthorizedToEdit, story, character, characterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeBiographyClusterName(e) {
		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.name = e.target.value;
		changeBiographyCluster(newBiographyCluster);
	}

	async function revertBiographyClusterName() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "biography", biographyCluster._id, "name"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.name = response.data.value;
		changeBiographyCluster(newBiographyCluster);

		return true;
	}

	async function saveBiographyClusterName() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "biography", biographyCluster._id, "name"],
			newValue: biographyCluster.name,
		});
		if (!response) return false;
		return true;
	}

	return { isAuthorizedToEdit, changeBiographyClusterName, revertBiographyClusterName, saveBiographyClusterName };
};
