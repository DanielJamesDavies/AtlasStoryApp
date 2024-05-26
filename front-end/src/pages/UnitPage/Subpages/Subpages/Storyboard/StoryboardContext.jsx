import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { UnitPageContext } from "../../../UnitPageContext";
import { SpotifyContext } from "../../../../../context/SpotifyContext";
import { APIContext } from "../../../../../context/APIContext";

export const StoryboardContext = createContext();

const StoryboardProvider = ({ children }) => {
	const { unit } = useContext(UnitPageContext);
	const { SpotifyRequest, spotify_access_token, isSpotifyPlaying, playSpotifyTrack } = useContext(SpotifyContext);
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
	const [playlists, setPlaylists] = useState([]);
	const [tracks, setTracks] = useState([]);

	const content_simple = [
		{ id: "1", name: "Text", type: "text" },
		{ id: "2", name: "Solid", type: "solid" },
		{ id: "3", name: "Gradient", type: "gradient" },
	];
	const [content_images, setContentImages] = useState([]);

	const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
	const spotifyPlaylistsRef = useRef([]);

	const updateSpotifyPlaylists = useCallback(async () => {
		const playlists_to_get = playlists.filter(
			(e) => e?.source === "spotify" && spotifyPlaylistsRef?.current?.findIndex((e2) => e2?.id === e?.id) === -1
		);

		const new_playlists = await Promise.all(
			playlists_to_get?.map(async (playlist_to_get) => {
				const playlist_res = await SpotifyRequest("/playlists/" + playlist_to_get?.id);
				return playlist_res;
			})
		);

		setSpotifyPlaylists((oldValue) => {
			const newValue = oldValue
				.filter((e) => new_playlists?.findIndex((e2) => e2?.id === e?.id) === -1)
				.concat(new_playlists)
				?.filter((e) => e !== false);
			spotifyPlaylistsRef.current = newValue;
			return newValue;
		});
	}, [spotifyPlaylistsRef, playlists, SpotifyRequest]);

	useEffect(() => {
		updateSpotifyPlaylists();
	}, [playlists, updateSpotifyPlaylists, spotify_access_token]);

	const [spotifyTracks, setSpotifyTracks] = useState([]);
	const spotifyTracksRef = useRef([]);

	const updateSpotifyTracks = useCallback(async () => {
		const tracks_to_get = tracks.filter(
			(e) => e?.source === "spotify" && spotifyTracksRef?.current?.findIndex((e2) => e2?.id === e?.id) === -1
		);

		const new_tracks = await Promise.all(
			tracks_to_get?.map(async (track_to_get) => {
				const track_res = await SpotifyRequest("/tracks/" + track_to_get?.id);
				return track_res;
			})
		);

		setSpotifyTracks((oldValue) => {
			const newValue = oldValue
				.filter((e) => new_tracks?.findIndex((e2) => e2?.id === e?.id) === -1)
				.concat(new_tracks)
				?.filter((e) => e !== false);
			spotifyTracksRef.current = newValue;
			return newValue;
		});
	}, [spotifyTracksRef, tracks, SpotifyRequest]);

	useEffect(() => {
		updateSpotifyTracks();
	}, [tracks, updateSpotifyTracks, spotify_access_token]);

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
		console.log(
			Array(Math.max(0, 4 - unit?.data?.storyboard?.layers.length))
				.fill({ pieces: [] })
				.concat(unit?.data?.storyboard?.layers)
		);
		setPieces(unit?.data?.storyboard?.pieces);
		setPlaylists(unit?.data?.storyboard?.playlists);
		setTracks(unit?.data?.storyboard?.tracks);
	}, [unit, setLayers, setPieces, setPlaylists, setTracks]);

	// Pause Spotify If No Tracks Playing
	const hasPausedSpotify = useRef(false);
	useEffect(() => {
		if (isSpotifyPlaying?.current && !isPlaying) {
			isSpotifyPlaying.current = false;
			playSpotifyTrack("", { pause: true });
		} else if (isSpotifyPlaying?.current) {
			const playing_tracks = pieces?.filter((e) => e?.piece_type === "track" && e?.start_time <= elapsedTime && e?.end_time >= elapsedTime);
			if (playing_tracks?.length === 0) {
				isSpotifyPlaying.current = false;
				playSpotifyTrack("", { pause: true });
			}
		} else {
			if (hasPausedSpotify?.current === false) {
				isSpotifyPlaying.current = false;
				hasPausedSpotify.current = true;
				playSpotifyTrack("", { pause: true });
			}
		}
	}, [elapsedTime, isSpotifyPlaying, playSpotifyTrack, pieces, isPlaying]);

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
				playlists,
				setPlaylists,
				tracks,
				setTracks,
				content_simple,
				content_images,
				setContentImages,
				spotifyPlaylists,
				setSpotifyPlaylists,
				spotifyTracks,
				setSpotifyTracks,
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
