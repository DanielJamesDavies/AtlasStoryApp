import React, { createContext, useState, useContext, useEffect, useRef, useMemo, useCallback } from "react";

import { StoryContext } from "../../context/StoryContext";
import { RoutesContext } from "../../context/RoutesContext";

import { GetUnitServices } from "./GetUnitServices";

import getValueInNestedObject from "../../services/GetValueInNestedObject";
import changeValueInNestedObject from "../../services/ChangeValueInNestedObject";
import {
	FaBookReader,
	FaBrain,
	FaCalendarAlt,
	FaCog,
	FaCommentDots,
	FaEye,
	FaFeatherAlt,
	FaFileAlt,
	FaHardHat,
	FaImages,
	FaMusic,
	FaTools,
	FaUsers,
} from "react-icons/fa";

export const UnitPageContext = createContext();

const UnitPageProvider = ({ children, story_uid, unit_uid, unit_type, unit_type_title, type_url_key }) => {
	const {
		isAuthorizedToEdit,
		story,
		setStory,
		storyIcon,
		storyCharacters,
		storyCharacterTypes,
		storyCharacterRelationships,
		storyGroups,
		unitValueToChange,
		getUnitValue,
		getUnitAndCurrUnitVersion,
	} = useContext(StoryContext);
	const { locationParams, changeLocationParameters, routesUnitSubpageID, routesIsOnOverviewSection } = useContext(RoutesContext);

	const isGettingUnit = useRef(false);
	const currUnitUid = useRef(false);
	const [unit, setUnit] = useState(false);
	const [unitVersion, setUnitVersion] = useState(false);
	const [unitPrimaryImages, setUnitPrimaryImages] = useState([]);
	const [unitOverviewBackground, setUnitOverviewBackground] = useState(false);
	const [unitOverviewForegrounds, setUnitOverviewForegrounds] = useState(false);
	const [unitImages, setUnitImages] = useState([]);
	const [unitSoundtrack, setUnitSoundtrack] = useState(false);
	const [unitListImage, setUnitListImage] = useState(false);
	const [unitVersionItemCopying, setUnitVersionItemCopying] = useState(false);

	const [characterCardBackground, setCharacterCardBackground] = useState(false);
	const [characterFaceImage, setCharacterFaceImage] = useState(false);
	const [characterRelationships, setCharacterRelationships] = useState([]);
	const [characterRelationshipsAddedIds, setCharacterRelationshipsAddedIds] = useState([]);
	const [characterRelationshipsRemovedIds, setCharacterRelationshipsRemovedIds] = useState([]);
	const [characterRelationshipsCharacters, setCharacterRelationshipsCharacters] = useState(false);
	const [selectedCharacterRelationshipsCharacterId, setSelectedCharacterRelationshipsCharacterId] = useState(false);
	const [relationshipsFilters, setRelationshipsFilters] = useState(false);

	const [locationMapImages, setLocationMapImages] = useState(false);
	const [locationMapComponents, setLocationMapComponents] = useState(false);

	const [unitPageStyle, setUnitPageStyle] = useState(false);
	const [unitPagePaddingTop, setUnitPagePaddingTop] = useState(false);
	const unitPagePrimaryRef = useRef();

	const allSubpages = useMemo(
		() => [
			{ id: "physical", name: "Appearance", isEnabled: true, unit_types: ["character"], icon: <FaEye /> },
			{ id: "psychology", name: "Personality", isEnabled: true, unit_types: ["character"], icon: <FaBrain /> },
			{ id: "biography", name: "Background", isEnabled: true, unit_types: ["character"], icon: <FaBookReader /> },
			{ id: "abilities", name: "Abilities", isEnabled: true, unit_types: ["character"], icon: <FaTools /> },
			{ id: "relationships", name: "Relationships", isEnabled: true, unit_types: ["character"], icon: <FaUsers /> },
			{ id: "details", name: "Details", isEnabled: true, unit_types: ["location", "object", "lore", "event"], icon: <FaFileAlt /> },
			{ id: "events", name: "Events", isEnabled: true, unit_types: ["location", "lore"], icon: <FaCalendarAlt /> },
			{ id: "plot", name: "Plot", isEnabled: true, unit_types: ["plot"], icon: <FaFeatherAlt /> },
			{ id: "soundtrack", name: "Soundtrack", isEnabled: true, unit_types: ["plot"], icon: <FaMusic /> },
			{
				id: "gallery",
				name: "Gallery",
				isEnabled: true,
				unit_types: ["character", "plot", "group", "location", "object", "lore", "event"],
				icon: <FaImages />,
			},
			{
				id: "miscellaneous",
				name: "Miscellaneous",
				isEnabled: true,
				unit_types: ["character", "plot", "group", "location", "object", "lore", "event"],
				icon: <FaCommentDots />,
			},
			{
				id: "development",
				name: "Development",
				isEnabled: true,
				unit_types: ["character", "plot", "group", "location", "object", "lore", "event"],
				icon: <FaHardHat />,
			},
			{
				id: "settings",
				name: "Settings",
				isEnabled: true,
				unit_types: ["character", "plot", "group", "location", "object", "lore", "event"],
				icon: <FaCog />,
			},
		],
		[]
	);
	const [subpages, setSubpages] = useState([]);
	const [openSubpageID, setOpenSubpageID] = useState(false);
	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	const [isUnitPageSubpagesHeaderFullSize, setIsUnitPageSubpagesHeaderFullSize] = useState(true);

	useEffect(() => {
		if (routesUnitSubpageID) {
			setOpenSubpageID(routesUnitSubpageID);
			setIsOnOverviewSection(false);
		}
	}, [routesUnitSubpageID, setOpenSubpageID]);

	const hasCompletedInitial = useRef(false);
	useEffect(() => {
		if (hasCompletedInitial.current) {
			setIsOnOverviewSection(routesIsOnOverviewSection);
		} else {
			hasCompletedInitial.current = true;
		}
	}, [routesIsOnOverviewSection, hasCompletedInitial]);

	const changeUnitValueToChange = useCallback(() => {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			if (unitValueToChange?.unit_id !== newUnit?._id) return newUnit;

			let newPath = JSON.parse(JSON.stringify(unitValueToChange?.path));

			newPath = newPath
				?.map((path_item, index) => {
					if (!unitVersion && ["versions", "VERSION_ID"].includes(path_item)) {
						return false;
					}
					if (path_item === "VERSION_ID") {
						return newUnit?.data?.versions?.findIndex((e) => e?._id === unitVersion?._id);
					} else if (index !== 0 && newPath[index - 1] === "versions") {
						return newUnit?.data?.versions?.findIndex((e) => e?._id === path_item);
					}
					return path_item;
				})
				?.filter((e) => e !== false);

			if (unitValueToChange?.isList) {
				if (unitValueToChange?.label) {
					newUnit = changeValueInNestedObject(newUnit, newPath.concat("title"), unitValueToChange?.label);
				}
				if (unitValueToChange?.text) {
					newUnit = changeValueInNestedObject(newUnit, newPath.concat("text"), unitValueToChange?.text);
				} else if (unitValueToChange?.newValue) {
					if (JSON.stringify(typeof unitValueToChange?.newValue) !== JSON.stringify("array")) {
						newUnit = changeValueInNestedObject(newUnit, newPath.concat("text"), unitValueToChange?.newValue?.split("\n"));
					} else {
						newUnit = changeValueInNestedObject(newUnit, newPath.concat("text"), unitValueToChange?.newValue);
					}
				}
			} else {
				newUnit = changeValueInNestedObject(newUnit, newPath, unitValueToChange?.newValue);
			}

			const newPathVersionsIndex = newPath?.findIndex((e) => e === "versions");
			if (newPathVersionsIndex !== -1 && newPathVersionsIndex + 1 < newPath?.length - 1) {
				const newVersionIndex = newPath[newPathVersionsIndex + 1];
				const newVersion = newUnit?.data?.versions[newVersionIndex];
				setUnitVersion((oldVersion) => {
					if (oldVersion?._id !== newVersion?._id) return oldVersion;
					return newVersion;
				});
			}

			return newUnit;
		});
	}, [setUnit, unitValueToChange, unitVersion, setUnitVersion]);

	const lastUnitValueToChange = useRef(false);
	useEffect(() => {
		if (JSON.stringify(unitValueToChange) !== JSON.stringify(lastUnitValueToChange?.current)) {
			lastUnitValueToChange.current = JSON.parse(JSON.stringify(unitValueToChange));
			changeUnitValueToChange();
		}
	}, [unitValueToChange, changeUnitValueToChange, lastUnitValueToChange]);

	useEffect(() => {
		getUnitValue.current = (unit_id, path) => {
			let newUnit = JSON.parse(JSON.stringify(unit));

			if (unit_id !== newUnit?._id) return false;

			let newPath = JSON.parse(JSON.stringify(path));
			newPath = newPath
				?.map((path_item, index) => {
					if (!unitVersion && ["versions", "VERSION_ID"].includes(path_item)) {
						return false;
					}
					if (path_item === "VERSION_ID") {
						return newUnit?.data?.versions?.findIndex((e) => e?._id === unitVersion?._id);
					} else if (index !== 0 && newPath[index - 1] === "versions") {
						return newUnit?.data?.versions?.findIndex((e) => e?._id === path_item);
					}
					return path_item;
				})
				?.filter((e) => e !== false);

			return getValueInNestedObject(unit, newPath);
		};
	}, [getUnitValue, unit, unitVersion]);

	useEffect(() => {
		getUnitAndCurrUnitVersion.current = () => {
			let newUnit = JSON.parse(JSON.stringify(unit));
			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			return { unit: newUnit, unitVersion: newUnitVersion };
		};
	}, [getUnitAndCurrUnitVersion, unit, unitVersion]);

	const {
		getUnit,
		getUnitPrimaryImages,
		getUnitOverviewBackground,
		getUnitOverviewForegrounds,
		getUnitImages,
		getUnitSubpages,
		getCharacterRelationships,
		getUnitSoundtrack,
		getUnitListImage,
		getCharacterCardBackground,
		getCharacterFaceImage,
		getLocationMapImages,
		getLocationMapComponents,
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
		unitListImage,
		setUnitListImage,
		unitPagePrimaryRef,
		allSubpages,
		setSubpages,
		setOpenSubpageID,
		setCharacterCardBackground,
		setCharacterFaceImage,
		storyCharacters,
		characterRelationships,
		setCharacterRelationships,
		setCharacterRelationshipsCharacters,
		storyCharacterRelationships,
		storyGroups,
		setLocationMapImages,
		setLocationMapComponents,
	});

	useEffect(() => {
		async function getInitial() {
			if (currUnitUid.current === unit_uid || isGettingUnit.current) return false;
			setValuesToDefault();
			const newUnit = await getUnit();
			if (!newUnit) return false;
			if (["character", "group"].includes(unit_type) && newUnit?.data?.versions[0]) {
				setUnitVersion(newUnit.data.versions[0]);
				getUnitPrimaryImages(newUnit?.data?.versions);
			}
			getUnitOverviewBackground(newUnit?.data?.overviewBackground);
			getUnitOverviewForegrounds(newUnit?.data?.versions);
			getUnitImages(newUnit?.data?.images);
			getUnitSubpages(newUnit?.data?.subpages);
			if (["object", "lore"].includes(unit_type)) {
				getUnitListImage(newUnit?.data?.listImage);
			}
			if (unit_type === "character") {
				getCharacterCardBackground(newUnit?.data?.cardBackground);
				getCharacterFaceImage(newUnit?.data?.faceImage);
			}
			if (unit_type === "location") {
				getLocationMapImages(newUnit?.data?.mapVersions);
				getLocationMapComponents(newUnit?.data?.mapVersions);
			}
		}

		function setValuesToDefault() {
			setUnit(false);
			setUnitVersion(false);
			setUnitPrimaryImages([]);
			setUnitOverviewBackground(false);
			setUnitOverviewForegrounds(false);
			setUnitImages([]);
			setUnitSoundtrack(false);
			setUnitListImage(false);
			setUnitVersionItemCopying(false);
			setCharacterCardBackground(false);
			setCharacterFaceImage(false);
			setCharacterRelationships([]);
			setCharacterRelationshipsAddedIds([]);
			setCharacterRelationshipsRemovedIds([]);
			setCharacterRelationshipsCharacters(false);
			setSelectedCharacterRelationshipsCharacterId(false);
			setRelationshipsFilters(false);
			setUnitPageStyle(false);
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
		getUnitListImage,
		getCharacterRelationships,
		getCharacterCardBackground,
		getCharacterFaceImage,
		getLocationMapImages,
		getLocationMapComponents,
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

	const changeUnitVersion = useCallback(
		(newUnitVersion) => {
			setUnitVersion(newUnitVersion);
			setUnit((oldUnit) => {
				let newUnit = JSON.parse(JSON.stringify(oldUnit));
				const unitVersionIndex = newUnit.data.versions.findIndex((e) => e._id === newUnitVersion._id);
				if (unitVersionIndex !== -1) newUnit.data.versions[unitVersionIndex] = newUnitVersion;
				return newUnit;
			});
		},
		[setUnitVersion, setUnit]
	);

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
				changeLocationParameters(locationParams.current.filter((e) => ["version", "subpage"].includes(e?.label)));
				setTimeout(() => (hasReadInitialLocationParameters.current = true), 500);
			} else {
				let newLocationParameters = [];
				if (unit?.data?.versions && unitVersion?._id) newLocationParameters.push({ label: "version", value: unitVersion._id });
				if (!isOnOverviewSection) newLocationParameters.push({ label: "subpage", value: openSubpageID });
				changeLocationParameters(newLocationParameters);
			}
			if (["plot"].includes(unit_type)) {
				if (unit?.data?.title && story?.data?.title) {
					setTimeout(
						() => (document.title = unit?.data?.title + " | " + story?.data?.title + " | " + unit_type_title + " | Atlas Story App"),
						100
					);
				}
			} else {
				if (unit?.data?.name && story?.data?.title) {
					setTimeout(
						() => (document.title = unit?.data?.name + " | " + story?.data?.title + " | " + unit_type_title + " | Atlas Story App"),
						100
					);
				}
			}
		}
	}, [
		locationParams,
		changeLocationParameters,
		hasReadInitialLocationParameters,
		isOnOverviewSection,
		openSubpageID,
		unitVersion,
		unit,
		story,
		setOpenSubpageID,
		allSubpages,
		unit_type,
		unit_type_title,
		changeUnitVersion,
	]);

	const changeUnitVersionItemCopying = useCallback(
		(item) => {
			if (!unitVersion?._id) return false;
			setUnitVersionItemCopying({ version: unitVersion?._id, item });
		},
		[unitVersion]
	);

	const pasteVersionItemCopying = useCallback(
		(item) => {
			const newUnit = JSON.parse(JSON.stringify(unit));
			const newUnitVersionItemCopying = JSON.parse(JSON.stringify(unitVersionItemCopying));
			if (JSON.stringify(newUnitVersionItemCopying?.item) === JSON.stringify(item)) {
				const oldVersionIndex = newUnit?.data?.versions?.findIndex((e) => e?._id === newUnitVersionItemCopying?.version);
				if (oldVersionIndex === -1) return false;
				let newValue = getValueInNestedObject(newUnit?.data?.versions[oldVersionIndex], newUnitVersionItemCopying?.item);
				let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
				newUnitVersion = changeValueInNestedObject(newUnitVersion, item, newValue);
				changeUnitVersion(newUnitVersion);
				return newValue;
			}
			return false;
		},
		[unitVersionItemCopying, unit, unitVersion, changeUnitVersion]
	);

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
				unitListImage,
				setUnitListImage,
				unitVersionItemCopying,
				setUnitVersionItemCopying,
				changeUnitVersionItemCopying,
				pasteVersionItemCopying,
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
				locationMapImages,
				setLocationMapImages,
				locationMapComponents,
				setLocationMapComponents,
				unitPageStyle,
				setUnitPageStyle,
				unitPagePaddingTop,
				setUnitPagePaddingTop,
				unitPagePrimaryRef,
				isOnOverviewSection,
				setIsOnOverviewSection,
				isUnitPageSubpagesHeaderFullSize,
				setIsUnitPageSubpagesHeaderFullSize,
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
