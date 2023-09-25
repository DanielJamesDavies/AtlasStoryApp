// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { ObjectsContext } from "../../ObjectsContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const ObjectsListCreateObjectLogic = () => {
	const { story_uid, story, isDisplayingCreateObjectForm, setIsDisplayingCreateObjectForm } = useContext(ObjectsContext);

	function closeCreateObjectForm() {
		setIsDisplayingCreateObjectForm(false);
	}

	const [objectUIDSuggestions, setObjectUIDSuggestions] = useState([]);

	function updateObjectUIDSuggestions(newName) {
		let newObjectUIDSuggestions = [];

		newObjectUIDSuggestions.push(newName.toLowerCase().split(" ").join(""));

		const newNameSplitBySpace = newName.split(" ");
		if (newNameSplitBySpace.length > 1) newObjectUIDSuggestions.push(newNameSplitBySpace.join("-").toLowerCase());

		if (newName.toLowerCase() !== newName) newObjectUIDSuggestions.push(newName.split(" ").join(""));

		if (newNameSplitBySpace.length > 1 && newName.toLowerCase() !== newName) newObjectUIDSuggestions.push(newNameSplitBySpace.join("-"));

		setObjectUIDSuggestions(newObjectUIDSuggestions);
	}

	const [objectName, setObjectName] = useState("");
	function changeObjectName(e) {
		setObjectName(e.target.value);
		updateObjectUIDSuggestions(e.target.value);
	}

	const [objectUID, setObjectUID] = useState("");
	function changeObjectUID(e) {
		setObjectUID(e.target.value.split(" ").join("-"));
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateObject() {
		const currStory = JSON.parse(JSON.stringify(story));
		if (!currStory?._id) return;

		const response = await APIRequest("/object", "POST", {
			story_id: currStory._id,
			name: JSON.parse(JSON.stringify(objectName)),
			uid: JSON.parse(JSON.stringify(objectUID)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);
		if (currStory?.uid && response?.data?.object_uid) changeLocation("/s/" + currStory.uid + "/o/" + response.data.object_uid);
	}

	return {
		story_uid,
		isDisplayingCreateObjectForm,
		closeCreateObjectForm,
		objectName,
		changeObjectName,
		objectUID,
		changeObjectUID,
		objectUIDSuggestions,
		errors,
		submitCreateObject,
	};
};
