// Packages
import { useEffect } from "react";
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const BtnListItemLogic = ({ className, size, index, isActive, onClick, onRemove }) => {
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
			setBtnListItemClassName(newBtnListItemClassName);
		}
		getBtnListItemClassName();
	}, [setBtnListItemClassName, className, size, isActive, onClick]);

	async function onRemoveBtnClick(e) {
		e.stopPropagation();
		await onRemove(e, index);
	}

	return { btnListItemClassName, onRemoveBtnClick };
};
