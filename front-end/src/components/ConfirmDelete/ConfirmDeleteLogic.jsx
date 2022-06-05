// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const ConfirmDeleteLogic = ({ state, className, seamless }) => {
	const [isConfirming, setIsConfirming] = useState(false);

	useEffect(() => {
		setIsConfirming(false);
	}, [state]);

	const [confirmDeleteContainerClassName, setConfirmDeleteContainerClassName] = useState(
		"confirm-delete-container confirm-delete-container-seamless"
	);

	useEffect(() => {
		function getConfirmDeleteContainerClassName() {
			let newClassName = "confirm-delete-container";
			if (seamless) newClassName += " confirm-delete-container-seamless";
			if (isConfirming) newClassName += " confirm-delete-container-is-confirming";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setConfirmDeleteContainerClassName(getConfirmDeleteContainerClassName());
	}, [setConfirmDeleteContainerClassName, className, seamless, isConfirming]);

	return { confirmDeleteContainerClassName, isConfirming, setIsConfirming };
};
