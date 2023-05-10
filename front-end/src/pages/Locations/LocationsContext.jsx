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

	const { location, locationParams, changeLocation } = useContext(RoutesContext);
	const { APIRequest } = useContext(APIContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, locations, setLocations } = useContext(StoryContext);
	const { getItemFromIdInHierarchy, getInitialMapLocationItem } = HierarchyFunctions();

	const locationsMapRef = useRef();
	const [playerApi, setPlayerApi] = useState(false);
	const [playerCamera, setPlayerCamera] = useState(false);
	const playerCameraRotation = useRef([0, 0, Math.PI / 2]);
	const [playerLookAtObjectPosition, setPlayerLookAtObjectPosition] = useState(false);
	const [currentMapLocationId, setCurrentMapLocationId] = useState(false);
	const [travellingToMapLocationId, setTravellingToMapLocationId] = useState(false);
	const [travellingToMapLocationForwardDelta, setTravellingToMapLocationForwardDelta] = useState(false);
	const [selectedLocationId, setSelectedLocationId] = useState(false);
	const [hoverMapLocationId, setHoverMapLocationId] = useState(false);
	const [isDisplayingHierarchy, setIsDisplayingHierarchy] = useState(false);
	const [playerActions, setPlayerActions] = useState({ forward: false, backward: false, left: false, right: false, up: false, down: false });
	const [playerSpeed, setPlayerSpeed] = useState(2);
	const [isMouseOverMap, setIsMouseOverMap] = useState(false);
	const [isMouseControllingPlayer, setIsMouseControllingPlayer] = useState(false);

	const scenesChangePlayerInitial = useRef([
		{
			type: "starCluster",
			position: [-22, -2, 17],
			rotation: [8 * (Math.PI / 180), 300 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "starSystem",
			position: [-6.5, -3.5, 22],
			rotation: [8 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "star",
			position: [-10.5, -2.5, 20],
			rotation: [7 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "planet",
			position: [-10.5, -2.5, 20],
			rotation: [7 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "moon",
			position: [-10.5, -2.5, 20],
			rotation: [7 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
	]);

	const [isDisplayingCreateHierarchyItemForm, setIsDisplayingCreateHierarchyItemForm] = useState(false);

	const location_url_parameter = useRef(false);
	useEffect(() => {
		location_url_parameter.current = locationParams.find((e) => e.label === "l")?.value;
	}, [locationParams]);

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

			let newCurrentMapLocationItem = false;
			if (location_url_parameter.current) {
				newCurrentMapLocationItem = getItemFromIdInHierarchy(
					location_url_parameter.current,
					JSON.parse(JSON.stringify(story.data.locationsHierarchy))
				);
				if (newCurrentMapLocationItem?._id !== undefined) {
					setCurrentMapLocationId(newCurrentMapLocationItem._id);
					return true;
				}
			}

			newCurrentMapLocationItem = getInitialMapLocationItem(story.data.locationsHierarchy, newLocations);
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
	}, [
		APIRequest,
		location,
		story_uid,
		curr_story_uid,
		story,
		setStory,
		setLocations,
		setCurrentMapLocationId,
		getItemFromIdInHierarchy,
		getInitialMapLocationItem,
		location_url_parameter,
	]);

	useEffect(() => {
		setHoverMapLocationId(false);
		const storyUid = document.location.pathname.split("/").filter((e) => e.length !== 0)[1];
		const isOnLocations = document.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "locations";
		if (isOnLocations && currentMapLocationId) changeLocation("/s/" + storyUid + "/locations?l=" + currentMapLocationId);
	}, [currentMapLocationId, changeLocation]);

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

	function changeCurrentMapLocationId(newCurrentMapLocationId, forwardDelta) {
		setTravellingToMapLocationId(newCurrentMapLocationId);
		setTravellingToMapLocationForwardDelta(forwardDelta === undefined ? 0 : forwardDelta);
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
				playerLookAtObjectPosition,
				setPlayerLookAtObjectPosition,
				currentMapLocationId,
				setCurrentMapLocationId,
				changeCurrentMapLocationId,
				travellingToMapLocationId,
				setTravellingToMapLocationId,
				travellingToMapLocationForwardDelta,
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
				scenesChangePlayerInitial,
				isDisplayingCreateHierarchyItemForm,
				setIsDisplayingCreateHierarchyItemForm,
			}}
		>
			{children}
		</LocationsContext.Provider>
	);
};

export default LocationsProvider;
