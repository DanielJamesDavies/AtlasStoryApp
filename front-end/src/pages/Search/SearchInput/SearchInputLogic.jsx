// Packages

import { useEffect } from "react";
import { useRef } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const SearchInputLogic = () => {
	const searchInputRef = useRef();

	useEffect(() => {
		searchInputRef?.current?.focus();
	}, [searchInputRef]);

	return { searchInputRef };
};
