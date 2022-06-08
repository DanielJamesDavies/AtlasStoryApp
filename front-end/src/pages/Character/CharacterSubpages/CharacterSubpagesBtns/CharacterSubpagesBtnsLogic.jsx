// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../CharacterContext";

// Services

// Styles

// Assets

export const CharacterSubpagesBtnsLogic = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID } = useContext(CharacterContext);

	const subpagesBtnsRef = useRef();

	function scrollSubpageBtns(direction) {
		if (!subpagesBtnsRef?.current) return;
		subpagesBtnsRef.current.scrollLeft += 120 * direction;
	}

	return { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns };
};
