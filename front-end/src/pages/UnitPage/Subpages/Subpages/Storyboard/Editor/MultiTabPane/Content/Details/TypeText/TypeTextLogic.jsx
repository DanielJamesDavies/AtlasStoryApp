// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../../../StoryboardContext";

// Services

// Styles

// Assets

export const TypeTextLogic = () => {
	const { pieces, setPieces, openPieceID } = useContext(StoryboardContext);

	function onChangeContent(e) {
		setPieces((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?.id === openPieceID);
			if (index === -1) return newValue;
			newValue[index].content = e?.target?.value;
			return newValue;
		});
	}

	return { pieces, openPieceID, onChangeContent };
};
