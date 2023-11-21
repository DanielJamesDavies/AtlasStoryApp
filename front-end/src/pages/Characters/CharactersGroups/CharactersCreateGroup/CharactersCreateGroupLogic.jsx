// Packages
import { useCallback, useContext, useState, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersCreateGroupLogic = () => {
	const { story_uid, story, setStory, setStoryGroups, isDisplayingCreateGroupForm, setIsDisplayingCreateGroupForm, createGroupValues } =
		useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

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
	const changeGroupName = useCallback((e) => {
		console.log(e?.target?.value);
		setGroupName(e.target.value);
		updateGroupUIDSuggestions(e.target.value);
	}, []);

	const [groupUID, setGroupUID] = useState("");
	const changeGroupUID = useCallback((e) => {
		setGroupUID(e.target.value.split(" ").join("-").replaceAll("/", ""));
	}, []);

	const [errors, setErrors] = useState([]);

	const submitCreateGroup = useCallback(
		async (name, uid) => {
			const currStory = JSON.parse(JSON.stringify(story));
			if (!currStory?._id) return false;

			const response = await APIRequest("/group", "POST", {
				story_id: currStory._id,
				name: name ? name : JSON.parse(JSON.stringify(groupName)),
				uid: uid ? uid : JSON.parse(JSON.stringify(groupUID)),
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
		},
		[
			story,
			APIRequest,
			groupName,
			groupUID,
			setIsDisplayingCreateGroupForm,
			setGroupUIDSuggestions,
			setGroupName,
			setGroupUID,
			setErrors,
			setStory,
			setStoryGroups,
		]
	);

	const lastCreateValues = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateValues.current) !== JSON.stringify(createGroupValues)) {
			lastCreateValues.current = JSON.parse(JSON.stringify(createGroupValues));
			const name = createGroupValues?.name;
			const uid = createGroupValues?.uid;
			if (name) changeGroupName({ target: { value: name } });
			if (uid) changeGroupUID({ target: { value: uid } });
			if (name && uid) {
				submitCreateGroup(name, uid);
			}
		}
	}, [createGroupValues, changeGroupName, changeGroupUID, submitCreateGroup]);

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
