import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";
import { APIContext } from "../../context/APIContext";

export const LoreContext = createContext();

const LoreProvider = ({ children, story_uid }) => {
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const [lore, setLore] = useState(false);

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "lore") updateDocumentTitle();
			}, 500);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "lore") updateDocumentTitle();
			}, 750);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "lore") updateDocumentTitle();
			}, 1000);

			getLore();
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Lore | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		async function getLore() {
			const response = await APIRequest("/lore?story_uid=" + story_uid, "GET");
			if (!response || response?.error || !response?.data?.lore) return false;
			setLore(response?.data?.lore);
		}

		getInitial();
	}, [location, story_uid, curr_story_uid, story, APIRequest]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return (
		<LoreContext.Provider
			value={{
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				lore,
			}}
		>
			{children}
		</LoreContext.Provider>
	);
};

export default LoreProvider;
