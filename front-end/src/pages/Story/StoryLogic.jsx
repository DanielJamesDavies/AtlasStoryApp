// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";
import { RoutesContext } from "../../context/RoutesContext";

// Services

// Styles

// Assets

export const StoryLogic = () => {
	const { isAuthorizedToEdit, story } = useContext(StoryContext);
	const { location, changeLocationParameters } = useContext(RoutesContext);

	useEffect(() => {
		function updateDocumentTitle() {
			if (!story) return;

			// Document Title
			if (story?.data?.title) {
				document.title = story?.data?.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}
		updateDocumentTitle();
		setTimeout(() => updateDocumentTitle(), 1000);
	}, [story, location]);

	const [storyStyles, setStoryStyles] = useState({});

	useEffect(() => {
		function getColourTint(hex, amount) {
			let [r, g, b] = hex.match(/.{2}/g);

			r = Math.max(Math.min(255, parseInt(r, 16) + amount), 0).toString(16);
			if (parseInt(r, 16) + amount > 255) amount *= 0.5;
			g = Math.max(Math.min(255, parseInt(g, 16) + amount), 0).toString(16);
			b = Math.max(Math.min(255, parseInt(b, 16) + amount), 0).toString(16);

			return `#${(r.length < 2 ? "0" : "") + r}${(g.length < 2 ? "0" : "") + g}${(b.length < 2 ? "0" : "") + b}`;
		}

		function getStoryStyles() {
			let newStoryStyles = {};
			if (story?.data?.colours?.accent) newStoryStyles["--storyColour"] = story?.data?.colours?.accent;
			if (story?.data?.colours?.accentHover) newStoryStyles["--storyHoverColour"] = story?.data?.colours?.accentHover;

			if (story?.data?.colours?.accent) {
				try {
					let bigint = parseInt(story?.data?.colours?.accent.substring(1), 16);
					let r = (bigint >> 16) & 255;
					let g = (bigint >> 8) & 255;
					let b = bigint & 255;
					const brightness = (r + g + b) / 3;
					const new_hex = getColourTint(story?.data?.colours?.accent.substring(1), brightness > 128 ? -28 : 60);
					newStoryStyles["--storyColourTint"] = new_hex;
				} catch {
					newStoryStyles["--storyColourTint"] = story?.data?.colours?.accent;
				}
			} else {
				newStoryStyles["--storyColourTint"] = "#0044ff";
			}

			setStoryStyles(newStoryStyles);
		}
		getStoryStyles();
	}, [story]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return { isAuthorizedToEdit, story, storyStyles };
};
