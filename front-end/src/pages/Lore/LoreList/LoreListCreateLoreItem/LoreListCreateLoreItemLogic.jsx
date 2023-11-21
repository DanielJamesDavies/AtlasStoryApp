// Packages
import { useCallback, useContext, useState, useRef, useEffect } from "react";

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
	const { story_uid, story, isDisplayingCreateLoreItemForm, setIsDisplayingCreateLoreItemForm, createLoreItemValues } = useContext(LoreContext);

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
	const changeLoreItemName = useCallback((e) => {
		setLoreItemName(e.target.value);
		updateLoreItemUIDSuggestions(e.target.value);
	}, []);

	const [loreItemUID, setLoreItemUID] = useState("");
	const changeLoreItemUID = useCallback((e) => {
		setLoreItemUID(e.target.value.split(" ").join("-"));
	}, []);

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	const submitCreateLoreItem = useCallback(
		async (name, uid) => {
			const currStory = JSON.parse(JSON.stringify(story));
			if (!currStory?._id) return;

			const response = await APIRequest("/lore", "POST", {
				story_id: currStory._id,
				name: name ? name : JSON.parse(JSON.stringify(loreItemName)),
				uid: uid ? uid : JSON.parse(JSON.stringify(loreItemUID)),
			});
			if (!response) return;
			if (response?.errors) return setErrors(response.errors);
			if (currStory?.uid && response?.data?.lore_item_uid) changeLocation("/s/" + currStory.uid + "/w/" + response.data.lore_item_uid);
		},
		[story, APIRequest, loreItemName, loreItemUID, setErrors, changeLocation]
	);

	const lastCreateValues = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateValues.current) !== JSON.stringify(createLoreItemValues)) {
			lastCreateValues.current = JSON.parse(JSON.stringify(createLoreItemValues));
			const name = createLoreItemValues?.name;
			const uid = createLoreItemValues?.uid;
			if (name) changeLoreItemName({ target: { value: name } });
			if (uid) changeLoreItemUID({ target: { value: uid } });
			if (name && uid) {
				submitCreateLoreItem(name, uid);
			}
		}
	}, [createLoreItemValues, changeLoreItemName, changeLoreItemUID, submitCreateLoreItem]);

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
