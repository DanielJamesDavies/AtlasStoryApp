// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const SummaryItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeSummaryItemLabel(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.summaryItems[index].label = e.target.value;
			return newUnit;
		});
	}

	function changeSummaryItemText(e, index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.summaryItems[index].text = e.target.value;
			return newUnit;
		});
	}

	function removeSummaryItem(index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.summaryItems.splice(index, 1);
			return newUnit;
		});
	}

	function addSummaryItem() {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.summaryItems.push({ label: "", text: "" });
			return newUnit;
		});
	}

	const [isReorderingSummaryItems, setIsReorderingSummaryItems] = useState(false);
	function toggleIsReorderingSummaryItems() {
		setIsReorderingSummaryItems((oldIsReorderingSummaryItems) => !oldIsReorderingSummaryItems);
	}

	async function changeSummaryItemsOrder(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			let tempSummaryItem = newUnit.data.summaryItems.splice(res.from, 1)[0];
			newUnit.data.summaryItems.splice(res.to, 0, tempSummaryItem);
			return newUnit;
		});
	}

	async function revertSummaryItems() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "summaryItems"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.summaryItems = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveSummaryItems() {
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "summaryItems"],
			newValue: unit.data.summaryItems,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		unit,
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
