// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PlotItemAddToGroupMenuLogic = ({ itemID, isDisplayingPlotItemAddToGroupMenu, hidePlotItemAddToGroupMenu }) => {
	const { story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	const [currSlide, setCurrSlide] = useState(false);
	const [selectedClusterID, setSelectedClusterID] = useState(false);

	function resetMenu() {
		setSelectedClusterID(false);
		setCurrSlide(0);
		setLoading(false);
	}

	useEffect(() => {
		resetMenu();
	}, [isDisplayingPlotItemAddToGroupMenu, setSelectedClusterID]);

	function goBackToClusters() {
		setSelectedClusterID(false);
		setCurrSlide(0);
	}

	function onClickCluster(clusterID) {
		setSelectedClusterID(clusterID);
		setCurrSlide(1);
	}

	const [loading, setLoading] = useState(false);
	async function onClickGroup(groupID) {
		if (loading) return;
		setLoading(true);

		const newSelectedClusterID = JSON.parse(JSON.stringify(selectedClusterID));
		let newSubstory = JSON.parse(JSON.stringify(substory));
		const clusterIndex = newSubstory.data.plot.clusters.findIndex((e) => e._id === newSelectedClusterID);
		if (clusterIndex === -1) return resetMenu();
		const groupIndex = newSubstory.data.plot.clusters[clusterIndex].groups.findIndex((e) => e._id === groupID);
		if (groupIndex === -1) return resetMenu();
		if (!newSubstory.data.plot.clusters[clusterIndex].groups[groupIndex].items.includes(itemID))
			newSubstory.data.plot.clusters[clusterIndex].groups[groupIndex].items.push(itemID);

		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "clusters", newSelectedClusterID, "groups", groupID, "items"],
			newValue: newSubstory.data.plot.clusters[clusterIndex].groups[groupIndex].items,
		});
		if (!response || response?.errors) {
			resetMenu();
			return false;
		}

		setSubstory(newSubstory);
		setLoading(false);
		hidePlotItemAddToGroupMenu();
		return true;
	}

	return { substory, currSlide, selectedClusterID, goBackToClusters, onClickCluster, onClickGroup };
};
