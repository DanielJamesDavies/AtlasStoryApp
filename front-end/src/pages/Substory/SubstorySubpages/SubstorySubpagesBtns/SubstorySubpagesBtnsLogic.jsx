// Packages
import { useContext, useRef, useEffect } from "react";

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

	useEffect(() => {
		const onTouchStart = (e) => e.stopPropagation();
		const onTouchMove = (e) => e.stopPropagation();
		const subpagesBtnsRefCurrent = subpagesBtnsRef?.current;
		subpagesBtnsRefCurrent.addEventListener("touchstart", onTouchStart);
		subpagesBtnsRefCurrent.addEventListener("touchmove", onTouchMove);
		return () => {
			subpagesBtnsRefCurrent.removeEventListener("touchstart", onTouchStart);
			subpagesBtnsRefCurrent.removeEventListener("touchmove", onTouchMove);
		};
	}, [subpagesBtnsRef]);

	function scrollSubpageBtns(direction) {
		if (!subpagesBtnsRef?.current) return;
		subpagesBtnsRef.current.scrollLeft += 120 * direction;
	}

	return { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns };
};
