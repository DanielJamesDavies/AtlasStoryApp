// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PsychologyItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changePsychologyItemTitle(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items[index].title = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	function changePsychologyItemText(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items[index].text = e.target.value.split("\n");
		changeCharacterVersion(newCharacterVersion);
	}

	function addPsychologyItem() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items.push({ title: "", text: [""] });
		changeCharacterVersion(newCharacterVersion);
	}

	function removePsychologyItem(index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items.splice(index, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	function defaultPsychologyItems() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const defaultPsychologyItemsTitles = [
			"Psychological Description",
			"Psychological Descriptives",
			"Primary Motivation",
			"Intelligence",
			"Philosophies",
			"Goals",
			"Fears",
			"Habits",
			"Sayings",
			"Other Idiosyncrasies",
			"Likes",
			"Dislikes",
			"Hobbies",
			"Love Languages",
			"Favourite Music Genres",
		];
		let newPsychologyItems = defaultPsychologyItemsTitles.map((title) => {
			const correspondingItem = newCharacterVersion.psychology.items.find((e) => e.title === title);
			if (correspondingItem) return correspondingItem;
			return { title, text: [""] };
		});
		newPsychologyItems = newPsychologyItems.concat(
			newCharacterVersion.psychology.items.filter((e) => !defaultPsychologyItemsTitles.includes(e.title))
		);
		newCharacterVersion.psychology.items = newPsychologyItems;
		changeCharacterVersion(newCharacterVersion);
	}

	const [isReorderingPsychologyItems, setIsReorderingPsychologyItems] = useState(false);
	function toggleIsReorderingPsychologyItems() {
		setIsReorderingPsychologyItems((oldIsReorderingPsychologyItems) => !oldIsReorderingPsychologyItems);
	}

	function reorderPsychologyItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempPsychologyItem = newCharacterVersion.psychology.items.splice(res.from, 1)[0];
		newCharacterVersion.psychology.items.splice(res.to, 0, tempPsychologyItem);
		changeCharacterVersion(newCharacterVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertPsychologyItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "psychology", "items"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items = response.data.value;
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function savePsychologyItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "psychology", "items"],
			newValue: characterVersion.psychology.items,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const psychologyItemsRef = useRef();
	function onPsychologyItemsContainerScroll(e) {
		if (psychologyItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		characterVersion,
		changePsychologyItemTitle,
		changePsychologyItemText,
		addPsychologyItem,
		removePsychologyItem,
		defaultPsychologyItems,
		isReorderingPsychologyItems,
		toggleIsReorderingPsychologyItems,
		reorderPsychologyItems,
		revertPsychologyItems,
		savePsychologyItems,
		errors,
		psychologyItemsRef,
		onPsychologyItemsContainerScroll,
	};
};
