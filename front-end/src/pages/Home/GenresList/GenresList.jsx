// Packages
import { FaSearch, FaPlus } from "react-icons/fa";

// Components
import { GenreItem } from "./GenreItem";
import { TextInput } from "../../../components/TextInput/TextInput";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { GenresListLogic } from "./GenresListLogic";

// Context

// Services

// Styles
import "./GenresList.css";

// Assets

export const GenresList = () => {
	const {
		favouritedGenres,
		allGenres,
		favouriteGenre,
		unfavouriteGenre,
		genresSearchValue,
		changeGenresSearchValue,
		genresNewGenreName,
		changeGenresNewGenreName,
		createNewGenre,
	} = GenresListLogic();

	return (
		<div className='home-genres-list-container'>
			<div className='home-genres-list-title'>Genres</div>
			{favouritedGenres === false ? (
				<div className='home-genres-list-loading-container'>
					<LoadingCircle size='s' center={true} />
				</div>
			) : (
				<div className='home-genres-list'>
					{favouritedGenres?.map((genre, index) => (
						<GenreItem key={index} genre={genre} isFavourited={true} unfavouriteGenre={unfavouriteGenre} />
					))}
				</div>
			)}
			{favouritedGenres === false || allGenres === false ? (
				<div className='home-genres-list-loading-container'>
					<LoadingCircle size='s' center={true} />
				</div>
			) : (
				<>
					{allGenres.filter((e) => favouritedGenres.findIndex((e2) => e._id === e2._id) === -1).length === 0 ? null : (
						<div className='home-genres-list-search-container'>
							<TextInput
								icon={FaSearch}
								label='Search Genres'
								value={genresSearchValue}
								onChange={changeGenresSearchValue}
								size='s'
							/>
						</div>
					)}
					<div className='home-genres-list'>
						{allGenres
							.filter(
								(e) =>
									favouritedGenres.findIndex((e2) => e._id === e2._id) === -1 &&
									new RegExp("^" + genresSearchValue, "i").test(e.name)
							)
							.sort((a, b) => {
								const regex = new RegExp("^" + genresSearchValue, "i");
								return regex.test(a.name) ? (regex.test(b.name) ? (a.storiesUsing <= b.storiesUsing ? 1 : -1) : -1) : 1;
							})
							.map((genre, index) =>
								index + 1 > 10 ? null : <GenreItem key={index} genre={genre} isFavourited={false} favouriteGenre={favouriteGenre} />
							)}
					</div>
					<div className='home-genres-list-new-genre-container'>
						<TextInput icon={FaPlus} label='Create New Genre' value={genresNewGenreName} onChange={changeGenresNewGenreName} size='s' />
						<IconBtn icon={<FaPlus />} iconName='plus' seamless={true} size='m' onClick={createNewGenre} />
					</div>
				</>
			)}
		</div>
	);
};
