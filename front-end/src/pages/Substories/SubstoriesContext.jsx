import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const SubstoriesContext = createContext();

const SubstoriesProvider = ({ children, story_uid }) => {
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, storySubstories, setStorySubstories } = useContext(StoryContext);

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid.current === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => updateDocumentTitle(), 1000);
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Substories | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		getInitial();
	}, [location, story_uid, APIRequest, curr_story_uid, story]);

	const [isDisplayingCreateSubstoryForm, setIsDisplayingCreateSubstoryForm] = useState(false);
	const [isReorderingSubstories, setIsReorderingSubstories] = useState(false);
	function toggleIsReorderingSubstories() {
		setIsReorderingSubstories((oldIsReorderingSubstories) => !oldIsReorderingSubstories);
	}

	return (
		<SubstoriesContext.Provider
			value={{
				isAuthorizedToEdit,
				story_uid,
				story,
				setStory,
				storyIcon,
				storySubstories,
				setStorySubstories,
				isDisplayingCreateSubstoryForm,
				setIsDisplayingCreateSubstoryForm,
				isReorderingSubstories,
				toggleIsReorderingSubstories,
			}}
		>
			{children}
		</SubstoriesContext.Provider>
	);
};

export default SubstoriesProvider;
