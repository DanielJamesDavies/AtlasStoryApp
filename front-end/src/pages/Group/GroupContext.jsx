import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const GroupContext = createContext();

const GroupProvider = ({ children, story_uid, group_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location, locationParams, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, isInEditorMode, story, setStory, storyIcon, storyGroups } = useContext(StoryContext);

	const [failure, setFailure] = useState(false);

	const [group, setGroup] = useState(false);

	const [groupPrimaryImages, setGroupPrimaryImages] = useState([]);
	const [groupOverviewBackground, setGroupOverviewBackground] = useState(false);
	const [groupImages, setGroupImages] = useState([]);

	const [groupVersion, setGroupVersion] = useState(false);

	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	const allSubpages = useMemo(
		() => [
			{ id: "gallery", name: "Gallery", isEnabled: true },
			{ id: "miscellaneous", name: "Miscellaneous", isEnabled: true },
			{ id: "development", name: "Development", isEnabled: true },
			{ id: "settings", name: "Settings", isEnabled: true },
		],
		[]
	);
	const [subpages, setSubpages] = useState([]);
	const [openSubpageID, setOpenSubpageID] = useState(false);
	const [groupPaddingTop, setGroupPaddingTop] = useState(0);

	const curr_story_uid = useRef(false);
	const curr_group_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (failure || !story_uid || !group_uid) return setStateToDefault();
			if (curr_story_uid.current === story_uid && curr_group_uid.current === group_uid) return;
			if (!story || story.uid !== story_uid) return;
			curr_story_uid.current = story?.uid;

			let newGroup = await getGroup(story._id);
			if (!newGroup) return;

			// Document Title
			updateDocumentTitle(newGroup);
			setTimeout(() => updateDocumentTitle(newGroup), 1000);

			getGroupSubpages(newGroup?.data?.subpages, isAuthorizedToEdit);
			getGroupPrimaryImages(newGroup?.data?.versions);
			getGroupOverviewBackground(newGroup?.data?.overviewBackground);
			getGroupImages(newGroup?.data?.images);

			if (newGroup?.data?.versions[0]) setGroupVersion(newGroup.data.versions[0]);
		}

		function updateDocumentTitle(newGroup) {
			if (newGroup?.data?.name && story?.data?.title) {
				document.title = newGroup?.data?.name + " | " + story?.data?.title + " | Groups | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		function setStateToDefault() {
			setGroup(false);
			setGroupOverviewBackground(false);
		}

		async function getGroup(story_id) {
			if (!story_id) return;
			const group_response = await APIRequest("/group?uid=" + group_uid + "&story_id=" + story_id, "GET");
			if (!group_response?.data?.group || group_response?.error || group_response?.data?.group?.uid !== group_uid) {
				setStateToDefault();
				setFailure(true);
				return false;
			}
			setGroup((oldGroup) => {
				if (oldGroup._id === group_response.data.group._id) return oldGroup;
				return group_response.data.group;
			});
			curr_group_uid.current = group_response.data.group?.uid;
			return group_response.data.group;
		}

		function getGroupSubpages(groupSubpages, isAuthorizedToEdit) {
			let newSubpages = [];

			for (let i = 0; i < groupSubpages.length; i++) {
				let newSubpage = allSubpages.find((e) => e.id === groupSubpages[i].id);
				if (newSubpage) {
					newSubpage.isEnabled = groupSubpages[i]?.isEnabled;
					newSubpages.push(newSubpage);
				}
			}
			newSubpages = newSubpages.concat(allSubpages.filter((e) => newSubpages.findIndex((e2) => e2.id === e.id) === -1));

			setSubpages(newSubpages);
			setOpenSubpageID((oldOpenSubpageID) => {
				if (oldOpenSubpageID !== false) return oldOpenSubpageID;
				return newSubpages.filter((e) => (isAuthorizedToEdit ? e?.isEnabled : e?.isEnabled && e?.id !== "settings"))[0]?.id;
			});
		}

		async function getGroupPrimaryImages(versions) {
			if (!versions) return;

			const primaryImages = await Promise.all(
				versions.map(async (version) => {
					const recentImage = recentImages.current.find((e) => e?._id === version?.primaryImage);
					if (recentImage?.image) {
						return { _id: version._id, image: recentImage };
					} else {
						const primary_image_response = await APIRequest("/image/" + version?.primaryImage, "GET");
						if (primary_image_response?.errors || !primary_image_response?.data?.image?.image) {
							return { _id: version._id, image: { _id: version?.primaryImage, image: "NO_IMAGE" } };
						}
						addImagesToRecentImages([primary_image_response?.data?.image]);
						return { _id: version._id, image: primary_image_response?.data?.image };
					}
				})
			);

			setGroupPrimaryImages(primaryImages);

			return primaryImages;
		}

		async function getGroupOverviewBackground(overviewBackgroundID) {
			if (!overviewBackgroundID) return;

			let overviewBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === overviewBackgroundID);
			if (recentImage?.image) {
				overviewBackground = recentImage;
			} else {
				const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
				if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image?.image) {
					setGroupOverviewBackground("NO_IMAGE");
					return false;
				}
				overviewBackground = overview_background_image_response?.data?.image;
			}

			addImagesToRecentImages([overviewBackground]);

			setGroupOverviewBackground(overviewBackground.image);
			return overviewBackground.image;
		}

		async function getGroupImages(imageIDs) {
			if (!imageIDs) return;

			let newGroupImages = await Promise.all(
				imageIDs.map(async (imageID) => {
					if (!imageID) return false;

					const recentImage = recentImages.current.find((e) => e?._id === imageID);
					if (recentImage) return recentImage;

					const image_response = await APIRequest("/image/" + imageID, "GET");
					if (image_response?.errors || !image_response?.data?.image?.image) return false;
					return image_response.data.image;
				})
			);
			newGroupImages = newGroupImages.filter((e) => e !== false);

			addImagesToRecentImages(newGroupImages);

			setGroupImages(newGroupImages);
		}

		getInitial();
	}, [
		location,
		story_uid,
		group_uid,
		curr_story_uid,
		curr_group_uid,
		isAuthorizedToEdit,
		story,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		failure,
		setFailure,
		setStory,
		setGroup,
		allSubpages,
		setSubpages,
		setOpenSubpageID,
		setGroupOverviewBackground,
		setGroupImages,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	function changeGroupVersion(newGroupVersion) {
		setGroupVersion(newGroupVersion);
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			const groupVersionIndex = newGroup.data.versions.findIndex((e) => e._id === newGroupVersion._id);
			if (groupVersionIndex !== -1) newGroup.data.versions[groupVersionIndex] = newGroupVersion;
			return newGroup;
		});
	}

	function decrementGroupVersion() {
		if (!group?.data?.versions) return;
		const currentVersionIndex = group.data.versions.findIndex((e) => e._id === groupVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === 0) return;
		setGroupVersion(group.data.versions[currentVersionIndex - 1]);
	}

	function incrementGroupVersion() {
		if (!group?.data?.versions) return;
		const currentVersionIndex = group.data.versions.findIndex((e) => e._id === groupVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === group.data.versions.length - 1) return;
		setGroupVersion(group?.data?.versions[currentVersionIndex + 1]);
	}

	const hasReadInitialLocationParameters = useRef(false);

	useEffect(() => {
		if (group) {
			if (!hasReadInitialLocationParameters.current) {
				if (locationParams.current.findIndex((e) => e.label === "subpage") !== -1) {
					setIsOnOverviewSection(false);
					setOpenSubpageID(locationParams.current.find((e) => e.label === "subpage").value);
				}
				if (locationParams.current.findIndex((e) => e.label === "version") !== -1) {
					const groupVersionIndex = group.data.versions.findIndex(
						(e) => e._id === locationParams.current.find((e) => e.label === "version").value
					);
					if (groupVersionIndex !== -1) changeGroupVersion(JSON.parse(JSON.stringify(group.data.versions[groupVersionIndex])));
				}
				setTimeout(() => (hasReadInitialLocationParameters.current = true), 500);
			} else {
				let newLocationParameters = [];
				if (groupVersion?._id) newLocationParameters.push({ label: "version", value: groupVersion._id });
				if (!isOnOverviewSection || isInEditorMode.current) newLocationParameters.push({ label: "subpage", value: openSubpageID });
				changeLocationParameters(newLocationParameters);
			}
		}
	}, [
		changeLocationParameters,
		hasReadInitialLocationParameters,
		locationParams,
		isOnOverviewSection,
		openSubpageID,
		groupVersion,
		group,
		isInEditorMode,
	]);

	return (
		<GroupContext.Provider
			value={{
				story_uid,
				group_uid,
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				group,
				setGroup,
				storyGroups,
				groupPrimaryImages,
				setGroupPrimaryImages,
				groupOverviewBackground,
				setGroupOverviewBackground,
				groupImages,
				setGroupImages,
				groupVersion,
				setGroupVersion,
				changeGroupVersion,
				decrementGroupVersion,
				incrementGroupVersion,
				isOnOverviewSection,
				setIsOnOverviewSection,
				subpages,
				setSubpages,
				allSubpages,
				openSubpageID,
				setOpenSubpageID,
				groupPaddingTop,
				setGroupPaddingTop,
			}}
		>
			{children}
		</GroupContext.Provider>
	);
};

export default GroupProvider;
