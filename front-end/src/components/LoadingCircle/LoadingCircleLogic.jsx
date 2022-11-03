// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const LoadingCircleLogic = ({ className, size, center }) => {
	const [loadingCircleContainerClassName, setLoadingCircleContainerClassName] = useState("loading-circle-container");

	useEffect(() => {
		function getLoadingCircleContainerClassName() {
			let newClassName = "loading-circle-container";
			if (size) {
				switch (size) {
					case "s":
						newClassName += " loading-circle-container-small";
						break;
					case "l":
						newClassName += " loading-circle-container-large";
						break;
					default:
						break;
				}
			}
			if (className) newClassName += " " + className;
			if (center) newClassName += " loading-circle-container-centered";
			return newClassName;
		}
		setLoadingCircleContainerClassName(getLoadingCircleContainerClassName());
	}, [className, size, center, setLoadingCircleContainerClassName]);

	return { loadingCircleContainerClassName };
};
