// Packages
import { useContext, useState, useRef, useLayoutEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";
import { LightboxContext } from "../../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const PlotItemsLogic = ({ cluster, changeCluster, groupID }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, unitImages } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	async function addPlotItem() {
		let newUnit = JSON.parse(JSON.stringify(unit));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newUnit.data.plot.items.push({ _id: new_id_response.data._id, name: "New Plot Item", text: [""], images: [], isUnsaved: true });
		setUnit(newUnit);
	}

	const [isReorderingPlotItems, setIsReorderingPlotItems] = useState(false);
	function toggleIsReorderingPlotItems() {
		setIsReorderingPlotItems((oldIsReorderingPlotItems) => !oldIsReorderingPlotItems);
	}

	function reorderPlotItems(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newUnit = JSON.parse(JSON.stringify(unit));
		const tempPlotItem = newUnit.data.plot.items.splice(res.from, 1)[0];
		newUnit.data.plot.items.splice(res.to, 0, tempPlotItem);
		setUnit(newUnit);
	}

	async function revertPlotItems() {
		if (cluster?.isAll) {
			const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
				story_id: story._id,
				path: ["data", "plot", "items"],
			});
			if (!response || response?.errors || response?.data?.value === undefined) return false;

			let newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.plot.items = response.data.value;
			setUnit(newUnit);

			return true;
		} else {
			const group_items_response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
				story_id: story._id,
				path: ["data", "plot", "clusters", cluster._id, "groups", groupID, "items"],
			});
			if (!group_items_response || group_items_response?.errors || !group_items_response?.data?.value) return false;

			let newCluster = JSON.parse(JSON.stringify(cluster));
			const groupIndex = newCluster.groups.findIndex((e) => e._id === groupID);
			if (groupIndex === -1) return false;
			newCluster.groups[groupIndex].items = group_items_response.data.value;
			changeCluster(newCluster);

			const items_response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
				story_id: story._id,
				path: ["data", "plot", "items"],
			});
			if (!items_response || items_response?.errors || !items_response?.data?.value) return false;

			let newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.plot.items = newUnit.data.plot.items.map((item) => {
				return group_items_response.data.value.findIndex((e) => e === item._id) === -1 ||
					items_response.data.value.findIndex((e) => e._id === item._id) === -1
					? item
					: items_response.data.value.find((e) => e._id === item._id);
			});
			setUnit(newUnit);

			return true;
		}
	}

	async function savePlotItems() {
		if (cluster?.isAll) {
			let newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.plot.items = newUnit.data.plot.items.map((item) => {
				let newItem = JSON.parse(JSON.stringify(item));
				if (newItem?.isUnsaved) delete newItem.isUnsaved;
				return newItem;
			});

			const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
				story_id: story._id,
				path: ["data", "plot", "items"],
				newValue: newUnit.data.plot.items,
			});
			console.log(response);
			if (!response || response?.errors) return false;

			setUnit(newUnit);
			return true;
		} else {
			let newUnit = JSON.parse(JSON.stringify(unit));
			let newCluster = JSON.parse(JSON.stringify(cluster));
			const groupIndex = newCluster.groups.findIndex((e) => e._id === groupID);
			if (groupIndex === -1) return false;

			const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
				story_id: story._id,
				path: ["data", "plot", "clusters", newCluster._id, "groups", groupID, "items"],
				newValue: { itemIDs: newCluster.groups[groupIndex].items, items: newUnit.data.plot.items },
			});
			if (!response || response?.errors) return false;

			return true;
		}
	}

	async function removePlotItem(itemID) {
		if (cluster?.isAll) {
			let newUnit = JSON.parse(JSON.stringify(unit));

			const itemIndex = newUnit.data.plot.items.findIndex((e) => e._id === itemID);
			if (itemIndex !== -1) newUnit.data.plot.items.splice(itemIndex, 1);

			newUnit.data.plot.clusters = newUnit.data.plot.clusters.map((cluster) => {
				let newCluster = JSON.parse(JSON.stringify(cluster));
				if (newCluster?.groups)
					newCluster.groups = newCluster.groups.map((group) => {
						let newGroup = JSON.parse(JSON.stringify(group));
						newGroup.items = newGroup.items.filter((e) => e._id !== itemID);
						return newGroup;
					});
				return newCluster;
			});

			setUnit(newUnit);
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

	const plotItemsListRef = useRef();
	function onPlotItemsListContainerScroll(e) {
		if (
			Math.sign(e.deltaY) === 1 &&
			plotItemsContainerRef?.current?.scrollTop !== undefined &&
			plotItemsContainerRef?.current?.scrollTop !==
				plotItemsContainerRef?.current?.scrollHeight - plotItemsContainerRef?.current?.clientHeight
		) {
			plotItemsContainerRef.current.scrollTop = plotItemsContainerRef?.current?.scrollHeight - plotItemsContainerRef?.current?.clientHeight;
			return;
		}

		if (plotItemsListRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	const [unitImagesCurrPlotItemID, setUnitImagesCurrPlotItemID] = useState(-1);
	function openUnitImages(index) {
		setUnitImagesCurrPlotItemID(index);
	}

	function closeUnitImages() {
		setUnitImagesCurrPlotItemID(-1);
	}

	function addImageToPlotItem(image_id) {
		const newUnitImagesCurrPlotItemID = JSON.parse(JSON.stringify(unitImagesCurrPlotItemID));
		let newUnit = JSON.parse(JSON.stringify(unit));
		const plotItemIndex = newUnit.data.plot.items.findIndex((e) => e?._id === newUnitImagesCurrPlotItemID);
		if (plotItemIndex === -1) return false;
		if (newUnit.data.plot.items[plotItemIndex].images.findIndex((e) => e.image === image_id) !== -1) return false;
		newUnit.data.plot.items[plotItemIndex].images.push({ image: image_id, caption: "" });
		setUnit(newUnit);
	}

	function onPlotItemImageClick(item_id, image_index) {
		const plotItemIndex = unit.data.plot.items.findIndex((e) => e?._id === item_id);
		if (plotItemIndex === -1) return false;
		setLightboxImageIDs(unit.data.plot.items[plotItemIndex].images);
		setLightboxIndex(image_index);
	}

	return {
		isAuthorizedToEdit,
		unit,
		addPlotItem,
		isReorderingPlotItems,
		toggleIsReorderingPlotItems,
		reorderPlotItems,
		revertPlotItems,
		savePlotItems,
		removePlotItem,
		plotItemsContainerRef,
		plotItemsListRef,
		onPlotItemsListContainerScroll,
		unitImagesCurrPlotItemID,
		openUnitImages,
		closeUnitImages,
		addImageToPlotItem,
		unitImages,
		onPlotItemImageClick,
	};
};
