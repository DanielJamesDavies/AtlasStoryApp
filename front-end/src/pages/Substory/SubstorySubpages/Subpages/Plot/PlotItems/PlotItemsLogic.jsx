// Packages
import { useContext, useState, useRef, useLayoutEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PlotItemsLogic = ({ cluster, changeCluster, groupID }) => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	async function addPlotItem() {
		let newSubstory = JSON.parse(JSON.stringify(substory));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newSubstory.data.plot.items.push({ _id: new_id_response.data._id, name: "New Plot Item", text: [""], images: [], isUnsaved: true });
		setSubstory(newSubstory);
	}

	const [isReorderingPlotItems, setIsReorderingPlotItems] = useState(false);
	function toggleIsReorderingPlotItems() {
		setIsReorderingPlotItems((oldIsReorderingPlotItems) => !oldIsReorderingPlotItems);
	}

	function reorderPlotItems(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newSubstory = JSON.parse(JSON.stringify(substory));
		const tempPlotItem = newSubstory.data.plot.items.splice(res.from, 1)[0];
		newSubstory.data.plot.items.splice(res.to, 0, tempPlotItem);
		setSubstory(newSubstory);
	}

	async function revertPlotItems() {
		if (cluster?.isAll) {
			const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
				story_id: story._id,
				path: ["data", "plot", "items"],
			});
			if (!response || response?.errors || !response?.data?.value) return false;

			let newSubstory = JSON.parse(JSON.stringify(substory));
			newSubstory.data.plot.items = response.data.value;
			setSubstory(newSubstory);

			return true;
		} else {
			const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
				story_id: story._id,
				path: ["data", "plot", "clusters", cluster._id, "groups", groupID, "items"],
			});
			if (!response || response?.errors || !response?.data?.value) return false;

			let newCluster = JSON.parse(JSON.stringify(cluster));
			const groupIndex = newCluster.groups.findIndex((e) => e._id === groupID);
			if (groupIndex === -1) return false;
			newCluster.groups[groupIndex].items = response.data.value;
			changeCluster(newCluster);

			return true;
		}
	}

	async function savePlotItems() {
		if (cluster?.isAll) {
			let newSubstory = JSON.parse(JSON.stringify(substory));
			newSubstory.data.plot.items = newSubstory.data.plot.items.map((item) => {
				let newItem = JSON.parse(JSON.stringify(item));
				if (newItem?.isUnsaved) delete newItem.isUnsaved;
				return newItem;
			});

			const response = await APIRequest("/substory/" + substory._id, "PATCH", {
				story_id: story._id,
				path: ["data", "plot", "items"],
				newValue: newSubstory.data.plot.items,
			});
			if (!response || response?.errors) return false;

			setSubstory(newSubstory);
			return true;
		} else {
			let newCluster = JSON.parse(JSON.stringify(cluster));
			const groupIndex = newCluster.groups.findIndex((e) => e._id === groupID);
			if (groupIndex === -1) return false;

			const response = await APIRequest("/substory/" + substory._id, "PATCH", {
				story_id: story._id,
				path: ["data", "plot", "clusters", cluster._id, "groups", groupID, "items"],
				newValue: newCluster.groups[groupIndex].items,
			});
			if (!response || response?.errors) return false;

			changeCluster(newCluster);
			return true;
		}
	}

	async function removePlotItem(itemID) {
		if (cluster?.isAll) {
			let newSubstory = JSON.parse(JSON.stringify(substory));

			const itemIndex = newSubstory.data.plot.items.findIndex((e) => e._id === itemID);
			if (itemIndex !== -1) newSubstory.data.plot.items.splice(itemIndex, 1);

			newSubstory.data.plot.clusters = newSubstory.data.plot.clusters.map((cluster) => {
				let newCluster = JSON.parse(JSON.stringify(cluster));
				if (newCluster?.groups)
					newCluster.groups = newCluster.groups.map((group) => {
						let newGroup = JSON.parse(JSON.stringify(group));
						newGroup.items = newGroup.items.filter((e) => e._id !== itemID);
						return newGroup;
					});
				return newCluster;
			});

			setSubstory(newSubstory);
		} else {
			let newCluster = JSON.parse(JSON.stringify(cluster));
			const groupIndex = newCluster.groups.findIndex((e) => e._id === groupID);
			if (groupIndex === -1) return false;
			newCluster.groups[groupIndex].items = newCluster.groups[groupIndex].items.filter((e) => e !== itemID);
			changeCluster(newCluster);
		}
	}

	const plotItemsContainerRef = useRef();
	useLayoutEffect(() => {
		function onPlotItemsContainerScroll(e) {
			if (plotItemsContainerRef?.current?.scrollTop === 0) return;
			e.stopPropagation();
		}
		const plotItemsContainerRefCurrent = plotItemsContainerRef?.current;
		plotItemsContainerRefCurrent?.addEventListener("wheel", onPlotItemsContainerScroll);
		return () => plotItemsContainerRefCurrent?.removeEventListener("wheel", onPlotItemsContainerScroll);
	}, [plotItemsContainerRef, cluster]);

	return {
		isAuthorizedToEdit,
		substory,
		addPlotItem,
		isReorderingPlotItems,
		toggleIsReorderingPlotItems,
		reorderPlotItems,
		revertPlotItems,
		savePlotItems,
		removePlotItem,
		plotItemsContainerRef,
	};
};
