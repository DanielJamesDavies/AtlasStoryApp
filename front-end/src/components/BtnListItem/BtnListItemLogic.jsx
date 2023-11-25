// Packages
import { useContext, useState, useEffect, useRef, useCallback } from "react";

// Components

// Logic

// Context
import { BtnListContainerContext } from "../BtnListContainer/BtnListContainerContext";

// Styles

// Assets

export const BtnListItemLogic = ({ className, size, index, isActive, hasFoundActive, onClick, onRemove }) => {
	const isBtnListOpen = useContext(BtnListContainerContext)?.isBtnListOpen;
	const setIsBtnListOpen = useContext(BtnListContainerContext)?.setIsBtnListOpen;

	const [btnListItemClassName, setBtnListItemClassName] = useState(
		"btn-list-item-loading " +
			((hasFoundActive !== false ? isActive : index === 0) ? "btn-list-item-active" : "btn-list-item-list-closed") +
			(!size ? "" : " btn-list-item-size-" + size)
	);

	const [hasOnClick, setHasOnClick] = useState(false);
	const lastHasOnClick = useRef(false);
	useEffect(() => {
		if ((onClick && !lastHasOnClick.current) || (!onClick && lastHasOnClick.current)) {
			lastHasOnClick.current = onClick ? true : false;
			setHasOnClick(lastHasOnClick.current);
		}
	}, [onClick]);

	const getBtnListItemClassName = useCallback(() => {
		let newBtnListItemClassName = "btn-list-item";
		if (hasFoundActive !== false ? isActive : index === 0) newBtnListItemClassName += " btn-list-item-active";
		if (hasOnClick) newBtnListItemClassName += " btn-list-item-clickable";
		if (className) newBtnListItemClassName += " " + className;
		if (size) newBtnListItemClassName += " btn-list-item-size-" + size;
		if (isBtnListOpen === false) newBtnListItemClassName += " btn-list-item-list-closed";
		setBtnListItemClassName(newBtnListItemClassName);
	}, [setBtnListItemClassName, className, size, index, isActive, hasFoundActive, hasOnClick, isBtnListOpen]);

	useEffect(() => {
		getBtnListItemClassName();
	}, [getBtnListItemClassName, className, size, index, isActive, hasFoundActive, hasOnClick, isBtnListOpen]);

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
