import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { AppContext } from "../../context/AppContext";
import { RoutesContext } from "../../context/RoutesContext";

export const NotesContext = createContext();

const NotesProvider = ({ children, story_uid, notes_uid }) => {
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [noteImages, setNoteImages] = useState([]);
	const { APIRequest } = useContext(APIContext);
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		async function getStory() {
			if (!story_uid) {
				setStory(false);
				return;
			}
			if (story.uid === story_uid) return;

			// Story Data
			const story_response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_uid !== story_response.data.story.uid) {
				setStory(false);
				setStoryIcon(false);
				setIsAuthorizedToEdit(false);
				return;
			}

			let newStory = JSON.parse(JSON.stringify(story_response.data.story));
			if (newStory.data.notes.findIndex((e) => e.uid === notes_uid) === -1) {
				newStory.data.notes.push({ uid: notes_uid, items: [] });
			}
			setStory(newStory);

			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);

			if (story_response?.data?.story?.data?.colours?.accent) changeAccentColour(story_response.data.story.data.colours.accent);
			if (story_response?.data?.story?.data?.colours?.accentHover)
				changeAccentHoverColour(story_response.data.story.data.colours.accentHover);

			if (story_response.data.story?.data?.icon) getStoryIcon(story_response.data.story.data.icon);

			getNoteImages(story_response.data.story.data.notes.find((e) => e.uid === notes_uid));
		}

		async function getStoryIcon(iconID) {
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setStoryIcon(false);
			setStoryIcon(response.data.image);
		}

		async function getNoteImages(note) {
			if (!note) return setNoteImages([]);
			let newNoteImages = [];
			await Promise.all(
				note.items.map(async (item) => {
					await Promise.all(
						item?.images?.map(async (image) => {
							const image_response = await APIRequest("/image/" + image?.image, "GET");
							if (image_response?.errors || !image_response?.data?.image) return false;
							newNoteImages.push(image_response.data);
							return true;
						})
					);
					return true;
				})
			);
			setNoteImages(newNoteImages);
		}

		getStory();

		let reloadTimer = setTimeout(() => getStory(), 1);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [
		location,
		story_uid,
		notes_uid,
		APIRequest,
		setIsAuthorizedToEdit,
		story,
		setStory,
		setStoryIcon,
		changeAccentColour,
		changeAccentHoverColour,
		setNoteImages,
	]);

	return (
		<NotesContext.Provider value={{ story_uid, notes_uid, isAuthorizedToEdit, story, setStory, storyIcon, noteImages, setNoteImages }}>
			{children}
		</NotesContext.Provider>
	);
};

export default NotesProvider;
