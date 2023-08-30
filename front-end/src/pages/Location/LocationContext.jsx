import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const LocationContext = createContext();

const LocationProvider = ({ children, story_uid, location_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { locationPath, locationParams, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon } = useContext(StoryContext);

	const [failure, setFailure] = useState(false);

	const [location, setLocation] = useState(false);

	const [locationPrimaryImage, setLocationPrimaryImage] = useState(false);
	const [locationOverviewBackground, setLocationOverviewBackground] = useState(false);
	const [locationImages, setLocationImages] = useState([]);

	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	const allSubpages = useMemo(
		() => [
			{ id: "details", name: "Details", isEnabled: true },
			{ id: "events", name: "Events", isEnabled: true },
			{ id: "gallery", name: "Gallery", isEnabled: true },
			{ id: "miscellaneous", name: "Miscellaneous", isEnabled: true },
			{ id: "development", name: "Development", isEnabled: true },
			{ id: "settings", name: "Settings", isEnabled: true },
		],
		[]
	);
	const [subpages, setSubpages] = useState([]);
	const [openSubpageID, setOpenSubpageID] = useState(false);

	const curr_story_uid = useRef(false);
	const curr_location_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (failure || !story_uid || !location_uid) return setStateToDefault();
			if (curr_story_uid.current === story_uid && curr_location_uid.current === location_uid) return;
			if (!story || story.uid !== story_uid) return;
			curr_story_uid.current = story?.uid;

			let newLocation = await getLocation(story._id);
			if (!newLocation) return;

			// Document Title
			if (story?.data?.title && newLocation?.data?.title) {
				document.title = newLocation?.data?.title + " | " + story?.data?.title + " | Location | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + locationPath.current;
			}

			getLocationSubpages(newLocation?.data?.subpages, isAuthorizedToEdit);
			getLocationPrimaryImage(newLocation?.data?.primaryImage);
			getLocationOverviewBackground(newLocation?.data?.overviewBackground);
			getLocationImages(newLocation?.data?.images);
		}

		function setStateToDefault() {
			setLocation(false);
			setLocationOverviewBackground(false);
		}

		async function getLocation(story_id) {
			if (!story_id) return;
			const location_response = await APIRequest("/location?uid=" + location_uid + "&story_id=" + story_id, "GET");
			if (!location_response?.data?.location || location_response?.error || location_response?.data?.location?.uid !== location_uid) {
				setStateToDefault();
				setFailure(true);
				return false;
			}
			curr_location_uid.current = location_response?.data?.location?.uid;
			setLocation(location_response.data.location);
			return location_response.data.location;
		}

		function getLocationSubpages(locationSubpages, isAuthorizedToEdit) {
			let newSubpages = [];

			for (let i = 0; i < locationSubpages.length; i++) {
				let newSubpage = allSubpages.find((e) => e?.id === locationSubpages[i]?.id);
				if (newSubpage) {
					newSubpage.isEnabled = locationSubpages[i]?.isEnabled;
					newSubpages.push(newSubpage);
				} else {
					newSubpages.push(locationSubpages[i]);
				}
			}

			newSubpages = newSubpages.concat(allSubpages.filter((e) => newSubpages.findIndex((e2) => e2.id === e.id) === -1));

			setSubpages(newSubpages);
			setOpenSubpageID((oldOpenSubpageID) => {
				if (oldOpenSubpageID !== false) return oldOpenSubpageID;
				return newSubpages.filter((e) => (isAuthorizedToEdit ? e?.isEnabled : e?.isEnabled && e?.id !== "settings"))[0]?.id;
			});
		}

		async function getLocationPrimaryImage(primaryImageID) {
			if (!primaryImageID) return;

			let primaryImage = false;

			const recentImage = recentImages.current.find((e) => e?._id === primaryImageID);
			if (recentImage?.image) {
				primaryImage = recentImage;
			} else {
				const primary_image_response = await APIRequest("/image/" + primaryImageID, "GET");
				if (primary_image_response?.errors || !primary_image_response?.data?.image?.image) {
					setLocationOverviewBackground("NO_IMAGE");
					return false;
				}
				primaryImage = primary_image_response?.data?.image;
			}

			addImagesToRecentImages([primaryImage]);

			setLocationPrimaryImage(primaryImage.image);
			return primaryImage.image;
		}

		async function getLocationOverviewBackground(overviewBackgroundID) {
			if (!overviewBackgroundID) return;

			let overviewBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === overviewBackgroundID);
			if (recentImage?.image) {
				overviewBackground = recentImage;
			} else {
				const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
				if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image?.image) {
					setLocationOverviewBackground("NO_IMAGE");
					return false;
				}
				overviewBackground = overview_background_image_response?.data?.image;
			}

			addImagesToRecentImages([overviewBackground]);

			setLocationOverviewBackground(overviewBackground.image);
			return overviewBackground.image;
		}

		async function getLocationImages(imageIDs) {
			if (!imageIDs) return;

			let newLocationImages = await Promise.all(
				imageIDs.map(async (imageID) => {
					if (!imageID) return false;

					const recentImage = recentImages.current.find((e) => e?._id === imageID);
					if (recentImage) return recentImage;

					const image_response = await APIRequest("/image/" + imageID, "GET");
					console.log(imageID);
					if (image_response?.errors || !image_response?.data?.image?.image) return false;
					return image_response.data.image;
				})
			);
			newLocationImages = newLocationImages.filter((e) => e !== false);

			addImagesToRecentImages(newLocationImages);

			setLocationImages(newLocationImages);
			return newLocationImages;
		}

		getInitial();
	}, [
		locationPath,
		story_uid,
		story,
		location_uid,
		curr_story_uid,
		curr_location_uid,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		failure,
		setFailure,
		isAuthorizedToEdit,
		allSubpages,
		setLocation,
		setOpenSubpageID,
		setLocationPrimaryImage,
		setLocationOverviewBackground,
		setLocationImages,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	const hasReadInitialLocationParameters = useRef(false);

	useEffect(() => {
		if (location) {
			if (!hasReadInitialLocationParameters.current) {
				if (locationParams.current.findIndex((e) => e.label === "subpage") !== -1) {
					setIsOnOverviewSection(false);
					setOpenSubpageID(locationParams.current.find((e) => e.label === "subpage").value);
				}
				setTimeout(() => (hasReadInitialLocationParameters.current = true), 500);
			} else {
				let newLocationParameters = [];
				if (!isOnOverviewSection) newLocationParameters.push({ label: "subpage", value: openSubpageID });
				changeLocationParameters(newLocationParameters);
			}
		}
	}, [changeLocationParameters, hasReadInitialLocationParameters, locationParams, isOnOverviewSection, openSubpageID, location]);

	return (
		<LocationContext.Provider
			value={{
				story_uid,
				location_uid,
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				location,
				setLocation,
				locationPrimaryImage,
				setLocationPrimaryImage,
				locationOverviewBackground,
				setLocationOverviewBackground,
				locationImages,
				setLocationImages,
				isOnOverviewSection,
				setIsOnOverviewSection,
				allSubpages,
				subpages,
				setSubpages,
				openSubpageID,
				setOpenSubpageID,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};

export default LocationProvider;
