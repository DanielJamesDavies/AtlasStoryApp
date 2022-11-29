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
	const { groups, characters, charactersFaceImages, characterRelationships, setCharacterRelationshipsCharacters, relationshipsFilters } =
		useContext(CharactersContext);

	const charactersRelationshipChartRef = useRef();
	const [charactersRelationshipChartWidth, setCharactersRelationshipChartWidth] = useState("800px");

	useLayoutEffect(() => {
		function getCharactersRelationshipChartWidth() {
			const navbarWidth = 68;
			const navbarMobileHeight = 58;

			let chartWidth = 0;
			let chartHeight = 0;
			if (window.innerWidth > 750) {
				chartWidth = window.innerWidth - navbarWidth - 48 - 400 - 12;
				chartHeight = window.innerHeight - 48 - 26 - 48 - 24;
			} else {
				chartWidth = window.innerWidth - 48;
				chartHeight = window.innerHeight - navbarMobileHeight - 48 - 26 - 48;
			}

			setCharactersRelationshipChartWidth(Math.min(chartWidth, Math.max(chartHeight, 700)));
		}
		getCharactersRelationshipChartWidth();
		window.addEventListener("resize", getCharactersRelationshipChartWidth);
		return () => window.removeEventListener("resize", getCharactersRelationshipChartWidth);
	}, [setCharactersRelationshipChartWidth, charactersRelationshipChartRef]);

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

	return { groups, characters, charactersFaceImages, charactersRelationshipChartRef, charactersRelationshipChartWidth };
};
