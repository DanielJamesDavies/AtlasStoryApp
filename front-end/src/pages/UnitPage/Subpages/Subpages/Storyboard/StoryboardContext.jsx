import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { UnitPageContext } from "../../../UnitPageContext";
import { APIContext } from "../../../../../context/APIContext";
import { faFont } from "@fortawesome/free-solid-svg-icons";

export const StoryboardContext = createContext();

const StoryboardProvider = ({ children }) => {
	const { unit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const [isPlaying, setIsPlaying] = useState(false);

	const [elapsedTime, setElapsedTime] = useState(0);
	const elapsedTimeRef = useRef(0);
	const [fullDuration, setFullDuration] = useState(300);
	const [lastTimeUpdatedElapsedTime, setLastTimeUpdatedElapsedTime] = useState(0);
	const [lastTimeReleaseTimeline, setLastTimeReleaseTimeline] = useState(0);

	const [volume, setVolume] = useState(0.5);
	const [isMuted, setIsMuted] = useState(false);

	const [isEditingStoryboard, setIsEditingStoryboard] = useState(false);

	const [openMultiTabPane, setOpenMultiTabPane] = useState("media");
	const [openPieceID, setOpenPieceID] = useState(false);

	const [playerHeight, setPlayerHeight] = useState(0);

	const [layers, setLayers] = useState([]);
	const [pieces, setPieces] = useState([]);

	const content_simple = [
		{ id: "1", name: "Text", type: "text", icon: faFont },
		{ id: "2", name: "Solid", type: "solid" },
		{ id: "3", name: "Gradient", type: "gradient" },
	];
	const [content_images, setContentImages] = useState([]);

	const [fromMediaDraggingContent, setFromMediaDraggingContent] = useState(false);
	const fromMediaDraggingContentID = useRef(false);

	const [draggingLayerPiece, setDraggingLayerPiece] = useState(false);

	useEffect(() => {
		setIsPlaying(false);
	}, [isEditingStoryboard]);

	useEffect(() => {
		elapsedTimeRef.current = elapsedTime;
	}, [elapsedTime, elapsedTimeRef]);

	useEffect(() => {
		setLayers(
			Array(Math.max(0, 4 - unit?.data?.storyboard?.layers.length))
				.fill({ pieces: [] })
				.concat(unit?.data?.storyboard?.layers)
		);
		setPieces(unit?.data?.storyboard?.pieces);
	}, [unit, setLayers, setPieces]);

	// Get Content Images
	const has_got_content_images = useRef(false);
	useEffect(() => {
		async function get_content_images() {
			if (has_got_content_images?.current || !unit?.data?.storyboard) return false;
			has_got_content_images.current = true;
			const newContentImages = await Promise.all(
				unit?.data?.storyboard?.images?.map(async (image_id) => {
					if (!image_id) return;
					const res = await APIRequest("/image/" + image_id, "GET");
					if (res?.errors || !res?.data?.image?.image) return { id: image_id, image: false };
					return { id: image_id, image: res?.data?.image?.image };
				})
			);
			setContentImages(newContentImages);
		}
		get_content_images();
	}, [setContentImages, unit, APIRequest]);

	return (
		<StoryboardContext.Provider
			value={{
				isPlaying,
				setIsPlaying,
				elapsedTime,
				setElapsedTime,
				elapsedTimeRef,
				fullDuration,
				setFullDuration,
				lastTimeUpdatedElapsedTime,
				setLastTimeUpdatedElapsedTime,
				lastTimeReleaseTimeline,
				setLastTimeReleaseTimeline,
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
				setContentImages,
				fromMediaDraggingContent,
				setFromMediaDraggingContent,
				fromMediaDraggingContentID,
				draggingLayerPiece,
				setDraggingLayerPiece,
			}}
		>
			{children}
		</StoryboardContext.Provider>
	);
};

export default StoryboardProvider;
