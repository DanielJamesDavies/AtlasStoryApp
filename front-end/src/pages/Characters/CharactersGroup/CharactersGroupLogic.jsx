// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersGroupLogic = () => {
	const { changeLocation } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, group, setIsDisplayingCreateCharacterForm, toggleIsReorderingCharacters } = useContext(CharactersContext);

	function navigateToGroup(e) {
		if (story?.uid && group?.uid) changeLocation("/s/" + story.uid + "/g/" + group.uid, e.button === 1);
	}

	function openCreateCharacterForm() {
		setIsDisplayingCreateCharacterForm(true);
	}

	const [activeGroupColourTint, setActiveGroupColourTint] = useState(false);

	useEffect(() => {
		function getColourTint(hex, amount) {
			let [r, g, b] = hex.match(/.{2}/g);

			r = Math.max(Math.min(255, parseInt(r, 16) + amount), 0).toString(16);
			if (parseInt(r, 16) + amount > 255) amount *= 0.5;
			g = Math.max(Math.min(255, parseInt(g, 16) + amount), 0).toString(16);
			b = Math.max(Math.min(255, parseInt(b, 16) + amount), 0).toString(16);

			return `#${(r.length < 2 ? "0" : "") + r}${(g.length < 2 ? "0" : "") + g}${(b.length < 2 ? "0" : "") + b}`;
		}

		if (group?.data?.colour) {
			try {
				let bigint = parseInt(group?.data?.colour.substring(1), 16);
				let r = (bigint >> 16) & 255;
				let g = (bigint >> 8) & 255;
				let b = bigint & 255;
				const brightness = (r + g + b) / 3;
				const new_hex = getColourTint(group?.data?.colour.substring(1), brightness > 128 ? -28 : 60);
				setActiveGroupColourTint(new_hex);
			} catch {
				setActiveGroupColourTint(group?.data?.colour);
			}
		}
	}, [group]);

	return { isAuthorizedToEdit, story, group, navigateToGroup, openCreateCharacterForm, toggleIsReorderingCharacters, activeGroupColourTint };
};
