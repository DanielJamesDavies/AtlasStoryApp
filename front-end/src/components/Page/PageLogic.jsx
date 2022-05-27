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
	const { accentColour, accentColourHover } = useContext(AppContext);
	const [pageStyles, setPageStyles] = useState({ "--accentColour": accentColour, "--accentColourHover": accentColourHover });

	useEffect(() => {
		setPageStyles({ "--accentColour": accentColour, "--accentColourHover": accentColourHover });
	}, [accentColour, accentColourHover]);

	return { pageStyles };
};
