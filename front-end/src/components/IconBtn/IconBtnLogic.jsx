// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const IconBtnLogic = ({ className, seamless, size, iconName }) => {
	const [iconBtnClassName, setIconBtnClassName] = useState("icon-btn icon-btn-seamless");

	useEffect(() => {
		function getIconBtnClassName() {
			let newClassName = "icon-btn";

			if (seamless) newClassName += " icon-btn-seamless";

			switch (size) {
				case "s":
					newClassName += " icon-btn-small";
					break;
				case "l":
					newClassName += " icon-btn-large";
					break;
				default:
					break;
			}

			switch (iconName) {
				case "plus":
					newClassName += " icon-btn-plus-icon";
					break;
				case "sort":
					newClassName += " icon-btn-sort-icon";
					break;
				case "trash":
					newClassName += " icon-btn-trash-icon";
					break;
				default:
					break;
			}

			if (className) newClassName += " " + className;
			return newClassName;
		}
		setIconBtnClassName(getIconBtnClassName());
	}, [setIconBtnClassName, className, seamless, size, iconName]);

	return { iconBtnClassName };
};
