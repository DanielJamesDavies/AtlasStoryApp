// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../context/StoryContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const GenresLogic = () => {
	const { isAuthorizedToEdit, story, setStory, storyGenres, setStoryGenres } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	const [allGenres, setAllGenres] = useState([]);

	useEffect(() => {
		async function getAllGenres() {
			const response = await APIRequest("/genre", "GET");
			if (!response || response?.error || !response?.data?.genres) return false;
			setAllGenres(response?.data?.genres);
		}
		getAllGenres();
	}, [story, APIRequest]);

	const [isReorderingStoryGenres, setIsReorderingStoryGenres] = useState(false);
	function toggleIsReorderingStoryGenres() {
		setIsReorderingStoryGenres((oldIsReorderingStoryGenres) => !oldIsReorderingStoryGenres);
	}

	function reorderStoryGenres(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newStory = JSON.parse(JSON.stringify(story));
		const tempGenre = newStory.data.genres.splice(res.from, 1)[0];
		newStory.data.genres.splice(res.to, 0, tempGenre);
		setStory(newStory);
	}

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
		const genre = allGenres.find((e) => e._id === genre_id);
		if (!genre) return false;

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.genres.push(genre_id);
			return newStory;
		});

		setStoryGenres((oldStoryGenres) => {
			let newStoryGenres = JSON.parse(JSON.stringify(oldStoryGenres));
			newStoryGenres.push(genre);
			return newStoryGenres;
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

		setStoryGenres((oldStoryGenres) => {
			let newStoryGenres = JSON.parse(JSON.stringify(oldStoryGenres));
			const genreIndex = newStoryGenres.findIndex((e) => e._id === genre_id);
			if (genreIndex === -1) return newStoryGenres;
			newStoryGenres.splice(genreIndex, 1);
			return newStoryGenres;
		});
	}

	const [genresSearchValue, setGenresSearchValue] = useState("");

	function changeGenresSearchValue(e) {
		setGenresSearchValue(e.target.value);
	}

	async function createNewGenre() {
		const response = await APIRequest("/genre/", "POST", { name: genresSearchValue });
		if (!response || response?.errors || !response?.data?.genre) return false;
		setAllGenres((oldAllGenres) => oldAllGenres.concat([response.data.genre]));
		return true;
	}

	return {
		isAuthorizedToEdit,
		story,
		storyGenres,
		allGenres,
		isReorderingStoryGenres,
		toggleIsReorderingStoryGenres,
		reorderStoryGenres,
		revertStoryGenres,
		saveStoryGenres,
		addGenre,
		removeGenre,
		genresSearchValue,
		changeGenresSearchValue,
		createNewGenre,
	};
};
