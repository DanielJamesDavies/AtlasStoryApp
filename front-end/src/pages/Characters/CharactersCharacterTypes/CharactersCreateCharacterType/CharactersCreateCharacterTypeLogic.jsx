// Packages
import { useCallback, useContext, useState, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersCreateCharacterTypeLogic = () => {
	const {
		story,
		setStory,
		setStoryCharacterTypes,
		isDisplayingCreateCharacterTypeForm,
		setIsDisplayingCreateCharacterTypeForm,
		createCharacterTypeValues,
	} = useContext(CharactersContext);

	function closeCreateCharacterTypeForm() {
		setIsDisplayingCreateCharacterTypeForm(false);
	}

	const [characterTypeName, setCharacterTypeName] = useState("");
	const changeCharacterTypeName = useCallback(
		(e) => {
			setCharacterTypeName(e.target.value);
		},
		[setCharacterTypeName]
	);

	const [characterTypeColour, setCharacterTypeColour] = useState("#0044ff");
	function changeCharacterTypeColour(new_colour) {
		setCharacterTypeColour(new_colour);
	}

	const { APIRequest } = useContext(APIContext);
	const [errors, setErrors] = useState([]);

	const submitCreateCharacterType = useCallback(
		async (name) => {
			const currStory = JSON.parse(JSON.stringify(story));
			if (!currStory?._id) return;

			const response = await APIRequest("/character-type", "POST", {
				story_id: currStory._id,
				name: name ? name : JSON.parse(JSON.stringify(characterTypeName)),
				colour: JSON.parse(JSON.stringify(characterTypeColour)),
			});
			if (!response) return;
			if (response?.errors) return setErrors(response.errors);

			if (response?.data?.characterType) {
				setStoryCharacterTypes((oldCharacterTypes) => {
					let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
					newCharacterTypes.push(response.data.characterType);
					return newCharacterTypes;
				});
				setIsDisplayingCreateCharacterTypeForm(false);
			}
			setStory((oldStory) => {
				let newStory = JSON.parse(JSON.stringify(oldStory));
				newStory.data.characterTypes.push(response.data.characterType._id);
				return newStory;
			});
		},
		[story, setStory, setStoryCharacterTypes, characterTypeName, characterTypeColour, APIRequest, setIsDisplayingCreateCharacterTypeForm]
	);

	const lastCreateValues = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateValues.current) !== JSON.stringify(createCharacterTypeValues)) {
			lastCreateValues.current = JSON.parse(JSON.stringify(createCharacterTypeValues));
			const name = createCharacterTypeValues?.name;
			if (name) changeCharacterTypeName({ target: { value: name } });
			if (name) {
				submitCreateCharacterType(name);
			}
		}
	}, [createCharacterTypeValues, changeCharacterTypeName, submitCreateCharacterType]);

	return {
		isDisplayingCreateCharacterTypeForm,
		closeCreateCharacterTypeForm,
		characterTypeName,
		changeCharacterTypeName,
		characterTypeColour,
		changeCharacterTypeColour,
		errors,
		submitCreateCharacterType,
	};
};
