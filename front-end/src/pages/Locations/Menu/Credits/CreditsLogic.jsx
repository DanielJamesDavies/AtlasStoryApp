// Packages
import { useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets
import creditsFile from "./Credits.json";

export const CreditsLogic = () => {
	const credits = creditsFile?.credits;

	const [isDisplayingCredits, setIsDisplayingCredits] = useState(false);

	function toggleIsDisplayingCredits() {
		setIsDisplayingCredits((oldIsDisplayingCredits) => !oldIsDisplayingCredits);
	}

	function toURL(e, url) {
		switch (e.button) {
			case 0:
				window.location.href = url;
				break;
			case 1:
				window.open(url, "_blank");
				break;
			default:
				break;
		}
	}

	return { credits, isDisplayingCredits, toggleIsDisplayingCredits, toURL };
};
