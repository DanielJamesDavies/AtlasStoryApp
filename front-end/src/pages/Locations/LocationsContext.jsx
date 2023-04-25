import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { FaBullseye, FaDiceD6, FaDotCircle, FaGlobe, FaGlobeEurope, FaMap, FaMoon, FaProjectDiagram, FaSatellite, FaSun } from "react-icons/fa";

import { RoutesContext } from "../../context/RoutesContext";
import { APIContext } from "../../context/APIContext";
import { StoryContext } from "../../context/StoryContext";

export const LocationsContext = createContext();

const LocationsProvider = ({ children, story_uid }) => {
	const locationTypes = [
		{ type: "reality", name: "Reality", icon: <FaDiceD6 />, possibleParents: ["reality"] },
		{ type: "universe", name: "Universe", icon: <FaGlobe />, possibleParents: ["reality"] },
		{ type: "galaxy", name: "Galaxy", icon: <FaBullseye />, possibleParents: ["reality", "universe"] },
		{ type: "starCluster", name: "Star Cluster", icon: <FaProjectDiagram />, possibleParents: ["reality", "galaxy"] },
		{ type: "starSystem", name: "Star System", icon: <FaDotCircle />, possibleParents: ["reality", "starCluster"] },
		{ type: "star", name: "Star", icon: <FaSun />, possibleParents: ["reality", "starSystem"] },
		{ type: "planet", name: "Planet", icon: <FaGlobeEurope />, possibleParents: ["reality", "starSystem"] },
		{ type: "moon", name: "Moon", icon: <FaMoon />, possibleParents: ["reality", "planet"] },
		{ type: "artificialSatellite", name: "Artificial Satellite", icon: <FaSatellite />, possibleParents: ["reality", "planet", "moon"] },
		{
			type: "surfaceLocation",
			name: "Surface Location",
			icon: <FaMap />,
			possibleParents: ["reality", "planet", "moon", "artificialSatellite"],
		},
	];

	const { location } = useContext(RoutesContext);
	const { APIRequest } = useContext(APIContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon } = useContext(StoryContext);

	const [locations, setLocations] = useState(false);

	const [isDisplayingCreateHierarchyItemForm, setIsDisplayingCreateHierarchyItemForm] = useState(false);

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid.current === story_uid) return;
			if (!story || story.uid !== story_uid) return;
			curr_story_uid.current = story.uid;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => updateDocumentTitle(), 1000);

			getLocations();
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Locations | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		async function getLocations() {
			const response = await APIRequest("/location?story_uid=" + story_uid, "GET");
			if (!response || response?.errors || !response?.data?.locations) return false;
			setLocations(response.data.locations);
		}

		getInitial();
	}, [location, story_uid, curr_story_uid, story, setStory, APIRequest]);

	function changeStoryHierarchy(newHierarchy) {
		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.locationsHierarchy = JSON.parse(JSON.stringify(newHierarchy));
			return newStory;
		});
	}

	return (
		<LocationsContext.Provider
			value={{
				locationTypes,
				isAuthorizedToEdit,
				story,
				setStory,
				changeStoryHierarchy,
				storyIcon,
				locations,
				setLocations,
				isDisplayingCreateHierarchyItemForm,
				setIsDisplayingCreateHierarchyItemForm,
			}}
		>
			{children}
		</LocationsContext.Provider>
	);
};

export default LocationsProvider;