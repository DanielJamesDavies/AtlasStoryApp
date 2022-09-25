// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BiographyClusterItemsLogic = ({ biographyCluster, changeBiographyCluster }) => {
	const { isAuthorizedToEdit, story, character, characterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	async function addBiographyClusterItem() {
		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newBiographyCluster.items.push({
			_id: new_id_response.data._id,
			title: "",
			text: [""],
			images: [],
		});
		changeBiographyCluster(newBiographyCluster);
	}

	const [isReorderingBiographyClusterItems, setIsReorderingBiographyClusterItems] = useState(false);
	function toggleIsReorderingBiographyClusterItems() {
		setIsReorderingBiographyClusterItems((oldIsReorderingBiographyClusterItems) => !oldIsReorderingBiographyClusterItems);
	}

	function reorderBiographyClusterItems(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));

		const tempBiographyClusterItem = newBiographyCluster.items.splice(res.from, 1)[0];
		newBiographyCluster.items.splice(res.to, 0, tempBiographyClusterItem);
		changeBiographyCluster(newBiographyCluster);
	}

	async function revertBiographyClusterItems() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "biography", biographyCluster._id, "items"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.items = response.data.value;
		changeBiographyCluster(newBiographyCluster);

		return true;
	}

	async function saveBiographyClusterItems() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "biography", biographyCluster._id, "items"],
			newValue: biographyCluster.items,
		});
		if (!response) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		addBiographyClusterItem,
		isReorderingBiographyClusterItems,
		toggleIsReorderingBiographyClusterItems,
		reorderBiographyClusterItems,
		revertBiographyClusterItems,
		saveBiographyClusterItems,
	};
};
