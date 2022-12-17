import React, { createContext, useContext, useRef, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const NotesContext = createContext();

const NotesProvider = ({ children, story_uid, notes_uid }) => {
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, storyNotesImages, setStoryNotesImages } = useContext(StoryContext);

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid.current === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			if (story?.data?.title) {
				let newDocumentTitle = "";
				switch (notes_uid) {
					case "characters":
						newDocumentTitle += "Characters ";
						break;
					case "substories":
						newDocumentTitle += "Substories ";
						break;
					case "world":
						newDocumentTitle += "World ";
						break;
					default:
						break;
				}
				newDocumentTitle += "Notes | " + story?.data?.title + " | Atlas Story App";
				document.title = newDocumentTitle;
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		getInitial();
	}, [location, story_uid, notes_uid, APIRequest, story]);

	return (
		<NotesContext.Provider
			value={{ story_uid, notes_uid, isAuthorizedToEdit, story, setStory, storyIcon, storyNotesImages, setStoryNotesImages }}
		>
			{children}
		</NotesContext.Provider>
	);
};

export default NotesProvider;
