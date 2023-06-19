// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../../GroupContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const GroupProfileSummaryItemsLogic = () => {
	const { isAuthorizedToEdit, story, group, setGroup } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);

	function changeSummaryItemLabel(e, index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.summaryItems[index].label = e.target.value;
			return newGroup;
		});
	}

	function changeSummaryItemText(e, index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.summaryItems[index].text = e.target.value;
			return newGroup;
		});
	}

	function removeSummaryItem(index) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.summaryItems.splice(index, 1);
			return newGroup;
		});
	}

	function addSummaryItem() {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.summaryItems.push({ label: "", text: "" });
			return newGroup;
		});
	}

	const [isReorderingSummaryItems, setIsReorderingSummaryItems] = useState(false);
	function toggleIsReorderingSummaryItems() {
		setIsReorderingSummaryItems((oldIsReorderingSummaryItems) => !oldIsReorderingSummaryItems);
	}

	async function changeSummaryItemsOrder(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			let tempSummaryItem = newGroup.data.summaryItems.splice(res.from, 1)[0];
			newGroup.data.summaryItems.splice(res.to, 0, tempSummaryItem);
			return newGroup;
		});
	}

	async function revertSummaryItems() {
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "summaryItems"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.summaryItems = response.data.value;
			return newGroup;
		});

		return true;
	}

	async function saveSummaryItems() {
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "summaryItems"],
			newValue: group.data.summaryItems,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		group,
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
