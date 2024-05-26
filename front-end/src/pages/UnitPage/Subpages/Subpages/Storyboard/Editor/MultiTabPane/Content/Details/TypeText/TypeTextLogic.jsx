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

	function alignPiece(way) {
		setPieces((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?.id === openPieceID);
			if (index === -1) return newValue;
			switch (way) {
				case "horizontal":
					newValue[index].posX = (1920 - newValue[index].width) / 2;
					break;
				case "vertical":
					newValue[index].posY = (1080 - newValue[index].height) / 2;
					break;
				case "center":
					newValue[index].posX = (1920 - newValue[index].width) / 2;
					newValue[index].posY = (1080 - newValue[index].height) / 2;
					break;
				default:
					break;
			}
			return newValue;
		});
	}

	return { pieces, openPieceID, onChangeContent, alignPiece };
};
