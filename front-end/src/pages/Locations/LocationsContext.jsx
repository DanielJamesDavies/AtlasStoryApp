import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaBullseye, FaDiceD6, FaDotCircle, FaGlobe, FaGlobeEurope, FaMap, FaMoon, FaProjectDiagram, FaSatellite, FaSun } from "react-icons/fa";

import { RoutesContext } from "../../context/RoutesContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { StoryContext } from "../../context/StoryContext";

import { HierarchyFunctions } from "./HierarchyFunctions";

export const LocationsContext = createContext();

const LocationsProvider = ({ children, story_uid }) => {
	const locationTypes = [
		{
			type: "reality",
			name: "Reality",
			icon: <FaDiceD6 />,
			possibleParents: ["reality"],
			defaultScale: 1,
			defaultPoints: [0, 0],
			hasMapScene: false,
		},
		{
			type: "universe",
			name: "Universe",
			icon: <FaGlobe />,
			possibleParents: ["reality"],
			defaultScale: 1,
			defaultPoints: [0, 0],
			hasMapScene: false,
		},
		{
			type: "galaxy",
			name: "Galaxy",
			icon: <FaBullseye />,
			possibleParents: ["reality", "universe"],
			defaultScale: 1,
			defaultPoints: [0, 0],
			hasMapScene: false,
		},
		{
			type: "starCluster",
			name: "Star Cluster",
			icon: <FaProjectDiagram />,
			possibleParents: ["reality", "galaxy"],
			defaultScale: 1,
			defaultPoints: [0, 0],
			hasMapScene: true,
		},
		{
			type: "starSystem",
			name: "Star System",
			icon: <FaDotCircle />,
			possibleParents: ["reality", "starCluster"],
			defaultScale: 149597870700 * 100000,
			defaultPoints: [0, 0],
			hasMapScene: true,
		},
		{
			type: "star",
			name: "Star",
			icon: <FaSun />,
			possibleParents: ["reality", "starSystem"],
			defaultScale: 1392700000,
			defaultPoints: [0, 0],
			hasMapScene: true,
		},
		{
			type: "planet",
			name: "Planet",
			icon: <FaGlobeEurope />,
			possibleParents: ["reality", "starSystem"],
			defaultScale: 12742000,
			defaultPoints: [149600000, 149600000],
			hasMapScene: true,
		},
		{
			type: "moon",
			name: "Moon",
			icon: <FaMoon />,
			possibleParents: ["reality", "planet"],
			defaultScale: 3474800,
			defaultPoints: [384399, 384399],
			hasMapScene: true,
		},
		{
			type: "artificialSatellite",
			name: "Artificial Satellite",
			icon: <FaSatellite />,
			possibleParents: ["reality", "planet", "moon"],
			defaultScale: 1,
			defaultPoints: [6738, 6738],
			hasMapScene: false,
		},
		{
			type: "surfaceLocation",
			name: "Surface Location",
			icon: <FaMap />,
			possibleParents: ["reality", "planet", "moon", "artificialSatellite", "surfaceLocation"],
			defaultScale: 1,
			defaultPoints: [0, 0],
			hasMapScene: false,
		},
	];

	const { location, changeLocation, locationPath } = useContext(RoutesContext);
	const { APIRequest } = useContext(APIContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, locations, setLocations, createUnitForm } = useContext(StoryContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { getItemFromIdInHierarchy, getInitialMapLocationItem } = HierarchyFunctions();

	const [isOnMap, setIsOnMap] = useState(false);
	const [isOnSpaceMap, setIsOnSpaceMap] = useState(true);
	const [isHidingSpaceMap, setIsHidingSpaceMap] = useState(false);

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
	const [mapObjectLocations, setMapObjectLocations] = useState([]);
	const [locations3DMapImages, setLocations3DMapImages] = useState(false);
	const [selectedSurfaceMapComponents, setSelectedSurfaceMapComponents] = useState([]);
	const [surfaceMapComponentsList, setSurfaceMapComponentsList] = useState([]);
	const [surfaceMapHoveringRegion, setSurfaceMapHoveringRegion] = useState(false);
	const [isSelectingSurfaceMapComponents, setIsSelectingSurfaceMapComponents] = useState(false);
	const [regionSelectingSurfaceMapComponentsFor, setRegionSelectingSurfaceMapComponentsFor] = useState(false);
	const [isDrawingSurfaceMapComponents, setIsDrawingSurfaceMapComponents] = useState(false);
	const [isDeletingSurfaceMapComponents, setIsDeletingSurfaceMapComponents] = useState(false);
	const [isPositioningSurfaceMapPlace, setIsPositioningSurfaceMapPlace] = useState(false);
	const [positioningPlaceID, setPositioningPlaceID] = useState(false);
	const [regionItemHoveringOver, setRegionItemHoveringOver] = useState(false);
	const [mapVersionID, setMapVersionID] = useState(false);
	const [locationMapComponentsImages, setLocationMapComponentsImages] = useState(false);
	const [locationMapImage, setLocationMapImage] = useState(false);
	const [locationMapComponentsImage, setLocationMapComponentsImage] = useState(false);
	const [locationMapImages, setLocationMapImages] = useState(false);
	const locationsSurfaceMapLoadingCircleContainerRef = useRef();

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
			position_old: [-10.5, -2.5, 10],
			position: [0.3, -0.1, 1.2],
			rotation: [7 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "moon",
			position: [-10.5, -2.5, 20],
			rotation: [7 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
	]);

	const [isDisplayingCreateLocationForm, setIsDisplayingCreateLocationForm] = useState(false);

	const url_location = useRef(false);
	useEffect(() => {
		if (location.split("/").filter((e) => e.length !== 0).length > 3) {
			url_location.current = location.split("/").filter((e) => e.length !== 0)[3];
		}
	}, [location]);

	const updateSurfaceMapComponentsList = useCallback(
		(newMapVersion) => {
			let newSurfaceMapComponentsList = [];
			newMapVersion?.regions?.map((region) => {
				region?.components?.map((component) => {
					if (newSurfaceMapComponentsList.length - 1 < component) {
						for (let i = 0; i < component - newSurfaceMapComponentsList.length - 1; i++) {
							newSurfaceMapComponentsList.push(false);
						}
					}
					newSurfaceMapComponentsList[component] = region?._id;
					return component;
				});
				return region;
			});
			setSurfaceMapComponentsList(newSurfaceMapComponentsList);
		},
		[setSurfaceMapComponentsList]
	);

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

			const newLocations = await getLocations();
			getInitialMapLocationId(newLocations);
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
			if (url_location.current && story?.data?.locationsHierarchy) {
				newCurrentMapLocationItem = getItemFromIdInHierarchy(
					url_location.current,
					JSON.parse(JSON.stringify(story.data.locationsHierarchy))
				);
				if (newCurrentMapLocationItem?._id !== undefined) {
					setCurrentMapLocationId(newCurrentMapLocationItem._id);
					return newCurrentMapLocationItem._id;
				}
			}

			newCurrentMapLocationItem = getInitialMapLocationItem(story.data.locationsHierarchy, newLocations);
			if (newCurrentMapLocationItem?._id === undefined) return false;
			setCurrentMapLocationId(newCurrentMapLocationItem._id);
			return newCurrentMapLocationItem._id;
		}

		async function getLocations() {
			const response = await APIRequest("/location?story_uid=" + story_uid, "GET");
			if (!response || response?.errors || !response?.data?.locations) return false;
			setLocations(response.data.locations);
			getLocations3DMapImages(response.data.locations);
			return response.data.locations;
		}

		async function getLocations3DMapImages(locations) {
			const newLocations3DMapImages = (
				await Promise.all(
					locations.map(async (location) => {
						let mapImage = false;
						const recentImage = recentImages.current.find((e) => e?._id === location?.data?.mapVersions?.[0]?.mapImage);
						if (recentImage?.image) {
							mapImage = recentImage;
						} else {
							const map_image_response = await APIRequest("/image/" + location?.data?.mapVersions?.[0]?.mapImage, "GET");
							if (map_image_response?.errors || !map_image_response?.data?.image?.image) return false;
							mapImage = map_image_response?.data?.image;

							addImagesToRecentImages([mapImage]);
						}
						return { ...mapImage, ...{ location_id: location?._id } };
					})
				)
			).filter((e) => e !== false);
			setLocations3DMapImages(newLocations3DMapImages);
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
		setLocations3DMapImages,
		setCurrentMapLocationId,
		getItemFromIdInHierarchy,
		getInitialMapLocationItem,
		url_location,
		recentImages,
		addImagesToRecentImages,
		updateSurfaceMapComponentsList,
	]);

	useEffect(() => {
		const location = locations.find((e) => e?._id === currentMapLocationId);
		const mapVersion = location?.data?.mapVersions?.find((e) => e?._id === mapVersionID);
		updateSurfaceMapComponentsList(mapVersion);
	}, [locations, currentMapLocationId, updateSurfaceMapComponentsList, mapVersionID]);

	const prev_map_location_id = useRef(false);
	useEffect(() => {
		if (isOnMap && JSON.stringify(prev_map_location_id.current) !== JSON.stringify(currentMapLocationId)) {
			prev_map_location_id.current = JSON.parse(JSON.stringify(currentMapLocationId));
			setHoverMapLocationId(false);
			const storyUid = document.location.pathname.split("/").filter((e) => e.length !== 0)[1];
			const isOnLocations = document.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "locations";
			if (isOnLocations && currentMapLocationId) changeLocation("/s/" + storyUid + "/locations/" + currentMapLocationId);
		}
	}, [isOnMap, currentMapLocationId, changeLocation]);

	useEffect(() => {
		if (locationPath.current.split("/").filter((e) => e.length !== 0).length === 4) {
			setIsOnMap(true);
		}
	}, [locationPath, setIsOnMap]);

	const hasGotIsOnSpaceMapForLocation = useRef(false);
	const getInitialIsOnSpaceMap = useCallback(() => {
		const location_id = locationPath.current
			.split("/")
			.filter((e) => e.length !== 0)
			.at(-1);

		if (hasGotIsOnSpaceMapForLocation.current === location_id) return false;

		if (locations.length === 0) return false;

		hasGotIsOnSpaceMapForLocation.current = location_id;

		const curr_location_type = locations.find((e) => e?._id === location_id)?.type;

		if (!["planet", "moon"].includes(curr_location_type)) setIsOnSpaceMap(curr_location_type !== "surfaceLocation");
	}, [setIsOnSpaceMap, locationPath, locations, hasGotIsOnSpaceMapForLocation]);

	useEffect(() => {
		getInitialIsOnSpaceMap();
	}, [isOnMap, setIsOnSpaceMap, getInitialIsOnSpaceMap]);

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

	const addToMapObjectLocations = useCallback(
		(newMapObjectLocation) => {
			setMapObjectLocations((oldMapObjectLocations) => {
				let newMapObjectLocations = JSON.parse(JSON.stringify(oldMapObjectLocations));
				const locationIndex = newMapObjectLocations.findIndex((e) => e._id === newMapObjectLocation._id);
				if (locationIndex === -1) {
					newMapObjectLocations.push(newMapObjectLocation);
				} else {
					newMapObjectLocations[locationIndex] = newMapObjectLocation;
				}
				return newMapObjectLocations;
			});
		},
		[setMapObjectLocations]
	);

	useEffect(() => {
		if (story?.data?.title) {
			if (isOnMap) {
				const location = locations?.find((e) => e?._id === currentMapLocationId);
				if (location?.data?.name) {
					document.title = location?.data?.name + " | Locations | " + story?.data?.title + " | Atlas Story App";
					const current_url = JSON.parse(JSON.stringify(window?.location?.href));
					setTimeout(() => {
						if (JSON.stringify(current_url) === JSON.stringify(window?.location?.href)) {
							document.title = location?.data?.name + " | Locations | " + story?.data?.title + " | Atlas Story App";
						}
					}, 500);
				} else {
					document.title = "Locations | " + story?.data?.title + " | Atlas Story App";
				}
			} else {
				document.title = "Locations | " + story?.data?.title + " | Atlas Story App";
			}
		}
	}, [isOnMap, currentMapLocationId, locations, story]);

	const addComponentToSelectedSurfaceMapComponents = useCallback(
		(new_index) => {
			setSelectedSurfaceMapComponents((oldValue) => [...new Set(oldValue.concat([new_index]))]);
		},
		[setSelectedSurfaceMapComponents]
	);

	const removeComponentToSelectedSurfaceMapComponents = useCallback(
		(old_index) => {
			setSelectedSurfaceMapComponents((oldValue) => [...new Set(oldValue.filter((e) => e !== old_index))]);
		},
		[setSelectedSurfaceMapComponents]
	);

	const [createLocationsValues, setCreateLocationsValues] = useState({});

	const lastCreateUnitForm = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateUnitForm?.current) !== JSON.stringify(createUnitForm)) {
			lastCreateUnitForm.current = JSON.parse(JSON.stringify(createUnitForm));
			if (createUnitForm?.unit_type === "location") {
				setIsDisplayingCreateLocationForm(true);

				setCreateLocationsValues({ name: createUnitForm?.name, uid: createUnitForm?.uid });
			}
		}
	}, [createUnitForm, setCreateLocationsValues, setIsDisplayingCreateLocationForm, lastCreateUnitForm]);

	return (
		<LocationsContext.Provider
			value={{
				story_uid,
				locationTypes,
				isAuthorizedToEdit,
				story,
				setStory,
				changeStoryHierarchy,
				storyIcon,
				locations,
				setLocations,
				isOnMap,
				setIsOnMap,
				isOnSpaceMap,
				setIsOnSpaceMap,
				isHidingSpaceMap,
				setIsHidingSpaceMap,
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
				mapObjectLocations,
				setMapObjectLocations,
				addToMapObjectLocations,
				locations3DMapImages,
				setLocations3DMapImages,
				isSelectingSurfaceMapComponents,
				setIsSelectingSurfaceMapComponents,
				regionSelectingSurfaceMapComponentsFor,
				setRegionSelectingSurfaceMapComponentsFor,
				selectedSurfaceMapComponents,
				setSelectedSurfaceMapComponents,
				addComponentToSelectedSurfaceMapComponents,
				removeComponentToSelectedSurfaceMapComponents,
				surfaceMapComponentsList,
				setSurfaceMapComponentsList,
				updateSurfaceMapComponentsList,
				surfaceMapHoveringRegion,
				setSurfaceMapHoveringRegion,
				isDrawingSurfaceMapComponents,
				setIsDrawingSurfaceMapComponents,
				isDeletingSurfaceMapComponents,
				setIsDeletingSurfaceMapComponents,
				scenesChangePlayerInitial,
				isDisplayingCreateLocationForm,
				setIsDisplayingCreateLocationForm,
				isPositioningSurfaceMapPlace,
				setIsPositioningSurfaceMapPlace,
				positioningPlaceID,
				setPositioningPlaceID,
				regionItemHoveringOver,
				setRegionItemHoveringOver,
				mapVersionID,
				setMapVersionID,
				locationMapComponentsImages,
				setLocationMapComponentsImages,
				locationMapImage,
				setLocationMapImage,
				locationMapComponentsImage,
				setLocationMapComponentsImage,
				locationMapImages,
				setLocationMapImages,
				locationsSurfaceMapLoadingCircleContainerRef,
				createLocationsValues,
				setCreateLocationsValues,
			}}
		>
			{children}
		</LocationsContext.Provider>
	);
};

export default LocationsProvider;
