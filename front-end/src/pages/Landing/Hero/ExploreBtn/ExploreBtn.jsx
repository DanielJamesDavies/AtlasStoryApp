// Packages
import { FaSearch } from "react-icons/fa";

// Components

// Logic
import { ExploreBtnLogic } from "./ExploreBtnLogic";

// Context

// Services

// Styles
import "./ExploreBtn.css";

// Assets

export const ExploreBtn = () => {
	const { goToExplorePage } = ExploreBtnLogic();

	return (
		<div className='landing-hero-explore-btn-container'>
			<button className='landing-hero-explore-btn' onClick={goToExplorePage}>
				<div>Explore Stories</div>
				<FaSearch />
			</button>
		</div>
	);
};
