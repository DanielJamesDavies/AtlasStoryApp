// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const GenresListLogic = () => {
	const { APIRequest } = useContext(APIContext);
	const [favouritedGenres, setFavouritedGenres] = useState(false);

	useEffect(() => {
		async function getFavouritedGenres() {
			const user_response = await APIRequest("/user/", "GET");
			if (!user_response || user_response?.error || !user_response?.data?.user) return false;

			let newFavouritedGenres = await Promise.all(
				user_response?.data?.user?.data?.favouritedGenres.map(async (genreID) => {
					const response = await APIRequest("/genre/" + genreID, "GET");
					if (!response || response?.error || !response?.data?.genre) return false;
					return response.data.genre;
				})
			);
			newFavouritedGenres = newFavouritedGenres.filter((e) => e !== false);
			setFavouritedGenres(newFavouritedGenres);
		}
		getFavouritedGenres();
	}, [setFavouritedGenres, APIRequest]);

	const [allGenres, setAllGenres] = useState(false);

	useEffect(() => {
		async function getAllGenres() {
			const response = await APIRequest("/genre", "GET");
			if (!response || response?.error || !response?.data?.genres) return false;
			setAllGenres(response?.data?.genres);
		}
		getAllGenres();
	}, [setAllGenres, APIRequest]);

	async function favouriteGenre(genre_id) {
		const response = await APIRequest("/genre/favourite/" + genre_id, "POST");
		if (!response || response?.error || !response?.data?.genre) return false;

		let newFavouritedGenres = JSON.parse(JSON.stringify(favouritedGenres));
		if (newFavouritedGenres.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(response.data.genre?._id)) === -1)
			newFavouritedGenres.push(response.data.genre);
		setFavouritedGenres(newFavouritedGenres);

		return true;
	}

	async function unfavouriteGenre(genre_id) {
		const response = await APIRequest("/genre/unfavourite/" + genre_id, "POST");
		if (!response || response?.error || !response?.data?.genre) return false;

		let newFavouritedGenres = JSON.parse(JSON.stringify(favouritedGenres));
		const genreIndex = newFavouritedGenres.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(response.data.genre._id));
		if (genreIndex !== -1) newFavouritedGenres.splice(genreIndex, 1);
		setFavouritedGenres(newFavouritedGenres);

		return true;
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
		favouritedGenres,
		allGenres,
		favouriteGenre,
		unfavouriteGenre,
		genresSearchValue,
		changeGenresSearchValue,
		genresNewGenreName,
		changeGenresNewGenreName,
		createNewGenre,
	};
};
