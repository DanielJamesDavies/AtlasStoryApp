// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PsychologyItemsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion, changeUnitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changePsychologyItemTitle(e, index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.psychology.items[index].title = e.target.value;
		changeUnitVersion(newUnitVersion);
	}

	function changePsychologyItemText(e, index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.psychology.items[index].text = e.target.value.split("\n");
		changeUnitVersion(newUnitVersion);
	}

	function addPsychologyItem() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.psychology.items.push({ title: "", text: [""] });
		changeUnitVersion(newUnitVersion);
	}

	function removePsychologyItem(index) {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.psychology.items.splice(index, 1);
		changeUnitVersion(newUnitVersion);
	}

	function defaultPsychologyItems() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
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
			"Work Ethic",
			"Favourite Music Genres",
		];
		let newPsychologyItems = defaultPsychologyItemsTitles.map((title) => {
			const correspondingItem = newUnitVersion.psychology.items.find((e) => e.title === title);
			if (correspondingItem) return correspondingItem;
			return { title, text: [""] };
		});
		newPsychologyItems = newPsychologyItems.concat(
			newUnitVersion.psychology.items.filter((e) => !defaultPsychologyItemsTitles.includes(e.title))
		);
		newUnitVersion.psychology.items = newPsychologyItems;
		changeUnitVersion(newUnitVersion);
	}

	const [isReorderingPsychologyItems, setIsReorderingPsychologyItems] = useState(false);
	function toggleIsReorderingPsychologyItems() {
		setIsReorderingPsychologyItems((oldIsReorderingPsychologyItems) => !oldIsReorderingPsychologyItems);
	}

	function reorderPsychologyItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempPsychologyItem = newUnitVersion.psychology.items.splice(res.from, 1)[0];
		newUnitVersion.psychology.items.splice(res.to, 0, tempPsychologyItem);
		changeUnitVersion(newUnitVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertPsychologyItems() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "psychology", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.psychology.items = response.data.value;
		changeUnitVersion(newUnitVersion);

		return true;
	}

	async function savePsychologyItems() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "psychology", "items"],
			newValue: unitVersion.psychology.items,
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
		unitVersion,
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
