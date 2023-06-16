// Packages
import { useContext, useRef, useState, useLayoutEffect, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";

// Services

// Styles

// Assets

export const RelationshipsLogic = () => {
	const {
		character_uid,
		character,
		storyGroups,
		storyCharacters,
		characterRelationships,
		characterRelationshipsCharacters,
		setCharacterRelationshipsCharacters,
		relationshipsFilters,
		characterPaddingTop,
		selectedCharacterRelationshipsCharacterId,
	} = useContext(CharacterContext);

	const characterRelationshipsChartRef = useRef();
	const [characterRelationshipsChartWidth, setCharacterRelationshipsChartWidth] = useState(800);
	const [characterRelationshipsChartItemWidth, setCharacterRelationshipsChartItemWidth] = useState(78);

	useLayoutEffect(() => {
		function getCharacterItemTransform(index, newCharactersRelationshipChartWidth) {
			let modifier = 7;
			if (window.innerWidth <= 1200) modifier = 6;
			if (window.innerWidth <= 1100) modifier = 4;
			if (window.innerWidth <= 750) modifier = 75 / characterRelationshipsCharacters.length;
			if (window.innerWidth <= 375) modifier = 42 / characterRelationshipsCharacters.length;
			if (window.innerWidth <= 300) modifier = 0;
			const angle = (index / (characterRelationshipsCharacters.length + modifier)) * Math.PI * 2;
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
				chartWidth = window.innerWidth - navbarWidth - 48 - 400 - 12 - 200;
				chartHeight = window.innerHeight - characterPaddingTop - 36 - 24 - 30 - 18 - 12;
			} else if (window.innerWidth > 750) {
				chartWidth = window.innerWidth - navbarWidth - 42 - 16 - 8 - 16;
				chartHeight = window.innerHeight - characterPaddingTop - 36 - 24 - 8;
			} else {
				chartWidth = window.innerWidth - 12 - 16 - 8;
				chartHeight = window.innerHeight - navbarMobileHeight - characterPaddingTop - 36 - 24;
			}

			const newCharacterRelationshipsChartWidth = Math.min(chartWidth, Math.max(chartHeight, 500));
			setCharacterRelationshipsChartWidth(newCharacterRelationshipsChartWidth);

			const [x1, y1] = getCharacterItemTransform(0, newCharacterRelationshipsChartWidth);
			const [x2, y2] = getCharacterItemTransform(1, newCharacterRelationshipsChartWidth);
			const newChartItemWidth = Math.min(Math.hypot(Math.abs(y2 - y1), Math.abs(x2 - x1)), 100);
			setCharacterRelationshipsChartItemWidth(newChartItemWidth);
		}
		updateChartStyles();
		window.addEventListener("resize", updateChartStyles);
		setTimeout(() => window.addEventListener("resize", updateChartStyles), 100);
		setTimeout(() => window.addEventListener("resize", updateChartStyles), 200);
		setTimeout(() => window.addEventListener("resize", updateChartStyles), 400);
		return () => window.removeEventListener("resize", updateChartStyles);
	}, [
		setCharacterRelationshipsChartWidth,
		setCharacterRelationshipsChartItemWidth,
		characterRelationshipsChartRef,
		characterRelationshipsCharacters,
		characterPaddingTop,
	]);

	useEffect(() => {
		function getCharacterRelationshipsCharacters() {
			if (!storyCharacters || storyCharacters.length === 0 || !characterRelationships || relationshipsFilters === false) return false;

			let newCharacterRelationshipsCharacters = storyGroups
				.map((group) =>
					group?.data?.characters.map((character) => {
						let newCharacter = storyCharacters.find((e) => e?._id === character?.character_id);
						if (!newCharacter) return false;
						if (!relationshipsFilters?.groups?.includes(newCharacter?.group_id)) return false;
						return newCharacter;
					})
				)
				.flat(1)
				.filter((e) => e !== false);

			const characterIndex = newCharacterRelationshipsCharacters.findIndex((e) => e.uid === character_uid);
			const firstNewCharacterRelationshipsCharacters = JSON.parse(JSON.stringify(newCharacterRelationshipsCharacters)).slice(characterIndex);
			const lastNewCharacterRelationshipsCharacters = JSON.parse(JSON.stringify(newCharacterRelationshipsCharacters)).slice(
				0,
				characterIndex
			);
			newCharacterRelationshipsCharacters = firstNewCharacterRelationshipsCharacters.concat(lastNewCharacterRelationshipsCharacters);

			setCharacterRelationshipsCharacters(newCharacterRelationshipsCharacters);
		}
		getCharacterRelationshipsCharacters();
	}, [setCharacterRelationshipsCharacters, character_uid, characterRelationships, relationshipsFilters, storyGroups, storyCharacters]);

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
		character,
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
