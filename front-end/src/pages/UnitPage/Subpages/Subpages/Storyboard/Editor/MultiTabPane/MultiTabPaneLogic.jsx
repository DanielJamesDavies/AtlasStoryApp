// Packages
import { useContext, useEffect, useState } from "react";

// Components
import { Media } from "./Content/Media/Media";
import { Details } from "./Content/Details/Details";

// Logic

// Context
import { StoryboardContext } from "../../StoryboardContext";

// Services

// Styles

// Assets

export const MultiTabPaneLogic = () => {
	const { openMultiTabPane } = useContext(StoryboardContext);

	const [content, setContent] = useState(null);

	useEffect(() => {
		switch (openMultiTabPane) {
			case "media":
				setContent(<Media />);
				break;
			case "details":
				setContent(<Details />);
				break;
			default:
				setContent(null);
				break;
		}
	}, [openMultiTabPane, setContent]);

	return { content };
};
