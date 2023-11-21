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
		(hasFoundActive !== false ? isActive : index === 0)
			? "btn-list-item-active btn-list-item-loading"
			: "btn-list-item-loading btn-list-item-list-closed"
	);

	const [hasOnClick, setHasOnClick] = useState(false);
	const hasCheckedOnClickRecently = useRef(false);
	useEffect(() => {
		if (onClick && hasCheckedOnClickRecently.current === false) {
			setHasOnClick(true);
			hasCheckedOnClickRecently.current = true;
			setTimeout(() => {
				hasCheckedOnClickRecently.current = false;
			}, 500);
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

	const hasGotInitialClassName = useRef(false);
	useEffect(() => {
		if (hasGotInitialClassName.current === false) {
			hasGotInitialClassName.current = true;
			getBtnListItemClassName();
			setTimeout(() => getBtnListItemClassName(), 10);
			setTimeout(() => getBtnListItemClassName(), 25);
			setTimeout(() => getBtnListItemClassName(), 50);
			setTimeout(() => getBtnListItemClassName(), 75);
		}
	}, [getBtnListItemClassName, hasGotInitialClassName]);

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
