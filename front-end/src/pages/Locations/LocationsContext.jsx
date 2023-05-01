import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaBullseye, FaDiceD6, FaDotCircle, FaGlobe, FaGlobeEurope, FaMap, FaMoon, FaProjectDiagram, FaSatellite, FaSun } from "react-icons/fa";

import { RoutesContext } from "../../context/RoutesContext";
import { APIContext } from "../../context/APIContext";
import { StoryContext } from "../../context/StoryContext";

import { HierarchyFunctions } from "./HierarchyFunctions";

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
			possibleParents: ["reality", "planet", "moon", "artificialSatellite", "surfaceLocation"],
		},
	];

	const { location } = useContext(RoutesContext);
	const { APIRequest } = useContext(APIContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, locations, setLocations } = useContext(StoryContext);
	const { getInitialMapLocationItem } = HierarchyFunctions();

	const locationsMapRef = useRef();
	const [playerApi, setPlayerApi] = useState(false);
	const [playerCamera, setPlayerCamera] = useState(false);
	const playerCameraRotation = useRef([0, 0, Math.PI / 2]);
	const [currentMapLocationId, setCurrentMapLocationId] = useState(false);
	const [selectedLocationId, setSelectedLocationId] = useState(false);
	const [hoverMapLocationId, setHoverMapLocationId] = useState(false);
	const [isDisplayingHierarchy, setIsDisplayingHierarchy] = useState(false);
	const [playerActions, setPlayerActions] = useState({ forward: false, backward: false, left: false, right: false, up: false, down: false });
	const [playerSpeed, setPlayerSpeed] = useState(2);
	const [isMouseOverMap, setIsMouseOverMap] = useState(false);
	const [isMouseControllingPlayer, setIsMouseControllingPlayer] = useState(false);

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

		function getInitialMapLocationId(newLocations) {
			if (!story || !story?.data?.locationsHierarchy || story.data.locationsHierarchy.length === 0) return false;
			const newCurrentMapLocationItem = getInitialMapLocationItem(story.data.locationsHierarchy, newLocations);
			if (newCurrentMapLocationItem?._id === undefined) return false;
			setCurrentMapLocationId(newCurrentMapLocationItem._id);
		}

		async function getLocations() {
			const response = await APIRequest("/location?story_uid=" + story_uid, "GET");
			if (!response || response?.errors || !response?.data?.locations) return false;
			setLocations(response.data.locations);
			getInitialMapLocationId(response.data.locations);
		}

		getInitial();
	}, [APIRequest, location, story_uid, curr_story_uid, story, setStory, setLocations, setCurrentMapLocationId, getInitialMapLocationItem]);

	useEffect(() => {
		setHoverMapLocationId(false);
	}, [currentMapLocationId]);

	const changeCameraRotation = useCallback(
		(newRotation) => {
			if (!newRotation) return false;
			playerCamera.rotation.set(...newRotation);
			playerCameraRotation.current = newRotation;
		},
		[playerCamera, playerCameraRotation]
	);

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
				locationsMapRef,
				playerApi,
				setPlayerApi,
				playerCamera,
				setPlayerCamera,
				playerCameraRotation,
				changeCameraRotation,
				currentMapLocationId,
				setCurrentMapLocationId,
				selectedLocationId,
				setSelectedLocationId,
				hoverMapLocationId,
				setHoverMapLocationId,
				isDisplayingHierarchy,
				setIsDisplayingHierarchy,
				playerActions,
				setPlayerActions,
				playerSpeed,
				setPlayerSpeed,
				isMouseOverMap,
				setIsMouseOverMap,
				isMouseControllingPlayer,
				setIsMouseControllingPlayer,
				isDisplayingCreateHierarchyItemForm,
				setIsDisplayingCreateHierarchyItemForm,
			}}
		>
			{children}
		</LocationsContext.Provider>
	);
};

export default LocationsProvider;
