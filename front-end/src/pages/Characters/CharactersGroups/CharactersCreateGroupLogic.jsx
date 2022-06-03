// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CharactersCreateGroupLogic = () => {
	const { story, isDisplayingCreateGroupForm, setIsDisplayingCreateGroupForm } = useContext(CharactersContext);

	function closeCreateGroupForm() {
		setIsDisplayingCreateGroupForm(false);
	}

	const [groupName, setGroupName] = useState("");
	function changeGroupName(e) {
		setGroupName(e.target.value);
	}

	const [groupURL, setGroupURL] = useState("");
	function changeGroupURL(e) {
		setGroupURL(e.target.value);
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateGroup() {
		const currStory = JSON.parse(JSON.stringify(story));
		if (!currStory?._id) return;

		const response = await APIRequest("/group", "POST", {
			story_id: currStory._id,
			name: JSON.parse(JSON.stringify(groupName)),
			url: JSON.parse(JSON.stringify(groupURL)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);
		if (currStory?.url && response?.data?.groupURL) changeLocation("/s/" + currStory.url + "/g/" + response.data.groupURL);
	}

	return {
		isDisplayingCreateGroupForm,
		closeCreateGroupForm,
		groupName,
		changeGroupName,
		groupURL,
		changeGroupURL,
		errors,
		submitCreateGroup,
	};
};
