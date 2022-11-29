// Packages
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersRelationshipsLogic = () => {
	const {
		groups,
		characters,
		charactersFaceImages,
		characterRelationships,
		characterRelationshipsCharacters,
		setCharacterRelationshipsCharacters,
		relationshipsFilters,
	} = useContext(CharactersContext);

	const charactersRelationshipChartRef = useRef();
	const [charactersRelationshipChartWidth, setCharactersRelationshipChartWidth] = useState(800);
	const [charactersRelationshipChartItemWidth, setCharactersRelationshipChartItemWidth] = useState(78);

	useLayoutEffect(() => {
		function getCharacterItemTransform(index, newCharactersRelationshipChartWidth) {
			let modifier = 8;
			if (window.innerWidth <= 1200) modifier = 6;
			if (window.innerWidth <= 1000) modifier = 4;
			if (window.innerWidth <= 750) modifier = 40 / characterRelationshipsCharacters.length;
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
			if (window.innerWidth > 1000) {
				chartWidth = window.innerWidth - navbarWidth - 48 - 400 - 12;
				chartHeight = window.innerHeight - 48 - 26 - 48 - 24;
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
			const a = Math.abs(y2 - y1);
			const b = Math.abs(x2 - x1);
			const c = Math.sqrt(a * a + b * b);
			setCharactersRelationshipChartItemWidth(Math.min(c, 100));
		}
		updateChartStyles();
		window.addEventListener("resize", updateChartStyles);
		return () => window.removeEventListener("resize", updateChartStyles);
	}, [setCharactersRelationshipChartWidth, charactersRelationshipChartRef, characterRelationshipsCharacters]);

	useEffect(() => {
		function getCharacterRelationshipsCharacters() {
			if (
				!characters ||
				characters.length === 0 ||
				!characterRelationships ||
				characterRelationships.length === 0 ||
				relationshipsFilters === false ||
				!charactersFaceImages
			)
				return false;

			let newCharacterRelationshipsCharacters = JSON.parse(JSON.stringify(characterRelationships));

			newCharacterRelationshipsCharacters = groups
				.map((group) =>
					group?.data?.characters.map((character) => {
						let oldCharacter = characters.find((e) => e?._id === character?.character_id);
						if (!oldCharacter) return false;
						if (!relationshipsFilters.groups.includes(oldCharacter?.group_id)) return false;
						if (!charactersFaceImages) return oldCharacter;
						let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
						newCharacter.data.faceImage = charactersFaceImages?.find((e) => e?._id === newCharacter?.data?.faceImage);
						return newCharacter;
					})
				)
				.flat(1)
				.filter((e) => e !== false);

			setCharacterRelationshipsCharacters(newCharacterRelationshipsCharacters);
		}
		getCharacterRelationshipsCharacters();
	}, [setCharacterRelationshipsCharacters, characterRelationships, relationshipsFilters, groups, characters, charactersFaceImages]);

	const [isDisplayingInfo, setIsDisplayingInfo] = useState(false);

	function toggleIsDisplayingInfo() {
		setIsDisplayingInfo((oldIsDisplayingInfo) => !oldIsDisplayingInfo);
	}

	return {
		groups,
		characters,
		charactersFaceImages,
		charactersRelationshipChartRef,
		charactersRelationshipChartWidth,
		charactersRelationshipChartItemWidth,
		isDisplayingInfo,
		toggleIsDisplayingInfo,
	};
};
