// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { LoreContext } from "../../LoreContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const LoreListCreateLoreItemLogic = () => {
	const { story_uid, story, isDisplayingCreateLoreItemForm, setIsDisplayingCreateLoreItemForm } = useContext(LoreContext);

	function closeCreateLoreItemForm() {
		setIsDisplayingCreateLoreItemForm(false);
	}

	const [loreItemUIDSuggestions, setLoreItemUIDSuggestions] = useState([]);

	function updateLoreItemUIDSuggestions(newName) {
		let newLoreItemUIDSuggestions = [];

		newLoreItemUIDSuggestions.push(newName.toLowerCase().split(" ").join(""));

		const newNameSplitBySpace = newName.split(" ");
		if (newNameSplitBySpace.length > 1) newLoreItemUIDSuggestions.push(newNameSplitBySpace.join("-").toLowerCase());

		if (newName.toLowerCase() !== newName) newLoreItemUIDSuggestions.push(newName.split(" ").join(""));

		if (newNameSplitBySpace.length > 1 && newName.toLowerCase() !== newName) newLoreItemUIDSuggestions.push(newNameSplitBySpace.join("-"));

		setLoreItemUIDSuggestions(newLoreItemUIDSuggestions);
	}

	const [loreItemName, setLoreItemName] = useState("");
	function changeLoreItemName(e) {
		setLoreItemName(e.target.value);
		updateLoreItemUIDSuggestions(e.target.value);
	}

	const [loreItemUID, setLoreItemUID] = useState("");
	function changeLoreItemUID(e) {
		setLoreItemUID(e.target.value.split(" ").join("-"));
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateLoreItem() {
		const currStory = JSON.parse(JSON.stringify(story));
		if (!currStory?._id) return;

		const response = await APIRequest("/lore", "POST", {
			story_id: currStory._id,
			name: JSON.parse(JSON.stringify(loreItemName)),
			uid: JSON.parse(JSON.stringify(loreItemUID)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);
		if (currStory?.uid && response?.data?.lore_item_uid) changeLocation("/s/" + currStory.uid + "/w/" + response.data.lore_item_uid);
	}

	return {
		story_uid,
		isDisplayingCreateLoreItemForm,
		closeCreateLoreItemForm,
		loreItemName,
		changeLoreItemName,
		loreItemUID,
		changeLoreItemUID,
		loreItemUIDSuggestions,
		errors,
		submitCreateLoreItem,
	};
};
