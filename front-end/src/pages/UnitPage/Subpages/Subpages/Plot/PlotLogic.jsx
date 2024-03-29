// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";

// Services

// Assets

export const PlotLogic = () => {
	const { unit, setUnit } = useContext(UnitPageContext);
	const [cluster, setCluster] = useState(false);
	const [groupID, setGroupID] = useState(false);

	useEffect(() => {
		function getCluster() {
			if (!cluster && unit?.data?.plot?.clusters.length !== 0) {
				setCluster(unit?.data?.plot?.clusters[0]);
			}

			if (cluster && cluster.groups.length !== 0 && cluster.groups.findIndex((e) => e._id === groupID) === -1) {
				setGroupID(cluster.groups[0]._id);
			} else {
				if (!cluster || cluster.groups.length === 0) setGroupID(false);
			}
		}
		getCluster();
	}, [unit, cluster, setCluster, groupID]);

	function changeCluster(newCluster) {
		setCluster(newCluster);

		let newUnit = JSON.parse(JSON.stringify(unit));
		const newClusterIndex = newUnit.data.plot.clusters.findIndex((e) => e?._id === newCluster?._id);
		if (newClusterIndex === -1) return false;
		newUnit.data.plot.clusters[newClusterIndex] = newCluster;
		setUnit(newUnit);
	}

	function switchCluster(clusterID) {
		if (clusterID === cluster._id) return false;

		const newClusterIndex = unit.data.plot.clusters.findIndex((e) => e._id === clusterID);
		setCluster(newClusterIndex === -1 ? false : JSON.parse(JSON.stringify(unit.data.plot.clusters[newClusterIndex])));
	}

	function changeGroup(newGroup) {
		let newCluster = JSON.parse(JSON.stringify(cluster));
		const newGroupIndex = newCluster.groups.findIndex((e) => e?._id === newGroup?._id);
		if (newGroupIndex === -1) return false;
		newCluster[newGroupIndex].groups = newGroup;
		setCluster(newCluster);
	}

	const [isDisplayingClusters, setIsDisplayingClusters] = useState(false);
	function toggleIsDisplayingClusters() {
		setIsDisplayingClusters((oldIsDisplayingClusters) => !oldIsDisplayingClusters);
		setIsDisplayingItemGroups(false);
	}

	const [isDisplayingItemGroups, setIsDisplayingItemGroups] = useState(false);
	function toggleIsDisplayingItemGroups() {
		setIsDisplayingItemGroups((oldIsDisplayingItemGroups) => !oldIsDisplayingItemGroups);
		setIsDisplayingClusters(false);
	}

	return {
		cluster,
		changeCluster,
		switchCluster,
		groupID,
		setGroupID,
		changeGroup,
		isDisplayingClusters,
		setIsDisplayingClusters,
		toggleIsDisplayingClusters,
		isDisplayingItemGroups,
		setIsDisplayingItemGroups,
		toggleIsDisplayingItemGroups,
	};
};
