import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const SubstoriesContext = createContext();

const SubstoriesProvider = ({ children, story_uid }) => {
	const { APIRequest } = useContext(APIContext);
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, storySubstories, setStorySubstories, createUnitForm } = useContext(StoryContext);
	const shine_svg = (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1629.17 1629.17'>
			<g id='Beams_24' data-name='Beams 24'>
				<polygon points='814.58 0 793.37 0 814.58 814.58 835.8 0 814.58 0' />
				<polygon points='407.29 109.13 388.92 119.74 814.58 814.58 425.66 98.53 407.29 109.13' />
				<polygon points='109.13 407.29 98.53 425.66 814.58 814.58 119.74 388.92 109.13 407.29' />
				<polygon points='0 814.58 0 835.8 814.58 814.58 0 793.37 0 814.58' />
				<polygon points='109.13 1221.88 119.74 1240.25 814.58 814.58 98.53 1203.5 109.13 1221.88' />
				<polygon points='407.29 1520.03 425.66 1530.64 814.58 814.58 388.92 1509.43 407.29 1520.03' />
				<polygon points='814.58 1629.17 835.8 1629.17 814.58 814.58 793.37 1629.17 814.58 1629.17' />
				<polygon points='1221.88 1520.03 1240.25 1509.43 814.58 814.58 1203.5 1530.64 1221.88 1520.03' />
				<polygon points='1520.03 1221.88 1530.64 1203.5 814.58 814.58 1509.43 1240.25 1520.03 1221.88' />
				<polygon points='814.58 814.58 1629.17 835.8 1629.17 814.58 1629.17 793.37 814.58 814.58' />
				<polygon points='1520.03 407.29 1509.43 388.92 814.58 814.58 1530.64 425.66 1520.03 407.29' />
				<polygon points='1221.88 109.13 1203.5 98.53 814.58 814.58 1240.25 119.74 1221.88 109.13' />
				<polygon points='1250.77 378.4 1239.41 367.04 814.58 814.58 1262.13 389.75 1250.77 378.4' />
				<polygon points='974.24 218.74 958.72 214.58 814.58 814.58 989.75 222.9 974.24 218.74' />
				<polygon points='654.93 218.74 639.41 222.9 814.58 814.58 670.45 214.58 654.93 218.74' />
				<polygon points='378.4 378.4 367.04 389.75 814.58 814.58 389.75 367.04 378.4 378.4' />
				<polygon points='218.74 654.93 214.58 670.45 814.58 814.58 222.9 639.41 218.74 654.93' />
				<polygon points='218.74 974.24 222.9 989.75 814.58 814.58 214.58 958.72 218.74 974.24' />
				<polygon points='378.4 1250.77 389.75 1262.13 814.58 814.58 367.04 1239.41 378.4 1250.77' />
				<polygon points='654.93 1410.43 670.45 1414.58 814.58 814.58 639.41 1406.27 654.93 1410.43' />
				<polygon points='974.24 1410.43 989.75 1406.27 814.58 814.58 958.72 1414.58 974.24 1410.43' />
				<polygon points='1250.77 1250.77 1262.13 1239.41 814.58 814.58 1239.41 1262.13 1250.77 1250.77' />
				<polygon points='1406.27 989.75 1410.43 974.24 1414.58 958.72 814.58 814.58 1406.27 989.75' />
				<polygon points='1410.43 654.93 1406.27 639.41 814.58 814.58 1414.58 670.45 1410.43 654.93' />
				<polygon points='814.58 0 780.64 0 814.58 814.58 848.52 0 814.58 0' />
				<polygon points='814.58 814.58 1629.17 848.52 1629.17 814.58 1629.17 780.64 814.58 814.58' />
				<polygon points='814.58 1629.17 848.52 1629.17 814.58 814.58 780.64 1629.17 814.58 1629.17' />
				<polygon points='0 814.58 0 848.52 814.58 814.58 0 780.64 0 814.58' />
			</g>
		</svg>
	);

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
				shine_svg,
			}}
		>
			{children}
		</SubstoriesContext.Provider>
	);
};

export default SubstoriesProvider;
