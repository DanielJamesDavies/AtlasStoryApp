// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PlotClustersLogic = ({ switchCluster, setIsDisplayingClusters }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	async function addCluster() {
		let newUnit = JSON.parse(JSON.stringify(unit));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newUnit.data.plot.clusters.push({ _id: new_id_response.data._id, name: "New Plot Item Cluster", groups: [] });
		setUnit(newUnit);
	}

	const [isReorderingClusters, setIsReorderingClusters] = useState(false);
	function toggleIsReorderingClusters() {
		setIsReorderingClusters((oldIsReorderingClusters) => !oldIsReorderingClusters);
	}

	function reorderClusters(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newUnit = JSON.parse(JSON.stringify(unit));
		const tempCluster = newUnit.data.plot.clusters.splice(res.from, 1)[0];
		newUnit.data.plot.clusters.splice(res.to, 0, tempCluster);
		setUnit(newUnit);
	}

	function onClickCluster(cluster) {
		switchCluster(cluster._id);
		setIsDisplayingClusters(false);
	}

	async function revertClusters() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "plot", "clusters"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.clusters = response?.data?.value.map((cluster) => {
			let newCluster = JSON.parse(JSON.stringify(cluster));
			const clusterIndex = newUnit.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
			if (clusterIndex !== -1) newCluster.groups = newUnit.data.plot.clusters[clusterIndex].groups;
			return newCluster;
		});
		setUnit(newUnit);

		return true;
	}

	async function saveClusters() {
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "clusters"],
			newValue: unit.data.plot.clusters,
		});
		if (!response) return false;
		return true;
	}

	function removeCluster(e, cluster) {
		e.stopPropagation();
		let newUnit = JSON.parse(JSON.stringify(unit));
		const clusterIndex = newUnit.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
		if (clusterIndex === -1) return false;
		newUnit.data.plot.clusters.splice(clusterIndex, 1);
		setUnit(newUnit);
	}

	function changeClusterName(e, cluster) {
		let newUnit = JSON.parse(JSON.stringify(unit));
		const clusterIndex = newUnit.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
		if (clusterIndex === -1) return false;
		newUnit.data.plot.clusters[clusterIndex].name = e.target.value;
		setUnit(newUnit);
	}

	const plotClustersRef = useRef();
	function onPlotClustersContainerScroll(e) {
		if (plotClustersRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unit,
		addCluster,
		isReorderingClusters,
		toggleIsReorderingClusters,
		reorderClusters,
		revertClusters,
		saveClusters,
		onClickCluster,
		removeCluster,
		changeClusterName,
		plotClustersRef,
		onPlotClustersContainerScroll,
	};
};
