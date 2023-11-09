// Packages
import { useContext, useState, useEffect, useRef } from "react";

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

	const getBtnListItemClassNameTimeout = useRef(false);
	useEffect(() => {
		function getBtnListItemClassName() {
			let newBtnListItemClassName = "btn-list-item";
			if (hasFoundActive !== false ? isActive : index === 0) newBtnListItemClassName += " btn-list-item-active";
			if (onClick) newBtnListItemClassName += " btn-list-item-clickable";
			if (className) newBtnListItemClassName += " " + className;
			if (size) newBtnListItemClassName += " btn-list-item-size-" + size;
			if (isBtnListOpen === false) newBtnListItemClassName += " btn-list-item-list-closed";
			setBtnListItemClassName(newBtnListItemClassName);
		}
		
		if (getBtnListItemClassNameTimeout.current !== false) clearTimeout(getBtnListItemClassNameTimeout.current);
		getBtnListItemClassNameTimeout.current = setTimeout(() => {
			getBtnListItemClassName();
			getBtnListItemClassNameTimeout.current = false;
		}, 100);
	}, [setBtnListItemClassName, className, size, index, isActive, hasFoundActive, onClick, isBtnListOpen, getBtnListItemClassNameTimeout]);

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
