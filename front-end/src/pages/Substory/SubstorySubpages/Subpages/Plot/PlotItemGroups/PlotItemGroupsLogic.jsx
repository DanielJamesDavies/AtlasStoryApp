// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PlotItemGroupsLogic = ({ cluster, changeCluster, setGroupID, setIsDisplayingItemGroups }) => {
	const { isAuthorizedToEdit, story, substory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	const [isReorderingItemGroups, setIsReorderingItemGroups] = useState(false);
	function toggleIsReorderingItemGroups() {
		setIsReorderingItemGroups((oldIsReorderingItemGroups) => !oldIsReorderingItemGroups);
	}

	function reorderItemGroups(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newCluster = JSON.parse(JSON.stringify(cluster));
		const tempGroup = newCluster.groups.splice(res.from, 1)[0];
		newCluster.groups.splice(res.to, 0, tempGroup);
		changeCluster(newCluster);
	}

	function onClickItemGroup(group) {
		setGroupID(group._id);
		setIsDisplayingItemGroups(false);
	}

	async function revertItemGroups() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "plot", "clusters", cluster?._id, "groups"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCluster = JSON.parse(JSON.stringify(cluster));
		newCluster.groups = response?.data?.value.map((group) => {
			let newGroup = JSON.parse(JSON.stringify(group));
			const groupIndex = newCluster.groups.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
			if (groupIndex !== -1) newGroup.items = newCluster.groups[groupIndex].items;
			return newGroup;
		});
		console.log(response.data.value);
		changeCluster(newCluster);

		return true;
	}

	async function saveItemGroups() {
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "clusters", cluster?._id, "groups"],
			newValue: cluster.groups,
		});
		if (!response) return false;
		return true;
	}

	async function addItemGroup() {
		let newCluster = JSON.parse(JSON.stringify(cluster));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newCluster.groups.push({ _id: new_id_response.data._id, name: "New Plot Item Group", items: [] });
		changeCluster(newCluster);
	}

	function removeItemGroup(e, group) {
		e.stopPropagation();
		let newCluster = JSON.parse(JSON.stringify(cluster));
		const groupIndex = newCluster.groups.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(group._id));
		if (groupIndex === -1) return false;
		newCluster.groups.splice(groupIndex, 1);
		changeCluster(newCluster);
	}

	function changeItemGroupName(e, group) {
		let newCluster = JSON.parse(JSON.stringify(cluster));
		const clusterIndex = newCluster.groups.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(group._id));
		if (clusterIndex === -1) return false;
		newCluster.groups[clusterIndex].name = e.target.value;
		changeCluster(newCluster);
	}

	const plotItemGroupsRef = useRef();
	function onPlotItemGroupsContainerScroll(e) {
		if (plotItemGroupsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		addItemGroup,
		isReorderingItemGroups,
		toggleIsReorderingItemGroups,
		reorderItemGroups,
		revertItemGroups,
		saveItemGroups,
		onClickItemGroup,
		removeItemGroup,
		changeItemGroupName,
		plotItemGroupsRef,
		onPlotItemGroupsContainerScroll,
	};
};
