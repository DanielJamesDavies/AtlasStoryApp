// Packages
import { useState, useContext, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";

// Services

// Styles

// Assets

export const SubstorySubpagesLogic = () => {
	const { openSubpageID } = useContext(SubstoryContext);
	const [subpage, setSubpage] = useState(null);

	useEffect(() => {
		function getSubpage() {
			switch (openSubpageID) {
				case "gallery":
					return null;
				case "plot":
					return null;
				case "characters":
					return null;
				case "locations":
					return null;
				case "miscellaneous":
					return null;
				case "development":
					return null;
				case "settings":
					return null;
				default:
					return null;
			}
		}
		setSubpage(getSubpage());
	}, [openSubpageID]);

	return { subpage };
};
