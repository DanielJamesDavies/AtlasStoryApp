// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const SubstoryOverviewSummaryItemsLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeSummaryItemLabel(e, index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.summaryItems[index].label = e.target.value;
			return newSubstory;
		});
	}

	function changeSummaryItemText(e, index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.summaryItems[index].text = e.target.value;
			return newSubstory;
		});
	}

	function removeSummaryItem(index) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.summaryItems.splice(index, 1);
			return newSubstory;
		});
	}

	function addSummaryItem() {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.summaryItems.push({ label: "", text: "" });
			return newSubstory;
		});
	}

	const [isReorderingSummaryItems, setIsReorderingSummaryItems] = useState(false);
	function toggleIsReorderingSummaryItems() {
		setIsReorderingSummaryItems((oldIsReorderingSummaryItems) => !oldIsReorderingSummaryItems);
	}

	async function changeSummaryItemsOrder(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			let tempSummaryItem = newSubstory.data.summaryItems.splice(res.from, 1)[0];
			newSubstory.data.summaryItems.splice(res.to, 0, tempSummaryItem);
			return newSubstory;
		});
	}

	async function revertSummaryItems() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "summaryItems"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.summaryItems = response.data.value;
			return newSubstory;
		});

		return true;
	}

	async function saveSummaryItems() {
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "summaryItems"],
			newValue: substory.data.summaryItems,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		substory,
		changeSummaryItemLabel,
		changeSummaryItemText,
		removeSummaryItem,
		addSummaryItem,
		isReorderingSummaryItems,
		toggleIsReorderingSummaryItems,
		changeSummaryItemsOrder,
		revertSummaryItems,
		saveSummaryItems,
	};
};
