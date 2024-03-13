// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersGroupLogic = () => {
	const { story, group, setIsDisplayingCreateCharacterForm } = useContext(CharactersContext);
	const { authorized_user_id } = useContext(APIContext);

	function openCreateCharacterForm() {
		setIsDisplayingCreateCharacterForm(true);
	}

	return { authorized_user_id, story, group, openCreateCharacterForm };
};
