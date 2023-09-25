import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";
import { APIContext } from "../../context/APIContext";

export const ObjectsContext = createContext();

const ObjectsProvider = ({ children, story_uid }) => {
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const [objects, setObjects] = useState(false);

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "objects") updateDocumentTitle();
			}, 500);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "objects") updateDocumentTitle();
			}, 750);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "objects") updateDocumentTitle();
			}, 1000);

			getObjects();
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Objects | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		async function getObjects() {
			const response = await APIRequest("/object?story_uid=" + story_uid, "GET");
			if (!response || response?.error || !response?.data?.objects) return false;
			setObjects(response?.data?.objects);
		}

		getInitial();
	}, [location, story_uid, curr_story_uid, story, APIRequest]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return (
		<ObjectsContext.Provider
			value={{
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				objects,
			}}
		>
			{children}
		</ObjectsContext.Provider>
	);
};

export default ObjectsProvider;
