// Packages
import { useContext, useState, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { BtnListContainerContext } from "../BtnListContainer/BtnListContainerContext";

// Styles

// Assets

export const BtnListItemLogic = ({ index, onClick, onRemove }) => {
	const isBtnListOpen = useContext(BtnListContainerContext)?.isBtnListOpen;
	const setIsBtnListOpen = useContext(BtnListContainerContext)?.setIsBtnListOpen;

	const [hasOnClick, setHasOnClick] = useState(false);
	const lastHasOnClick = useRef(false);
	useEffect(() => {
		if ((onClick && !lastHasOnClick.current) || (!onClick && lastHasOnClick.current)) {
			lastHasOnClick.current = onClick ? true : false;
			setHasOnClick(lastHasOnClick.current);
		}
	}, [onClick]);

	async function onBtnListItemClick(e) {
		if (setIsBtnListOpen) setIsBtnListOpen((oldIsBtnListOpen) => !oldIsBtnListOpen);
		await onClick(e);
	}

	async function onRemoveBtnClick(e) {
		e.stopPropagation();
		await onRemove(e, index);
	}

	return { isBtnListOpen, hasOnClick, onBtnListItemClick, onRemoveBtnClick };
};
