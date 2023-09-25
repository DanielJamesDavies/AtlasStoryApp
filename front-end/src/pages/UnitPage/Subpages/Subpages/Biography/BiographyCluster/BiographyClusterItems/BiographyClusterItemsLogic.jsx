// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../../UnitPageContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BiographyClusterItemsLogic = ({ biographyCluster, changeBiographyCluster }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion } = useContext(UnitPageContext);
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
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "biography", biographyCluster._id, "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.items = response.data.value;
		changeBiographyCluster(newBiographyCluster);

		return true;
	}

	async function saveBiographyClusterItems() {
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "biography", biographyCluster._id, "items"],
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
