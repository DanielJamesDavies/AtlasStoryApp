// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersCreateGroupLogic = () => {
	const { story_uid, story, setStory, setStoryGroups, isDisplayingCreateGroupForm, setIsDisplayingCreateGroupForm } =
		useContext(CharactersContext);

	function closeCreateGroupForm() {
		setIsDisplayingCreateGroupForm(false);
	}

	const [groupUIDSuggestions, setGroupUIDSuggestions] = useState([]);

	function updateGroupUIDSuggestions(newName) {
		let newGroupUIDSuggestions = [];

		newGroupUIDSuggestions.push(newName.toLowerCase().split(" ").join(""));

		const newNameSplitBySpace = newName.split(" ");
		if (newNameSplitBySpace.length > 1) newGroupUIDSuggestions.push(newNameSplitBySpace.join("-").toLowerCase());

		if (newName.toLowerCase() !== newName) newGroupUIDSuggestions.push(newName.split(" ").join(""));

		if (newNameSplitBySpace.length > 1 && newName.toLowerCase() !== newName) newGroupUIDSuggestions.push(newNameSplitBySpace.join("-"));

		setGroupUIDSuggestions(newGroupUIDSuggestions);
	}

	const [groupName, setGroupName] = useState("");
	function changeGroupName(e) {
		setGroupName(e.target.value);
		updateGroupUIDSuggestions(e.target.value);
	}

	const [groupUID, setGroupUID] = useState("");
	function changeGroupUID(e) {
		setGroupUID(e.target.value.split(" ").join("-"));
	}

	const { APIRequest } = useContext(APIContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateGroup() {
		const currStory = JSON.parse(JSON.stringify(story));
		if (!currStory?._id) return false;

		const response = await APIRequest("/group", "POST", {
			story_id: currStory._id,
			name: JSON.parse(JSON.stringify(groupName)),
			uid: JSON.parse(JSON.stringify(groupUID)),
		});
		if (response?.errors) return setErrors(response.errors);
		if (!response || !response?.data?.group?._id) return false;

		setIsDisplayingCreateGroupForm(false);
		setGroupUIDSuggestions([]);
		setGroupName("");
		setGroupUID("");
		setErrors([]);

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			if (!newStory.data.groups) newStory.data.groups = [];
			newStory.data.groups.push(response?.data?.group?._id);
			return newStory;
		});

		setStoryGroups((oldStoryGroups) => {
			let newStoryGroups = JSON.parse(JSON.stringify(oldStoryGroups));
			newStoryGroups.push(response?.data?.group);
			return newStoryGroups;
		});
	}

	return {
		story_uid,
		isDisplayingCreateGroupForm,
		closeCreateGroupForm,
		groupName,
		changeGroupName,
		groupUID,
		changeGroupUID,
		groupUIDSuggestions,
		errors,
		submitCreateGroup,
	};
};
