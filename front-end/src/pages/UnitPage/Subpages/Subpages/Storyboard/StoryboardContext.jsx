import React, { createContext, useContext, useEffect, useState } from "react";
import { UnitPageContext } from "../../../UnitPageContext";

export const StoryboardContext = createContext();

const StoryboardProvider = ({ children }) => {
	const { unit } = useContext(UnitPageContext);

	const [isPlaying, setIsPlaying] = useState(false);

	const [elapsedTime, setElapsedTime] = useState(0);
	const [fullDuration, setFullDuration] = useState(120);
	const [lastTimeUpdatedElapsedTime, setLastTimeUpdatedElapsedTime] = useState(0);

	const [volume, setVolume] = useState(0.5);
	const [isMuted, setIsMuted] = useState(false);

	const [isEditingStoryboard, setIsEditingStoryboard] = useState(false);

	const [openMultiTabPane, setOpenMultiTabPane] = useState("media");
	const [openPieceID, setOpenPieceID] = useState(false);

	const [playerHeight, setPlayerHeight] = useState(0);

	const [layers, setLayers] = useState([]);
	const [pieces, setPieces] = useState([]);

	const content_simple = [
		{ id: "1", name: "Text" },
		{ id: "2", name: "Solid" },
		{ id: "3", name: "Gradient" },
	];
	const content_images = [{ id: "4", name: "Image" }];
	const content_music = [{ id: "5", name: "Track" }];

	const [fromMediaDraggingContent, setFromMediaDraggingContent] = useState(false);
	const [fromMediaDraggingContentID, setFromMediaDraggingContentID] = useState(false);

	const [draggingLayerPiece, setDraggingLayerPiece] = useState(false);

	useEffect(() => {
		setIsPlaying(false);
	}, [isEditingStoryboard]);

	useEffect(() => {
		setLayers(
			Array(Math.max(0, 4 - unit?.data?.storyboard?.layers.length))
				.fill({ pieces: [] })
				.concat(unit?.data?.storyboard?.layers)
		);
		setPieces(unit?.data?.storyboard?.pieces);
	}, [unit, setLayers, setPieces]);

	return (
		<StoryboardContext.Provider
			value={{
				isPlaying,
				setIsPlaying,
				elapsedTime,
				setElapsedTime,
				fullDuration,
				setFullDuration,
				lastTimeUpdatedElapsedTime,
				setLastTimeUpdatedElapsedTime,
				volume,
				setVolume,
				isMuted,
				setIsMuted,
				isEditingStoryboard,
				setIsEditingStoryboard,
				openMultiTabPane,
				setOpenMultiTabPane,
				openPieceID,
				setOpenPieceID,
				playerHeight,
				setPlayerHeight,
				layers,
				setLayers,
				pieces,
				setPieces,
				content_simple,
				content_images,
				content_music,
				fromMediaDraggingContent,
				setFromMediaDraggingContent,
				fromMediaDraggingContentID,
				setFromMediaDraggingContentID,
				draggingLayerPiece,
				setDraggingLayerPiece,
			}}
		>
			{children}
		</StoryboardContext.Provider>
	);
};

export default StoryboardProvider;
