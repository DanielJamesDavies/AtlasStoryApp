// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { AppContext } from "../../context/AppContext";

// Services

// Styles

// Assets

export const PageLogic = () => {
	const { accentColour, accentHoverColour } = useContext(AppContext);
	const [pageStyles, setPageStyles] = useState({ "--accentColour": accentColour, "--accentHoverColour": accentHoverColour });

	useEffect(() => {
		setPageStyles({ "--accentColour": accentColour, "--accentHoverColour": accentHoverColour });
	}, [accentColour, accentHoverColour]);

	return { pageStyles };
};
