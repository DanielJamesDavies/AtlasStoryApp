// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BiographyClusterListLogic = ({ currBiographyCluster, switchBiographyCluster }) => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	async function addBiographyCluster() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newCharacterVersion.biography.push({
			_id: new_id_response.data._id,
			name: "New Biography Cluster",
			items: [],
		});
		changeCharacterVersion(newCharacterVersion);
	}

	function removeBiographyCluster(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		if (currBiographyCluster?._id === newCharacterVersion.biography[index]._id) switchBiographyCluster(newCharacterVersion.biography[0]._id);
		newCharacterVersion.biography.splice(index, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	async function defaultBiographyClusters() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const defaultBiographyClustersTitles = ["Strengths", "Flaws & Weaknesses", "Achievements", "Failures", "History", "Arcs", "Plans"];
		let newBiographyClusters = await Promise.all(
			defaultBiographyClustersTitles.map(async (name) => {
				const correspondingItem = newCharacterVersion.biography.find((e) => e.name === name);
				if (correspondingItem) return correspondingItem;

				const new_id_response = await APIRequest("/new-id/", "GET");
				if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

				return { _id: new_id_response.data._id, name, items: [] };
			})
		);
		newBiographyClusters = newBiographyClusters.filter((e) => e !== false);
		newBiographyClusters = newBiographyClusters.concat(
			newCharacterVersion.biography.filter((e) => !defaultBiographyClustersTitles.includes(e.name))
		);
		newCharacterVersion.biography = newBiographyClusters;
		console.log(newBiographyClusters);
		changeCharacterVersion(newCharacterVersion);
	}

	const [isReorderingBiographyCluster, setIsReorderingBiographyCluster] = useState(false);
	function toggleIsReorderingBiographyClusters() {
		setIsReorderingBiographyCluster((oldIsReorderingBiographyCluster) => !oldIsReorderingBiographyCluster);
	}

	function reorderBiographyCluster(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempBiographyCluster = newCharacterVersion.biography.splice(res.from, 1)[0];
		newCharacterVersion.biography.splice(res.to, 0, tempBiographyCluster);
		changeCharacterVersion(newCharacterVersion);
	}

	async function revertBiographyClusters() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "biography"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.biography = response.data.value.map((biographyCluster) => {
			const biographyClusterIndex = newCharacterVersion.biography.findIndex((e) => e._id === biographyCluster._id);
			if (biographyClusterIndex !== -1) return newCharacterVersion.biography[biographyClusterIndex];
			return biographyCluster;
		});
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function saveBiographyClusters() {
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "biography"],
			newValue: characterVersion.biography,
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
		characterVersion,
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
