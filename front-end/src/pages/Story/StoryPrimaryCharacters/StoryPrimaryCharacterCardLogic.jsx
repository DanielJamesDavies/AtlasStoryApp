// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const StoryPrimaryCharacterCardLogic = ({ character }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { story } = useContext(StoryContext);

	function navigateToCharacter() {
		changeLocation("s/" + story.url + "/c/" + character.url);
	}

	const [storyPrimaryCharacterCardStyles, setStoryPrimaryCharacterCardStyles] = useState({});
	const [storyPrimaryCharacterCardTopNameStyles, setStoryPrimaryCharacterCardTopNameStyles] = useState({});
	const [storyPrimaryCharacterCardInfoItemStyles, setStoryPrimaryCharacterCardInfoItemStyles] = useState({});

	useEffect(() => {
		setStoryPrimaryCharacterCardStyles(character?.data?.colour ? { borderColor: character.data.colour } : {});
		setStoryPrimaryCharacterCardTopNameStyles(character?.data?.colour ? { color: character.data.colour } : {});
		setStoryPrimaryCharacterCardInfoItemStyles(character?.data?.colour ? { background: character.data.colour } : {});
	}, [character, setStoryPrimaryCharacterCardStyles]);

	return {
		navigateToCharacter,
		storyPrimaryCharacterCardStyles,
		storyPrimaryCharacterCardTopNameStyles,
		storyPrimaryCharacterCardInfoItemStyles,
	};
};
