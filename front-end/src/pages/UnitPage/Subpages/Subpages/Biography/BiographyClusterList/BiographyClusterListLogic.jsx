// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BiographyClusterListLogic = ({ currBiographyCluster, changeBiographyCluster, switchBiographyCluster }) => {
	const {
		unit_type,
		isAuthorizedToEdit,
		story,
		unit,
		unitVersion,
		changeUnitVersion,
		unitVersionItemCopying,
		changeUnitVersionItemCopying,
		pasteVersionItemCopying,
		subpageContainerRef,
		getSubpageItemTopOffset,
	} = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const [biographyClustersPasted, setBiographyClustersPasted] = useState([]);

	async function addBiographyCluster() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newUnitVersion.biography.push({
			_id: new_id_response.data._id,
			name: "New Biography Cluster",
			items: [],
		});
		changeUnitVersion(newUnitVersion);
	}

	function removeBiographyCluster(e, index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		if (currBiographyCluster?._id === newUnitVersion.biography[index]._id) switchBiographyCluster(newUnitVersion.biography[0]._id);
		newUnitVersion.biography.splice(index, 1);
		changeUnitVersion(newUnitVersion);
	}

	async function defaultBiographyClusters() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const defaultBiographyClustersTitles = ["Strengths", "Flaws & Weaknesses", "Achievements", "Failures", "History", "Arcs", "Plans"];
		let newBiographyClusters = await Promise.all(
			defaultBiographyClustersTitles.map(async (name) => {
				const correspondingItem = newUnitVersion.biography.find((e) => e.name === name);
				if (correspondingItem) return correspondingItem;

				const new_id_response = await APIRequest("/new-id/", "GET");
				if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

				return { _id: new_id_response.data._id, name, items: [] };
			})
		);
		newBiographyClusters = newBiographyClusters.filter((e) => e !== false);
		newBiographyClusters = newBiographyClusters.concat(
			newUnitVersion.biography.filter((e) => !defaultBiographyClustersTitles.includes(e.name))
		);
		newUnitVersion.biography = newBiographyClusters;
		changeUnitVersion(newUnitVersion);
	}

	const [isReorderingBiographyCluster, setIsReorderingBiographyCluster] = useState(false);
	function toggleIsReorderingBiographyClusters() {
		setIsReorderingBiographyCluster((oldIsReorderingBiographyCluster) => !oldIsReorderingBiographyCluster);
	}

	function reorderBiographyCluster(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempBiographyCluster = newUnitVersion.biography.splice(res.from, 1)[0];
		newUnitVersion.biography.splice(res.to, 0, tempBiographyCluster);
		changeUnitVersion(newUnitVersion);
	}

	async function revertBiographyClusters() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "biography"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.biography = response.data.value.map((biographyCluster) => {
			const biographyClusterIndex = newUnitVersion.biography.findIndex((e) => e._id === biographyCluster._id);
			if (biographyClusterIndex !== -1) return newUnitVersion.biography[biographyClusterIndex];
			return biographyCluster;
		});
		changeUnitVersion(newUnitVersion);

		return true;
	}

	async function saveBiographyClusters() {
		if (!unit?._id) return;
		const newUnitVersion = JSON.parse(JSON.stringify(unitVersion));

		let shouldSaveClusterItems = false;

		const newBiographyClustersPasted = JSON.parse(JSON.stringify(biographyClustersPasted));
		const newBiographyClusterPastedIndex = newBiographyClustersPasted?.findIndex((e) => e?.version === newUnitVersion?._id);
		if (newBiographyClusterPastedIndex !== -1) {
			const newBiographyClusterPasted = newBiographyClustersPasted[newBiographyClusterPastedIndex]?.cluster;
			if (JSON.stringify(newBiographyClusterPasted) === JSON.stringify(newUnitVersion?.biography)) {
				shouldSaveClusterItems = true;
			}
		}

		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", newUnitVersion._id, "biography"],
			newValue: newUnitVersion.biography,
			shouldSaveClusterItems,
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

	function copyVersionValue() {
		changeUnitVersionItemCopying(["biography"]);
	}

	function pasteVersionValue() {
		const newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const newBiographyCluster = pasteVersionItemCopying(["biography"]);
		if (newBiographyCluster === false) return false;

		setBiographyClustersPasted((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?.version === newUnitVersion._id);
			if (index === -1) {
				newValue.push({ version: newUnitVersion._id, cluster: JSON.parse(JSON.stringify(newBiographyCluster)) });
			} else {
				newValue[index].cluster = JSON.parse(JSON.stringify(newBiographyCluster));
			}
			return newValue;
		});

		const nextBiographyCluster = newBiographyCluster?.find((e) => e?._id === currBiographyCluster?._id);
		changeBiographyCluster((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			newValue.items = nextBiographyCluster?.items;
			return newValue;
		});
	}

	const biologyClusterListRef = useRef();
	useEffect(() => {
		async function getBiologyClusterListTopOffset(e) {
			if (biologyClusterListRef?.current) {
				if (window?.innerWidth > 750) {
					biologyClusterListRef.current.style.marginTop =
						getSubpageItemTopOffset(biologyClusterListRef?.current?.clientHeight, e?.deltaY || 0) + "px";
				} else {
					biologyClusterListRef.current.style.marginTop = "0px";
				}
			}
		}
		getBiologyClusterListTopOffset();
		const subpageContainerRefCurrent = subpageContainerRef?.current;
		if (subpageContainerRefCurrent) subpageContainerRefCurrent?.addEventListener("scroll", getBiologyClusterListTopOffset);
		return () => subpageContainerRefCurrent?.removeEventListener("scroll", getBiologyClusterListTopOffset);
	}, [currBiographyCluster, subpageContainerRef, biologyClusterListRef, getSubpageItemTopOffset]);

	return {
		isAuthorizedToEdit,
		unitVersion,
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
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue,
		biologyClusterListRef,
	};
};
