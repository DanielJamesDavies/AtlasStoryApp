// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../../../StoryboardContext";

// Services

// Styles

// Assets

export const TypeImageLogic = () => {
	const { setPieces, openPieceID } = useContext(StoryboardContext);

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

	function resizePiece(way) {
		setPieces((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?.id === openPieceID);
			if (index === -1) return newValue;
			switch (way) {
				case "horizontal":
					newValue[index].height = (1920 / newValue[index].width) * newValue[index].height;
					newValue[index].width = 1920;
					newValue[index].posX = 0;
					break;
				case "vertical":
					newValue[index].width = (1080 / newValue[index].height) * newValue[index].width;
					newValue[index].height = 1080;
					newValue[index].posY = 0;
					break;
				case "center":
					const new_width = Math.max(1920, (1080 / newValue[index].height) * newValue[index].width);
					const new_height = Math.max(1080, (1920 / newValue[index].width) * newValue[index].height);
					newValue[index].width = new_width;
					newValue[index].height = new_height;
					newValue[index].posX = (1920 - newValue[index].width) / 2;
					newValue[index].posY = (1080 - newValue[index].height) / 2;
					break;
				default:
					break;
			}
			return newValue;
		});
	}

	return { alignPiece, resizePiece };
};
