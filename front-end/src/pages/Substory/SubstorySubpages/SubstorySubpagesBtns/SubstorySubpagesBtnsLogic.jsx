// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../SubstoryContext";

// Services

// Styles

// Assets

export const SubstorySubpagesBtnsLogic = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID } = useContext(SubstoryContext);

	const subpagesBtnsRef = useRef();

	function scrollSubpageBtns(direction) {
		if (!subpagesBtnsRef?.current) return;
		subpagesBtnsRef.current.scrollLeft += 120 * direction;
	}

	return { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns };
};
