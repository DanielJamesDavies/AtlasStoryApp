// Packages

// Components
import { Search } from "./Search/Search";
import { Stories } from "./Stories/Stories";
import { Genres } from "./Genres/Genres";

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
				<Stories />
				<Genres />
			</div>
		</div>
	);
};
