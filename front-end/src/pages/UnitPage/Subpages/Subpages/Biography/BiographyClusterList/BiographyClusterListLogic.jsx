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

export const BiographyClusterListLogic = ({ currBiographyCluster, switchBiographyCluster }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion, changeUnitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	async function addBiographyCluster() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newUnitVersion.biography.push({
			_id: new_id_response.data._id,
			name: "New Biography Cluster",
			items: [],
		});
		changeUnitVersion(newUnitVersion);
	}

	function removeBiographyCluster(e, index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		if (currBiographyCluster?._id === newUnitVersion.biography[index]._id) switchBiographyCluster(newUnitVersion.biography[0]._id);
		newUnitVersion.biography.splice(index, 1);
		changeUnitVersion(newUnitVersion);
	}

	async function defaultBiographyClusters() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const defaultBiographyClustersTitles = ["Strengths", "Flaws & Weaknesses", "Achievements", "Failures", "History", "Arcs", "Plans"];
		let newBiographyClusters = await Promise.all(
			defaultBiographyClustersTitles.map(async (name) => {
				const correspondingItem = newUnitVersion.biography.find((e) => e.name === name);
				if (correspondingItem) return correspondingItem;

				const new_id_response = await APIRequest("/new-id/", "GET");
				if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

				return { _id: new_id_response.data._id, name, items: [] };
			})
		);
		newBiographyClusters = newBiographyClusters.filter((e) => e !== false);
		newBiographyClusters = newBiographyClusters.concat(
			newUnitVersion.biography.filter((e) => !defaultBiographyClustersTitles.includes(e.name))
		);
		newUnitVersion.biography = newBiographyClusters;
		changeUnitVersion(newUnitVersion);
	}

	const [isReorderingBiographyCluster, setIsReorderingBiographyCluster] = useState(false);
	function toggleIsReorderingBiographyClusters() {
		setIsReorderingBiographyCluster((oldIsReorderingBiographyCluster) => !oldIsReorderingBiographyCluster);
	}

	function reorderBiographyCluster(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempBiographyCluster = newUnitVersion.biography.splice(res.from, 1)[0];
		newUnitVersion.biography.splice(res.to, 0, tempBiographyCluster);
		changeUnitVersion(newUnitVersion);
	}

	async function revertBiographyClusters() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "biography"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.biography = response.data.value.map((biographyCluster) => {
			const biographyClusterIndex = newUnitVersion.biography.findIndex((e) => e._id === biographyCluster._id);
			if (biographyClusterIndex !== -1) return newUnitVersion.biography[biographyClusterIndex];
			return biographyCluster;
		});
		changeUnitVersion(newUnitVersion);

		return true;
	}

	async function saveBiographyClusters() {
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "biography"],
			newValue: unitVersion.biography,
		});
		if (!response) return false;
		return true;
	}

	function onClickBiographyCluster(biographyCluster) {
		switchBiographyCluster(biographyCluster._id);
	}

	const [biographyClusterListItemsRefCurrent, biographyClusterListItemsRef] = useState(undefined);
	function onBiographyClusterListScroll(e) {
		if (biographyClusterListItemsRefCurrent?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unitVersion,
		addBiographyCluster,
		removeBiographyCluster,
		isReorderingBiographyCluster,
		toggleIsReorderingBiographyClusters,
		reorderBiographyCluster,
		revertBiographyClusters,
		saveBiographyClusters,
		defaultBiographyClusters,
		onClickBiographyCluster,
		biographyClusterListItemsRef,
		onBiographyClusterListScroll,
	};
};
