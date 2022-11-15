// Packages

// Components
import { Search } from "./Search/Search";
import { StoriesList } from "./StoriesList/StoriesList";
import { GenresList } from "./GenresList/GenresList";

// Logic

// Context

// Services

// Styles
import "./Home.css";

// Assets

export const Home = () => {
	return (
		<div className='home-container'>
			<Search />
			<div className='home-content'>
				<StoriesList />
				<GenresList />
			</div>
		</div>
	);
};
