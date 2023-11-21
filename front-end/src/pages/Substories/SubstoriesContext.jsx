import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const SubstoriesContext = createContext();

const SubstoriesProvider = ({ children, story_uid }) => {
	const { APIRequest } = useContext(APIContext);
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, storySubstories, setStorySubstories, createUnitForm } = useContext(StoryContext);

	const [createSubstoryValues, setCreateSubstoryValues] = useState({});

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid.current === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "plots") updateDocumentTitle();
			}, 500);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "plots") updateDocumentTitle();
			}, 750);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "plots") updateDocumentTitle();
			}, 1000);
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

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	const lastCreateUnitForm = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateUnitForm?.current) !== JSON.stringify(createUnitForm)) {
			lastCreateUnitForm.current = JSON.parse(JSON.stringify(createUnitForm));
			if (createUnitForm?.unit_type === "plot") {
				setIsDisplayingCreateSubstoryForm(true);

				setCreateSubstoryValues({ name: createUnitForm?.name, uid: createUnitForm?.uid });
			}
		}
	}, [createUnitForm, setCreateSubstoryValues, setIsDisplayingCreateSubstoryForm, lastCreateUnitForm]);

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
				createSubstoryValues,
				setCreateSubstoryValues,
			}}
		>
			{children}
		</SubstoriesContext.Provider>
	);
};

export default SubstoriesProvider;
