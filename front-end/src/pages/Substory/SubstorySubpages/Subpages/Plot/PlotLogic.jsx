// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../SubstoryContext";

// Services

// Assets

export const PlotLogic = () => {
	const { substory, setSubstory } = useContext(SubstoryContext);
	const [cluster, setCluster] = useState(false);
	const [groupID, setGroupID] = useState(false);

	useEffect(() => {
		function getCluster() {
			if (!cluster && substory?.data?.plot?.clusters.length !== 0) {
				setCluster(substory?.data?.plot?.clusters[0]);
			}

			if (cluster && cluster.groups.length !== 0) {
				setGroupID(cluster.groups[0]._id);
			} else {
				setGroupID(false);
			}
		}
		getCluster();
	}, [substory, cluster, setCluster]);

	function changeCluster(newCluster) {
		setCluster(newCluster);

		let newSubstory = JSON.parse(JSON.stringify(substory));
		const newClusterIndex = newSubstory.data.plot.clusters.findIndex((e) => e?._id === newCluster?._id);
		if (newClusterIndex === -1) return false;
		newSubstory.data.plot.clusters[newClusterIndex] = newCluster;
		setSubstory(newSubstory);
	}

	function switchCluster(clusterID) {
		if (clusterID === cluster._id) return false;

		const newClusterIndex = substory.data.plot.clusters.findIndex((e) => e._id === clusterID);
		setCluster(newClusterIndex === -1 ? false : JSON.parse(JSON.stringify(substory.data.plot.clusters[newClusterIndex])));
	}

	function changeGroup(newGroup) {
		let newCluster = JSON.parse(JSON.stringify(cluster));
		const newGroupIndex = newCluster.groups.findIndex((e) => e?._id === newGroup?._id);
		if (newGroupIndex === -1) return false;
		newCluster[newGroupIndex].groups = newGroup;
		setCluster(newCluster);
	}

	return { cluster, changeCluster, switchCluster, groupID, setGroupID, changeGroup };
};
