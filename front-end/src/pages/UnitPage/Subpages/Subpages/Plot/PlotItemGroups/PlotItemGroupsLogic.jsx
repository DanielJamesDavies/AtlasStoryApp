// Packages
import { useContext, useState, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PlotItemGroupsLogic = ({ currGroupID, cluster, changeCluster, setGroupID, setIsDisplayingItemGroups }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, subpageContainerRef, getSubpageItemTopOffset } = useContext(UnitPageContext);
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
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "plot", "clusters", cluster?._id, "groups"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newCluster = JSON.parse(JSON.stringify(cluster));
		newCluster.groups = response?.data?.value.map((group) => {
			let newGroup = JSON.parse(JSON.stringify(group));
			const groupIndex = newCluster.groups.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
			if (groupIndex !== -1) newGroup.items = newCluster.groups[groupIndex].items;
			return newGroup;
		});
		changeCluster(newCluster);

		return true;
	}

	async function saveItemGroups() {
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
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
	useEffect(() => {
		async function getTopOffset(e) {
			if (plotItemGroupsRef?.current) {
				if (window?.innerWidth > 750) {
					plotItemGroupsRef.current.style.marginTop =
						getSubpageItemTopOffset(plotItemGroupsRef?.current?.clientHeight, e?.deltaY || 0) + "px";
				} else {
					plotItemGroupsRef.current.style.marginTop = "0px";
				}
			}
		}
		getTopOffset();
		const subpageContainerRefCurrent = subpageContainerRef?.current;
		if (subpageContainerRefCurrent) subpageContainerRefCurrent?.addEventListener("scroll", getTopOffset);
		return () => subpageContainerRefCurrent?.removeEventListener("scroll", getTopOffset);
	}, [cluster, currGroupID, subpageContainerRef, plotItemGroupsRef, getSubpageItemTopOffset]);

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
	};
};
