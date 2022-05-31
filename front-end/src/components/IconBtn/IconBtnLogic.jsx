// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const IconBtnLogic = ({ className, icon }) => {
	const [iconBtnClassName, setIconBtnClassName] = useState("icon-btn");

	useEffect(() => {
		function getIconBtnClassName() {
			let newClassName = "icon-btn";
			console.log(icon);
			if (icon?.type?.name === "FaPlus") newClassName += " icon-btn-plus-icon";
			if (icon?.type?.name === "FaSort") newClassName += " icon-btn-sort-icon";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setIconBtnClassName(getIconBtnClassName());
	}, [className, icon, setIconBtnClassName]);

	return { iconBtnClassName };
};
