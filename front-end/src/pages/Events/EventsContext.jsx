import React, { createContext, useContext, useEffect, useRef } from "react";

import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const EventsContext = createContext();

const EventsProvider = ({ children, story_uid }) => {
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon } = useContext(StoryContext);

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "events") updateDocumentTitle();
			}, 500);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "events") updateDocumentTitle();
			}, 750);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "events") updateDocumentTitle();
			}, 1000);
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Events | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		getInitial();
	}, [location, story_uid, curr_story_uid, story]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return (
		<EventsContext.Provider
			value={{
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
			}}
		>
			{children}
		</EventsContext.Provider>
	);
};

export default EventsProvider;
