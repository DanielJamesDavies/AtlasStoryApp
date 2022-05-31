// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const IconBtnLogic = ({ className, iconName }) => {
	const [iconBtnClassName, setIconBtnClassName] = useState("icon-btn");

	useEffect(() => {
		function getIconBtnClassName() {
			let newClassName = "icon-btn";
			if (iconName === "plus") newClassName += " icon-btn-plus-icon";
			if (iconName === "sort") newClassName += " icon-btn-sort-icon";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setIconBtnClassName(getIconBtnClassName());
	}, [className, iconName, setIconBtnClassName]);

	return { iconBtnClassName };
};
