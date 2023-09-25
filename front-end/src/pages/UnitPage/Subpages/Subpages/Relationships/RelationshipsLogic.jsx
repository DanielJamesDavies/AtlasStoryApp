// Packages
import { useContext, useRef, useState, useLayoutEffect, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";

// Services

// Styles

// Assets

export const RelationshipsLogic = () => {
	const {
		unit_uid,
		unit,
		storyGroups,
		storyCharacters,
		characterRelationships,
		characterRelationshipsCharacters,
		setCharacterRelationshipsCharacters,
		relationshipsFilters,
		unitPagePaddingTop,
		selectedCharacterRelationshipsCharacterId,
	} = useContext(UnitPageContext);

	const characterRelationshipsChartRef = useRef();
	const [characterRelationshipsChartWidth, setUnitRelationshipsChartWidth] = useState(800);
	const [characterRelationshipsChartItemWidth, setUnitRelationshipsChartItemWidth] = useState(78);

	useLayoutEffect(() => {
		function getCharacterItemTransform(index, newCharactersRelationshipChartWidth) {
			let modifier = 7;
			if (window.innerWidth <= 1200) modifier = 6;
			if (window.innerWidth <= 1100) modifier = 4;
			if (window.innerWidth <= 750) modifier = 75 / characterRelationshipsCharacters?.length;
			if (window.innerWidth <= 375) modifier = 42 / characterRelationshipsCharacters?.length;
			if (window.innerWidth <= 300) modifier = 0;
			const angle = (index / (characterRelationshipsCharacters?.length + modifier)) * Math.PI * 2;
			const x = (newCharactersRelationshipChartWidth / 2) * Math.sin(angle);
			const y = -1 * (newCharactersRelationshipChartWidth / 2) * Math.cos(angle);
			return [x, y];
		}

		function updateChartStyles() {
			const navbarWidth = 68;
			const navbarMobileHeight = 58;

			let chartWidth = 0;
			let chartHeight = 0;
			if (window.innerWidth > 1100) {
				chartWidth = window.innerWidth - navbarWidth - 48 - 400 - 12 - 325;
				chartHeight = window.innerHeight - unitPagePaddingTop - 36 - 24 - 30 - 18 - 12;
			} else if (window.innerWidth > 750) {
				chartWidth = window.innerWidth - navbarWidth - 42 - 16 - 8 - 16 - 200;
				chartHeight = window.innerHeight - unitPagePaddingTop - 36 - 24 - 8;
			} else {
				chartWidth = window.innerWidth - 12 - 16 - 8;
				chartHeight = window.innerHeight - navbarMobileHeight - unitPagePaddingTop - 36 - 24;
			}

			const newRelationshipsChartWidth = Math.min(chartWidth, Math.max(chartHeight, 500));
			setUnitRelationshipsChartWidth(newRelationshipsChartWidth);

			const [x1, y1] = getCharacterItemTransform(0, newRelationshipsChartWidth);
			const [x2, y2] = getCharacterItemTransform(1, newRelationshipsChartWidth);
			const newChartItemWidth = Math.min(Math.hypot(Math.abs(y2 - y1), Math.abs(x2 - x1)), 80);
			setUnitRelationshipsChartItemWidth(newChartItemWidth);
		}
		setTimeout(() => updateChartStyles(), 400);
		window.addEventListener("resize", updateChartStyles);
		return () => window.removeEventListener("resize", updateChartStyles);
	}, [
		setUnitRelationshipsChartWidth,
		setUnitRelationshipsChartItemWidth,
		characterRelationshipsChartRef,
		characterRelationshipsCharacters,
		unitPagePaddingTop,
	]);

	useEffect(() => {
		function getRelationshipsCharacters() {
			if (!storyCharacters || storyCharacters.length === 0 || !characterRelationships || relationshipsFilters === false) return false;

			let newRelationshipsCharacters = storyGroups
				.map((group) =>
					group?.data?.characters.map((character) => {
						let newCharacter = storyCharacters.find((e) => e?._id === character?.character_id);
						if (!newCharacter) return false;
						if (!relationshipsFilters?.groups?.includes(newCharacter?.group_id)) return false;
						if (
							characterRelationships.filter(
								(r) =>
									newCharacter?.uid === unit_uid ||
									(r.character_ids.includes(newCharacter?._id) &&
										relationshipsFilters?.relationshipTypes?.includes(r?.relationship_type))
							).length === 0
						)
							return false;
						return newCharacter;
					})
				)
				.flat(1)
				.filter((e) => e !== false);

			const characterIndex = newRelationshipsCharacters.findIndex((e) => e.uid === unit_uid);
			const firstNewRelationshipsCharacters = JSON.parse(JSON.stringify(newRelationshipsCharacters)).slice(characterIndex);
			const lastNewRelationshipsCharacters = JSON.parse(JSON.stringify(newRelationshipsCharacters)).slice(0, characterIndex);
			newRelationshipsCharacters = firstNewRelationshipsCharacters.concat(lastNewRelationshipsCharacters);

			setCharacterRelationshipsCharacters(newRelationshipsCharacters);
		}
		getRelationshipsCharacters();
	}, [unit, setCharacterRelationshipsCharacters, unit_uid, characterRelationships, relationshipsFilters, storyGroups, storyCharacters]);

	const [isDisplayingInfo, setIsDisplayingInfo] = useState(false);

	function toggleIsDisplayingInfo() {
		setIsDisplayingInfo((oldIsDisplayingInfo) => !oldIsDisplayingInfo);
	}

	const characterSubpageRelationshipsRef = useRef();

	useEffect(() => {
		const characterSubpageRelationshipsRefCurrent = characterSubpageRelationshipsRef?.current;

		function onWheel(e) {
			if (characterSubpageRelationshipsRefCurrent?.scrollTop !== 0) e.stopPropagation();
		}

		if (characterSubpageRelationshipsRefCurrent) characterSubpageRelationshipsRefCurrent.addEventListener("wheel", onWheel);
		return () => {
			if (characterSubpageRelationshipsRefCurrent) characterSubpageRelationshipsRefCurrent.removeEventListener("wheel", onWheel);
		};
	}, [characterSubpageRelationshipsRef]);

	return {
		unit,
		storyGroups,
		storyCharacters,
		characterRelationships,
		characterRelationshipsCharacters,
		characterRelationshipsChartRef,
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
		isDisplayingInfo,
		toggleIsDisplayingInfo,
		characterSubpageRelationshipsRef,
		selectedCharacterRelationshipsCharacterId,
	};
};
