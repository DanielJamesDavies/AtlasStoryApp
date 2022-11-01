// Packages

// Components
import { Search } from "./Search/Search";
import { Feed } from "./Feed/Feed";

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
			<Feed />
		</div>
	);
};
