// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { BtnListContainerContext } from "../BtnListContainer/BtnListContainerContext";

// Styles

// Assets

export const BtnListItemLogic = ({ className, size, index, isActive, onClick, onRemove }) => {
	const isBtnListOpen = useContext(BtnListContainerContext)?.isBtnListOpen;
	const setIsBtnListOpen = useContext(BtnListContainerContext)?.setIsBtnListOpen;

	const [btnListItemClassName, setBtnListItemClassName] = useState(
		isActive ? "btn-list-item-loading btn-list-item-active" : "btn-list-item-loading"
	);

	useEffect(() => {
		function getBtnListItemClassName() {
			let newBtnListItemClassName = "btn-list-item";
			if (isActive) newBtnListItemClassName += " btn-list-item-active";
			if (onClick) newBtnListItemClassName += " btn-list-item-clickable";
			if (className) newBtnListItemClassName += " " + className;
			if (size) newBtnListItemClassName += " btn-list-item-size-" + size;
			if (!isActive && isBtnListOpen === false) newBtnListItemClassName += " btn-list-item-list-closed";
			setBtnListItemClassName(newBtnListItemClassName);
		}
		getBtnListItemClassName();
	}, [setBtnListItemClassName, className, size, isActive, onClick, isBtnListOpen]);

	async function onBtnListItemClick(e) {
		if (setIsBtnListOpen) setIsBtnListOpen((oldIsBtnListOpen) => !oldIsBtnListOpen);
		await onClick(e);
	}

	async function onRemoveBtnClick(e) {
		e.stopPropagation();
		await onRemove(e, index);
	}

	return { btnListItemClassName, onBtnListItemClick, onRemoveBtnClick };
};
