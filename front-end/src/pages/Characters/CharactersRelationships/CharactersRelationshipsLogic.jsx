// Packages
import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersRelationshipsLogic = () => {
	const {
		isAuthorizedToEdit,
		story,
		storyGroups,
		storyCharacters,
		storyCharacterRelationships,
		characterRelationshipsCharacters,
		setCharacterRelationshipsCharacters,
		relationshipsFilters,
		isShowingRelationshipsBackgroundCharacters,
		isShowingRelationshipsCharactersWithNoRelationships,
	} = useContext(CharactersContext);

	const charactersRelationshipChartRef = useRef();
	const [charactersRelationshipChartWidth, setCharactersRelationshipChartWidth] = useState(800);
	const [charactersRelationshipChartItemWidth, setCharactersRelationshipChartItemWidth] = useState(78);

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
				chartHeight = window.innerHeight - 48 - 26 - 48 - 24 - 48;
			} else if (window.innerWidth > 750) {
				chartWidth = window.innerWidth - navbarWidth - 48;
				chartHeight = window.innerHeight - 48 - 26 - 48 - 24;
			} else {
				chartWidth = window.innerWidth - 16;
				chartHeight = window.innerHeight - navbarMobileHeight - 48 - 26 - 48;
			}

			const newCharactersRelationshipChartWidth = Math.min(chartWidth, Math.max(chartHeight, 700));
			setCharactersRelationshipChartWidth(newCharactersRelationshipChartWidth);

			const [x1, y1] = getCharacterItemTransform(0, newCharactersRelationshipChartWidth);
			const [x2, y2] = getCharacterItemTransform(1, newCharactersRelationshipChartWidth);
			const newChartItemWidth = Math.min(Math.hypot(Math.abs(y2 - y1), Math.abs(x2 - x1)), 100);
			setCharactersRelationshipChartItemWidth(newChartItemWidth);
		}
		updateChartStyles();
		window.addEventListener("resize", updateChartStyles);
		return () => window.removeEventListener("resize", updateChartStyles);
	}, [setCharactersRelationshipChartWidth, charactersRelationshipChartRef, characterRelationshipsCharacters]);

	const getCharacterRelationshipsCharacters = useCallback(() => {
		if (
			!storyGroups ||
			storyGroups.length === 0 ||
			!storyCharacters ||
			storyCharacters.length === 0 ||
			!storyCharacterRelationships ||
			relationshipsFilters === false
		)
			return false;

		let newCharacterRelationshipsCharacters = story?.data?.characterRelationshipsGroups
			.filter((e) => storyGroups.findIndex((e2) => e2?._id === e?._id) !== -1)
			.map((group) =>
				group?.reversed
					? storyGroups
							?.find((e) => e?._id === group?._id)
							?.data?.characters.slice()
							.reverse()
							.map((character) => {
								const newCharacter = storyCharacters.find((e) => e?._id === character?.character_id);
								if (!newCharacter) return false;
								if (!relationshipsFilters?.groups?.includes(newCharacter?.group_id)) return false;
								if (!isShowingRelationshipsBackgroundCharacters && newCharacter?.isBackgroundCharacter) return false;
								if (
									story?.data?.characterRelationshipTypes?.length !== 0 &&
									storyCharacterRelationships.filter(
										(r) =>
											r.character_ids.includes(newCharacter?._id) &&
											relationshipsFilters?.relationshipTypes?.includes(r?.relationship_type)
									).length === 0 &&
									!isShowingRelationshipsCharactersWithNoRelationships
								)
									return false;
								return newCharacter;
							})
					: storyGroups
							?.find((e) => e?._id === group?._id)
							?.data?.characters.map((character) => {
								const newCharacter = storyCharacters.find((e) => e?._id === character?.character_id);
								if (!newCharacter) return false;
								if (!relationshipsFilters?.groups?.includes(newCharacter?.group_id)) return false;
								if (!isShowingRelationshipsBackgroundCharacters && newCharacter?.isBackgroundCharacter) return false;
								if (
									story?.data?.characterRelationshipTypes?.length !== 0 &&
									storyCharacterRelationships.filter(
										(r) =>
											r.character_ids.includes(newCharacter?._id) &&
											relationshipsFilters?.relationshipTypes?.includes(r?.relationship_type)
									).length === 0 &&
									!isShowingRelationshipsCharactersWithNoRelationships
								)
									return false;
								return newCharacter;
							})
			)
			.flat(1)
			.filter((e) => e !== false);

		setCharacterRelationshipsCharacters(newCharacterRelationshipsCharacters);
	}, [
		story,
		setCharacterRelationshipsCharacters,
		storyCharacterRelationships,
		relationshipsFilters,
		storyGroups,
		storyCharacters,
		isShowingRelationshipsBackgroundCharacters,
		isShowingRelationshipsCharactersWithNoRelationships,
	]);

	useEffect(() => {
		getCharacterRelationshipsCharacters();
	}, [
		getCharacterRelationshipsCharacters,
		setCharacterRelationshipsCharacters,
		storyCharacterRelationships,
		relationshipsFilters,
		storyGroups,
		storyCharacters,
		isShowingRelationshipsBackgroundCharacters,
	]);

	const [isDisplayingInfo, setIsDisplayingInfo] = useState(false);

	function toggleIsDisplayingInfo() {
		setIsDisplayingInfo((oldIsDisplayingInfo) => !oldIsDisplayingInfo);
	}

	return {
		isAuthorizedToEdit,
		storyGroups,
		storyCharacters,
		characterRelationshipsCharacters,
		charactersRelationshipChartRef,
		charactersRelationshipChartWidth,
		charactersRelationshipChartItemWidth,
		isDisplayingInfo,
		toggleIsDisplayingInfo,
	};
};
