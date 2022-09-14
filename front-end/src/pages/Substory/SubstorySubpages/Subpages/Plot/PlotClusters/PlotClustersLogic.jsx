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

export const PlotClustersLogic = ({ switchCluster }) => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	async function addCluster() {
		let newSubstory = JSON.parse(JSON.stringify(substory));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newSubstory.data.plot.clusters.push({ _id: new_id_response.data._id, name: "New Plot Item Cluster", groups: [] });
		setSubstory(newSubstory);
	}

	const [isReorderingClusters, setIsReorderingClusters] = useState(false);
	function toggleIsReorderingClusters() {
		setIsReorderingClusters((oldIsReorderingClusters) => !oldIsReorderingClusters);
	}

	function reorderClusters(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newSubstory = JSON.parse(JSON.stringify(substory));
		const tempCluster = newSubstory.data.plot.clusters.splice(res.from, 1)[0];
		newSubstory.data.plot.clusters.splice(res.to, 0, tempCluster);
		setSubstory(newSubstory);
	}

	function onClickCluster(cluster) {
		switchCluster(cluster._id);
	}

	async function revertClusters() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "plot", "clusters"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.plot.clusters = response?.data?.value.map((cluster) => {
			let newCluster = JSON.parse(JSON.stringify(cluster));
			const clusterIndex = newSubstory.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
			if (clusterIndex !== -1) newCluster.groups = newSubstory.data.plot.clusters[clusterIndex].groups;
			return newCluster;
		});
		setSubstory(newSubstory);

		return true;
	}

	async function saveClusters() {
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "clusters"],
			newValue: substory.data.plot.clusters,
		});
		if (!response) return false;
		return true;
	}

	function removeCluster(e, cluster) {
		e.stopPropagation();
		let newSubstory = JSON.parse(JSON.stringify(substory));
		const clusterIndex = newSubstory.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
		if (clusterIndex === -1) return false;
		newSubstory.data.plot.clusters.splice(clusterIndex, 1);
		setSubstory(newSubstory);
	}

	function changeClusterName(e, cluster) {
		let newSubstory = JSON.parse(JSON.stringify(substory));
		const clusterIndex = newSubstory.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
		if (clusterIndex === -1) return false;
		newSubstory.data.plot.clusters[clusterIndex].name = e.target.value;
		setSubstory(newSubstory);
	}

	const onPlotClustersRef = useRef();
	function onPlotClustersContainerScroll(e) {
		if (onPlotClustersRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		substory,
		addCluster,
		isReorderingClusters,
		toggleIsReorderingClusters,
		reorderClusters,
		revertClusters,
		saveClusters,
		onClickCluster,
		removeCluster,
		changeClusterName,
		onPlotClustersRef,
		onPlotClustersContainerScroll,
	};
};
