import React, { createContext, useState, useContext, useEffect, useRef, useMemo } from "react";

import { StoryContext } from "../../context/StoryContext";
import { RoutesContext } from "../../context/RoutesContext";

import { GetUnitServices } from "./GetUnitServices";

export const UnitPageContext = createContext();

const UnitPageProvider = ({ children, story_uid, unit_uid, unit_type, unit_type_title, type_url_key }) => {
	const { isAuthorizedToEdit, story, setStory, storyIcon, storyCharacters, storyCharacterTypes, storyCharacterRelationships, storyGroups } =
		useContext(StoryContext);
	const { locationParams, changeLocationParameters } = useContext(RoutesContext);

	const isGettingUnit = useRef(false);
	const currUnitUid = useRef(false);
	const [unit, setUnit] = useState(false);
	const [unitVersion, setUnitVersion] = useState(false);
	const [unitPrimaryImages, setUnitPrimaryImages] = useState([]);
	const [unitOverviewBackground, setUnitOverviewBackground] = useState(false);
	const [unitOverviewForegrounds, setUnitOverviewForegrounds] = useState([]);
	const [unitImages, setUnitImages] = useState([]);
	const [unitSoundtrack, setUnitSoundtrack] = useState(false);

	const [characterCardBackground, setCharacterCardBackground] = useState(false);
	const [characterFaceImage, setCharacterFaceImage] = useState(false);
	const [characterRelationships, setCharacterRelationships] = useState([]);
	const [characterRelationshipsAddedIds, setCharacterRelationshipsAddedIds] = useState([]);
	const [characterRelationshipsRemovedIds, setCharacterRelationshipsRemovedIds] = useState([]);
	const [characterRelationshipsCharacters, setCharacterRelationshipsCharacters] = useState(false);
	const [selectedCharacterRelationshipsCharacterId, setSelectedCharacterRelationshipsCharacterId] = useState(false);
	const [relationshipsFilters, setRelationshipsFilters] = useState(false);

	const [unitPageStyle, setUnitPageStyle] = useState(false);
	const [unitPagePaddingTop, setUnitPagePaddingTop] = useState(false);
	const unitPagePrimaryRef = useRef();

	const allSubpages = useMemo(
		() => [
			{ id: "physical", name: "Appearance", isEnabled: true, unit_types: ["character"] },
			{ id: "psychology", name: "Personality", isEnabled: true, unit_types: ["character"] },
			{ id: "biography", name: "Background", isEnabled: true, unit_types: ["character"] },
			{ id: "abilities", name: "Abilities & Equipment", isEnabled: true, unit_types: ["character"] },
			{ id: "relationships", name: "Relationships", isEnabled: true, unit_types: ["character"] },
			{ id: "details", name: "Details", isEnabled: true, unit_types: ["location"] },
			{ id: "events", name: "Events", isEnabled: true, unit_types: ["location"] },
			{ id: "plot", name: "Plot", isEnabled: true, unit_types: ["plot"] },
			{ id: "soundtrack", name: "Soundtrack", isEnabled: true, unit_types: ["plot"] },
			{ id: "gallery", name: "Gallery", isEnabled: true, unit_types: ["character", "plot", "group", "location"] },
			{ id: "miscellaneous", name: "Miscellaneous", isEnabled: true, unit_types: ["character", "plot", "group", "location"] },
			{ id: "development", name: "Development", isEnabled: true, unit_types: ["character", "plot", "group", "location"] },
			{ id: "settings", name: "Settings", isEnabled: true, unit_types: ["character", "plot", "group", "location"] },
		],
		[]
	);
	const [subpages, setSubpages] = useState([]);
	const [openSubpageID, setOpenSubpageID] = useState(false);
	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);

	const {
		getUnit,
		getUnitPrimaryImages,
		getUnitOverviewBackground,
		getUnitOverviewForegrounds,
		getUnitImages,
		getUnitSubpages,
		getCharacterRelationships,
		getUnitSoundtrack,
		getCharacterCardBackground,
		getCharacterFaceImage,
	} = GetUnitServices({
		story_uid,
		unit_uid,
		unit_type,
		isAuthorizedToEdit,
		isGettingUnit,
		currUnitUid,
		unit,
		setUnit,
		setUnitPageStyle,
		setUnitPagePaddingTop,
		setUnitPrimaryImages,
		setUnitOverviewBackground,
		setUnitOverviewForegrounds,
		setUnitImages,
		unitSoundtrack,
		setUnitSoundtrack,
		unitPagePrimaryRef,
		allSubpages,
		setSubpages,
		setOpenSubpageID,
		setCharacterCardBackground,
		setCharacterFaceImage,
		storyCharacters,
		setCharacterRelationships,
		setCharacterRelationshipsCharacters,
		storyCharacterRelationships,
	});

	useEffect(() => {
		async function getInitial() {
			if (currUnitUid.current === unit_uid || isGettingUnit.current) return false;
			const newUnit = await getUnit();
			if (!newUnit) return false;
			if (["character", "group"].includes(unit_type) && newUnit?.data?.versions[0]) setUnitVersion(newUnit.data.versions[0]);
			getUnitPrimaryImages(newUnit?.data?.versions);
			getUnitOverviewBackground(newUnit?.data?.overviewBackground);
			getUnitOverviewForegrounds(newUnit?.data?.versions);
			getUnitImages(newUnit?.data?.images);
			getUnitSubpages(newUnit?.data?.subpages);
			if (unit_type === "character") {
				getCharacterCardBackground(newUnit?.data?.cardBackground);
				getCharacterFaceImage(newUnit?.data?.faceImage);
			}
		}
		getInitial();
	}, [
		story_uid,
		unit_uid,
		unit_type,
		getUnit,
		getUnitPrimaryImages,
		getUnitOverviewBackground,
		getUnitOverviewForegrounds,
		getUnitImages,
		getUnitSubpages,
		getCharacterRelationships,
		getCharacterCardBackground,
		getCharacterFaceImage,
	]);

	function decrementUnitVersion() {
		if (!unit?.data?.versions) return;
		const currentVersionIndex = unit.data.versions.findIndex((e) => e._id === unitVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === 0) return;
		setUnitVersion(unit.data.versions[currentVersionIndex - 1]);
	}

	function incrementUnitVersion() {
		if (!unit?.data?.versions) return;
		const currentVersionIndex = unit.data.versions.findIndex((e) => e._id === unitVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === unit.data.versions.length - 1) return;
		setUnitVersion(unit?.data?.versions[currentVersionIndex + 1]);
	}

	function changeUnitVersion(newUnitVersion) {
		setUnitVersion(newUnitVersion);
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const unitVersionIndex = newUnit.data.versions.findIndex((e) => e._id === newUnitVersion._id);
			if (unitVersionIndex !== -1) newUnit.data.versions[unitVersionIndex] = newUnitVersion;
			return newUnit;
		});
	}

	const hasReadInitialLocationParameters = useRef(false);

	useEffect(() => {
		if (unit) {
			if (!hasReadInitialLocationParameters.current) {
				if (locationParams.current.findIndex((e) => e.label === "subpage") !== -1) {
					setIsOnOverviewSection(false);
					const newOpenSubpageID = locationParams.current.find((e) => e.label === "subpage")?.value;
					if (allSubpages.find((e) => e.id === newOpenSubpageID)?.unit_types?.includes(unit_type)) setOpenSubpageID(newOpenSubpageID);
				}
				if (locationParams.current.findIndex((e) => e.label === "version") !== -1) {
					const unitVersionIndex = unit.data.versions.findIndex(
						(e) => e._id === locationParams.current.find((e) => e.label === "version").value
					);
					if (unitVersionIndex !== -1) changeUnitVersion(unit.data.versions[unitVersionIndex]);
				}
				setTimeout(() => (hasReadInitialLocationParameters.current = true), 500);
			} else {
				let newLocationParameters = [];
				if (unit?.data?.versions && unitVersion?._id) newLocationParameters.push({ label: "version", value: unitVersion._id });
				if (!isOnOverviewSection) newLocationParameters.push({ label: "subpage", value: openSubpageID });
				changeLocationParameters(newLocationParameters);
			}
			if (unit?.data?.name && story?.data?.title)
				setTimeout(
					() => (document.title = unit?.data?.name + " | " + story?.data?.title + " | " + unit_type_title + " | Atlas Story App"),
					100
				);
		}
	}, [
		changeLocationParameters,
		hasReadInitialLocationParameters,
		locationParams,
		isOnOverviewSection,
		openSubpageID,
		unitVersion,
		unit,
		story,
		setOpenSubpageID,
		allSubpages,
		unit_type,
		unit_type_title,
	]);

	return (
		<UnitPageContext.Provider
			value={{
				isAuthorizedToEdit,
				story_uid,
				story,
				setStory,
				storyIcon,
				storyCharacters,
				storyCharacterTypes,
				storyCharacterRelationships,
				storyGroups,
				unit_uid,
				unit_type,
				unit_type_title,
				type_url_key,
				unit,
				setUnit,
				unitVersion,
				setUnitVersion,
				unitPrimaryImages,
				setUnitPrimaryImages,
				unitOverviewBackground,
				setUnitOverviewBackground,
				unitOverviewForegrounds,
				setUnitOverviewForegrounds,
				unitImages,
				setUnitImages,
				unitSoundtrack,
				setUnitSoundtrack,
				characterCardBackground,
				setCharacterCardBackground,
				characterFaceImage,
				setCharacterFaceImage,
				characterRelationships,
				setCharacterRelationships,
				characterRelationshipsAddedIds,
				setCharacterRelationshipsAddedIds,
				characterRelationshipsRemovedIds,
				setCharacterRelationshipsRemovedIds,
				characterRelationshipsCharacters,
				setCharacterRelationshipsCharacters,
				selectedCharacterRelationshipsCharacterId,
				setSelectedCharacterRelationshipsCharacterId,
				relationshipsFilters,
				setRelationshipsFilters,
				unitPageStyle,
				setUnitPageStyle,
				unitPagePaddingTop,
				setUnitPagePaddingTop,
				unitPagePrimaryRef,
				isOnOverviewSection,
				setIsOnOverviewSection,
				decrementUnitVersion,
				incrementUnitVersion,
				changeUnitVersion,
				subpages,
				openSubpageID,
				setOpenSubpageID,
				allSubpages,
				getUnitSoundtrack,
			}}
		>
			{children}
		</UnitPageContext.Provider>
	);
};

export default UnitPageProvider;
