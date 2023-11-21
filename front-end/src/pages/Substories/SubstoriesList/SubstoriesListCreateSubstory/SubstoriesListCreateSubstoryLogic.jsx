// Packages
import { useCallback, useContext, useState, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../../SubstoriesContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SubstoriesListCreateSubstoryLogic = () => {
	const { story_uid, story, isDisplayingCreateSubstoryForm, setIsDisplayingCreateSubstoryForm, createSubstoryValues } =
		useContext(SubstoriesContext);

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
	const changeSubstoryTitle = useCallback((e) => {
		setSubstoryTitle(e.target.value);
		updateSubstoryUIDSuggestions(e.target.value);
	}, []);

	const [substoryUID, setSubstoryUID] = useState("");
	const changeSubstoryUID = useCallback((e) => {
		setSubstoryUID(e.target.value.split(" ").join("-").replaceAll("/", ""));
	}, []);

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	const submitCreateSubstory = useCallback(
		async (name, uid) => {
			const currStory = JSON.parse(JSON.stringify(story));
			if (!currStory?._id) return;

			const response = await APIRequest("/plot", "POST", {
				story_id: currStory._id,
				title: name ? name : JSON.parse(JSON.stringify(substoryTitle)),
				uid: uid ? uid : JSON.parse(JSON.stringify(substoryUID)),
			});
			if (!response) return;
			if (response?.errors) return setErrors(response.errors);
			if (currStory?.uid && response?.data?.substory_uid) changeLocation("/s/" + currStory.uid + "/p/" + response.data.substory_uid);
		},
		[story, APIRequest, substoryTitle, substoryUID, setErrors, changeLocation]
	);

	const lastCreateValues = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateValues.current) !== JSON.stringify(createSubstoryValues)) {
			lastCreateValues.current = JSON.parse(JSON.stringify(createSubstoryValues));
			const name = createSubstoryValues?.name;
			const uid = createSubstoryValues?.uid;
			if (name) changeSubstoryTitle({ target: { value: name } });
			if (uid) changeSubstoryUID({ target: { value: uid } });
			if (name && uid) {
				submitCreateSubstory(name, uid);
			}
		}
	}, [createSubstoryValues, changeSubstoryTitle, changeSubstoryUID, submitCreateSubstory]);

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
