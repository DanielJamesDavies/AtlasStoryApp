// Packages
import { useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const AppLogic = () => {
	useEffect(() => {
		function disableIosZoomOnTextInput() {
			if (!(["iPad", "iPhone", "iPod"].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)))
				return false;
			const viewport = document.querySelector("meta[name=viewport]");
			if (!viewport) return false;
			let content = viewport.getAttribute("content");
			let regex = /maximum-scale=[0-9.]+/g;
			if (regex.test(content)) return viewport.setAttribute("content", content.replace(regex, "maximum-scale=1.0"));
			return viewport.setAttribute("content", [content, "maximum-scale=1.0"].join(", "));
		}
		disableIosZoomOnTextInput();
	}, []);

	return {};
};
