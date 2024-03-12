// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { GenreItem } from "./GenreItem/GenreItem";
import { SearchInput } from "../../../components/SearchInput/SearchInput";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { GenresLogic } from "./GenresLogic";

// Context

// Services

// Styles
import "./Genres.css";

// Assets

export const Genres = () => {
	const {
		user_id,
		favouritedGenres,
		allGenres,
		favouriteGenre,
		unfavouriteGenre,
		deleteGenre,
		genresSearchValue,
		changeGenresSearchValue,
		createNewGenre,
	} = GenresLogic();

	return (
		<div className='home-genres-list-container'>
			<div className='home-genres-list'>
				<div className='home-genres-list-title'>Genres</div>
				<div className='home-genres-content'>
					{favouritedGenres === false ? null : favouritedGenres.length === 0 ? null : (
						<div className='home-genres-items'>
							{favouritedGenres?.map((genre, index) => (
								<GenreItem
									key={index}
									genre={genre}
									isFavourited={true}
									unfavouriteGenre={unfavouriteGenre}
									user_id={user_id}
									deleteGenre={deleteGenre}
								/>
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
									<SearchInput label='Search Genres' value={genresSearchValue} onChange={changeGenresSearchValue} />
								</div>
							)}
							{allGenres
								.filter(
									(e) =>
										favouritedGenres.findIndex((e2) => e._id === e2._id) === -1 &&
										new RegExp("^" + genresSearchValue, "i").test(e.name)
								)
								.sort((a, b) => {
									const regex = new RegExp("^" + genresSearchValue, "i");
									return regex.test(a.name) ? (regex.test(b.name) ? (a.storiesUsing <= b.storiesUsing ? 1 : -1) : -1) : 1;
								}).length === 0 ? null : (
								<div className='home-genres-items'>
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
											index + 1 > 10 ? null : (
												<GenreItem
													key={index}
													genre={genre}
													isFavourited={false}
													favouriteGenre={favouriteGenre}
													user_id={user_id}
													deleteGenre={deleteGenre}
												/>
											)
										)}
								</div>
							)}
							{allGenres
								.filter(
									(e) =>
										favouritedGenres.findIndex((e2) => e._id === e2._id) === -1 &&
										new RegExp("^" + genresSearchValue, "i").test(e.name)
								)
								.sort((a, b) => {
									const regex = new RegExp("^" + genresSearchValue, "i");
									return regex.test(a.name) ? (regex.test(b.name) ? (a.storiesUsing <= b.storiesUsing ? 1 : -1) : -1) : 1;
								}).length !== 0 ? null : (
								<div className='home-genres-list-new-genre-container'>
									<div className='home-genres-list-new-genre-label'>
										Would You Like to Create a New Genre Called "
										<span className='home-genres-list-new-genre-label-value'>{genresSearchValue}</span>"?
									</div>
									<IconBtn icon={<FaPlus />} iconName='plus' seamless={true} size='m' onClick={createNewGenre} />
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};
