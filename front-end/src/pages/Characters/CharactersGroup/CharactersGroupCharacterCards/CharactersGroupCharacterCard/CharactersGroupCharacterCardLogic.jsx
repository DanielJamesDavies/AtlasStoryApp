// Packages
import { useContext, useState, useEffect, useRef, useCallback } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../../CharactersContext";
import { RoutesContext } from "../../../../../context/RoutesContext";

// Services
import getColourTint from "../../../../../services/GetColourTint";
import getColourWithTint from "../../../../../services/GetColourWithTint";

// Styles

// Assets

export const CharactersGroupCharacterCardLogic = ({ characterID }) => {
	const { story, storyCharacters, storyCharacterTypes } = useContext(CharactersContext);
	const { changeLocation } = useContext(RoutesContext);

	const [character, setCharacter] = useState(false);
	const [characterType, setCharacterType] = useState(false);

	useEffect(() => {
		if (characterID) {
			const newCharacter = storyCharacters?.find((e) => e._id === characterID);
			setCharacter(newCharacter);

			const newCharacterType = storyCharacterTypes?.find((e) => e._id === newCharacter?.character_type_id);
			setCharacterType(newCharacterType === undefined ? false : newCharacterType);
		}
	}, [characterID, storyCharacters, storyCharacterTypes, setCharacter, setCharacterType]);

	function navigateToCharacter(e) {
		if (e.button === 2) return;
		e.preventDefault();
		if (story?.uid && character?.uid) changeLocation("/s/" + story.uid + "/c/" + character.uid, e.button === 1);
	}

	function onCharacterCardMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	// Character Colour Styles
	const [cardStyles, setCardStyles] = useState({});

	useEffect(() => {
		let newCardStyles = {};
		if (character?.data?.colour) {
			newCardStyles["--characterColour"] = character.data.colour;
			newCardStyles["--characterColourTint"] = getColourTint(character.data.colour);
			newCardStyles["--characterCardNameColour"] = character?.data?.cardNameColour || "#0088ff";

			const colours = getColourWithTint(character.data.colour);
			newCardStyles["--characterColourGradient1"] = colours[0];
			newCardStyles["--characterColourGradient2"] = colours[1];
		} else {
			newCardStyles["--characterColour"] = "#0044ff";
			newCardStyles["--characterCardNameColour"] = "#0088ff";
			newCardStyles["--characterColourTint"] = "#0044ff";
			newCardStyles["--characterColourGradient1"] = "#0044ff";
			newCardStyles["--characterColourGradient2"] = "#0044ff";
		}
		if (characterType?.data?.colour) {
			const type_colours = getColourWithTint(characterType?.data?.colour);
			newCardStyles["--characterTypeColourGradient1"] = type_colours[0];
			newCardStyles["--characterTypeColourGradient2"] = type_colours[1];
		}
		setCardStyles(newCardStyles);
	}, [character, characterType, setCardStyles]);

	const cardRef = useRef();
	const [cardSize, setCardSize] = useState({});

	const backgroundImageRef = useRef();
	const [backgroundImageSize, setBackgroundImageSize] = useState({});

	const updateCardSize = useCallback(() => {
		setCardSize({ width: cardRef?.current?.clientWidth, height: cardRef?.current?.clientHeight });
		setBackgroundImageSize({ width: backgroundImageRef?.current?.clientWidth, height: backgroundImageRef?.current?.clientHeight });
	}, [cardRef, setCardSize, backgroundImageRef, setBackgroundImageSize]);

	useEffect(() => {
		updateCardSize();
		setTimeout(() => updateCardSize(), 1);
		setTimeout(() => updateCardSize(), 2);
		setTimeout(() => updateCardSize(), 3);
		setTimeout(() => updateCardSize(), 4);
		setTimeout(() => updateCardSize(), 5);
		document.addEventListener("visibilitychange", updateCardSize);
		window.addEventListener("resize", updateCardSize);
		return () => {
			document.removeEventListener("visibilitychange", updateCardSize);
			window.removeEventListener("resize", updateCardSize);
		};
	}, [characterID, updateCardSize]);

	const cardSizeRef = useCallback((node) => {
		if (node) setCardSize({ width: node?.clientWidth, height: node?.clientHeight });
		cardRef.current = node;
	}, []);

	const backgroundImageSizeRef = useCallback((node) => {
		if (node) setBackgroundImageSize({ width: node?.clientWidth, height: node?.clientHeight });
		backgroundImageRef.current = node;
	}, []);

	return {
		character,
		characterType,
		navigateToCharacter,
		onCharacterCardMouseDown,
		cardStyles,
		cardSizeRef,
		cardSize,
		backgroundImageSizeRef,
		backgroundImageSize,
		backgroundImageRef,
	};
};
