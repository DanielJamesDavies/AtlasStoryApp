// Packages
import { useCallback, useContext, useState, useEffect, useRef } from "react";

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
	const { story_uid, story, isDisplayingCreateObjectForm, setIsDisplayingCreateObjectForm, createObjectsValues } = useContext(ObjectsContext);

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
	const changeObjectName = useCallback((e) => {
		setObjectName(e.target.value);
		updateObjectUIDSuggestions(e.target.value);
	}, []);

	const [objectUID, setObjectUID] = useState("");
	const changeObjectUID = useCallback((e) => {
		setObjectUID(e.target.value.split(" ").join("-").replaceAll("/", ""));
	}, []);

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	const submitCreateObject = useCallback(
		async (name, uid) => {
			const currStory = JSON.parse(JSON.stringify(story));
			if (!currStory?._id) return;

			const response = await APIRequest("/object", "POST", {
				story_id: currStory._id,
				name: name ? name : JSON.parse(JSON.stringify(objectName)),
				uid: uid ? uid : JSON.parse(JSON.stringify(objectUID)),
			});
			if (!response) return;
			if (response?.errors) return setErrors(response.errors);
			if (currStory?.uid && response?.data?.object_uid) changeLocation("/s/" + currStory.uid + "/o/" + response.data.object_uid);
		},
		[story, APIRequest, objectName, objectUID, setErrors, changeLocation]
	);

	const lastCreateValues = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateValues.current) !== JSON.stringify(createObjectsValues)) {
			lastCreateValues.current = JSON.parse(JSON.stringify(createObjectsValues));
			const name = createObjectsValues?.name;
			const uid = createObjectsValues?.uid;
			if (name) changeObjectName({ target: { value: name } });
			if (uid) changeObjectUID({ target: { value: uid } });
			if (name) {
				submitCreateObject(name, uid);
			}
		}
	}, [createObjectsValues, changeObjectName, changeObjectUID, submitCreateObject]);

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
