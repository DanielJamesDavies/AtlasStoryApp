// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../context/RoutesContext";

// Styles

// Assets

export const UserItemLogic = ({ user, className, size }) => {
	const { changeLocation } = useContext(RoutesContext);
	const [userItemClassName, setUserItemClassName] = useState("user-item-loading");

	useEffect(() => {
		function getUserItemClassName() {
			let newBtnListItemClassName = "user-item";
			if (className) newBtnListItemClassName += " " + className;
			if (size) newBtnListItemClassName += " user-item-size-" + size;
			setUserItemClassName(newBtnListItemClassName);
		}
		getUserItemClassName();
	}, [setUserItemClassName, className, size]);

	function onClick(e) {
		if (user?.username) changeLocation("/u/" + user.username, e.button === 1);
	}

	function onMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	return { userItemClassName, onClick, onMouseDown };
};
