import React, { createContext, useContext, useEffect, useRef } from "react";

import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const WorldContext = createContext();

const WorldProvider = ({ children, story_uid }) => {
	const { location } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon } = useContext(StoryContext);

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => updateDocumentTitle(), 1000);
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "World | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		getInitial();
	}, [location, story_uid, curr_story_uid, story]);

	return (
		<WorldContext.Provider
			value={{
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
			}}
		>
			{children}
		</WorldContext.Provider>
	);
};

export default WorldProvider;
