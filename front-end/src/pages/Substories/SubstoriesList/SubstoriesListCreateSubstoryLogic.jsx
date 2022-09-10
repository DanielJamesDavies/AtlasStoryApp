// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../SubstoriesContext";
import { APIContext } from "../../../context/APIContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SubstoriesListCreateSubstoryLogic = () => {
	const { story_uid, story, isDisplayingCreateSubstoryForm, setIsDisplayingCreateSubstoryForm } = useContext(SubstoriesContext);

	function closeCreateSubstoryForm() {
		setIsDisplayingCreateSubstoryForm(false);
	}

	const [substoryUIDSuggestions, setSubstoryUIDSuggestions] = useState([]);

	function updateSubstoryUIDSuggestions(newTitle) {
		let newSubstoryUIDSuggestions = [];

		newSubstoryUIDSuggestions.push(newTitle.toLowerCase().split(" ").join(""));

		const newTitleSplitBySpace = newTitle.split(" ");
		if (newTitleSplitBySpace.length > 1) newSubstoryUIDSuggestions.push(newTitleSplitBySpace.join("-").toLowerCase());

		if (newTitle.toLowerCase() !== newTitle) newSubstoryUIDSuggestions.push(newTitle.split(" ").join(""));

		if (newTitleSplitBySpace.length > 1 && newTitle.toLowerCase() !== newTitle) newSubstoryUIDSuggestions.push(newTitleSplitBySpace.join("-"));

		setSubstoryUIDSuggestions(newSubstoryUIDSuggestions);
	}

	const [substoryTitle, setSubstoryTitle] = useState("");
	function changeSubstoryTitle(e) {
		setSubstoryTitle(e.target.value);
		updateSubstoryUIDSuggestions(e.target.value);
	}

	const [substoryUID, setSubstoryUID] = useState("");
	function changeSubstoryUID(e) {
		setSubstoryUID(e.target.value.split(" ").join("-"));
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateSubstory() {
		const currStory = JSON.parse(JSON.stringify(story));
		if (!currStory?._id) return;

		const response = await APIRequest("/substory", "POST", {
			story_id: currStory._id,
			title: JSON.parse(JSON.stringify(substoryTitle)),
			uid: JSON.parse(JSON.stringify(substoryUID)),
		});
		if (!response) return;
		console.log(response);
		if (response?.errors) return setErrors(response.errors);
		if (currStory?.uid && response?.data?.substory_uid) changeLocation("/s/" + currStory.uid + "/s/" + response.data.substory_uid);
	}

	return {
		story_uid,
		isDisplayingCreateSubstoryForm,
		closeCreateSubstoryForm,
		substoryTitle,
		changeSubstoryTitle,
		substoryUID,
		changeSubstoryUID,
		substoryUIDSuggestions,
		errors,
		submitCreateSubstory,
	};
};
