// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharacterProfileSummaryItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeSummaryItemLabel(e, index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.summaryItems[index].label = e.target.value;
			return newCharacter;
		});
	}

	function changeSummaryItemText(e, index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.summaryItems[index].text = e.target.value;
			return newCharacter;
		});
	}

	function removeSummaryItem(index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.summaryItems.splice(index, 1);
			return newCharacter;
		});
	}

	function addSummaryItem() {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.summaryItems.push({ label: "", text: "" });
			return newCharacter;
		});
	}

	const [isReorderingSummaryItems, setIsReorderingSummaryItems] = useState(false);
	function toggleIsReorderingSummaryItems() {
		setIsReorderingSummaryItems((oldIsReorderingSummaryItems) => !oldIsReorderingSummaryItems);
	}

	async function changeSummaryItemsOrder(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			let tempSummaryItem = newCharacter.data.summaryItems.splice(res.from, 1)[0];
			newCharacter.data.summaryItems.splice(res.to, 0, tempSummaryItem);
			return newCharacter;
		});
	}

	async function revertSummaryItems() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "summaryItems"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.summaryItems = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveSummaryItems() {
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "summaryItems"],
			newValue: character.data.summaryItems,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		character,
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
