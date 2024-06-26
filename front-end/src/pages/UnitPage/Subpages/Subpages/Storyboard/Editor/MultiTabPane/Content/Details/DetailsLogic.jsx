// Packages
import { useContext, useState, useEffect } from "react";

// Components
import { TypeText } from "./TypeText/TypeText";
import { TypeImage } from "./TypeImage/TypeImage";

// Logic

// Context
import { StoryboardContext } from "../../../../StoryboardContext";

// Services

// Styles

// Assets

export const DetailsLogic = () => {
	const { playerHeight, pieces, openPieceID } = useContext(StoryboardContext);

	const [content, setContent] = useState(null);

	useEffect(() => {
		switch (pieces?.find((e) => e?.id === openPieceID)?.piece_type) {
			case "text":
				setContent(<TypeText />);
				break;
			case "image":
				setContent(<TypeImage />);
				break;
			default:
				setContent(null);
				break;
		}
	}, [pieces, openPieceID, setContent]);

	return { playerHeight, content };
};
