// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";
import { APIContext } from "../../../context/APIContext";
import { useEffect } from "react";

// Services

// Styles

// Assets

export const StoryGenresLogic = () => {
	const { isAuthorizedToEdit, story, setStory } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	const [storyGenres, setStoryGenres] = useState(false);

	useEffect(() => {
		async function getStoryGenres() {
			if (!story?.data?.genres) return false;

			let newStoryGenres = await Promise.all(
				story?.data?.genres.map(async (genreID) => {
					const response = await APIRequest("/genre/" + genreID, "GET");
					if (!response || response?.error || !response?.data?.genre) return false;
					return response.data.genre;
				})
			);
			newStoryGenres = newStoryGenres.filter((e) => e !== false);
			setStoryGenres(newStoryGenres);
		}
		getStoryGenres();
	}, [story, APIRequest]);

	const [allGenres, setAllGenres] = useState([]);

	useEffect(() => {
		async function getAllGenres() {
			const response = await APIRequest("/genre", "GET");
			if (!response || response?.error || !response?.data?.genres) return false;
			setAllGenres(response?.data?.genres);
		}
		getAllGenres();
	}, [story, APIRequest]);

	async function revertStoryGenres() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "genres"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.genres = response.data.value;
			return newStory;
		});

		return true;
	}

	async function saveStoryGenres() {
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "genres"],
			newValue: story.data.genres,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	function addGenre(genre_id) {
		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.genres.push(genre_id);
			return newStory;
		});
	}

	function removeGenre(genre_id) {
		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			const genreIndex = newStory.data.genres.findIndex((e) => e === genre_id);
			if (genreIndex === -1) return newStory;
			newStory.data.genres.splice(genreIndex, 1);
			return newStory;
		});
	}

	const [genresSearchValue, setGenresSearchValue] = useState("");

	function changeGenresSearchValue(e) {
		setGenresSearchValue(e.target.value);
	}

	const [genresNewGenreName, setGenresNewGenreName] = useState("");

	function changeGenresNewGenreName(e) {
		setGenresNewGenreName(e.target.value);
	}

	async function createNewGenre() {
		const response = await APIRequest("/genre/", "POST", { name: genresNewGenreName });
		if (!response || response?.errors || !response?.data?.genre) return false;
		setAllGenres((oldAllGenres) => oldAllGenres.concat([response.data.genre]));
		return true;
	}

	return {
		isAuthorizedToEdit,
		story,
		storyGenres,
		allGenres,
		revertStoryGenres,
		saveStoryGenres,
		addGenre,
		removeGenre,
		genresSearchValue,
		changeGenresSearchValue,
		genresNewGenreName,
		changeGenresNewGenreName,
		createNewGenre,
	};
};
