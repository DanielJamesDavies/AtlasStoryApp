// Packages
import { FaUser, FaSearch, FaBookOpen, FaGlobeEurope } from "react-icons/fa";

// Components

// Logic
import { NavigationBarLogic } from "./NavigationBarLogic";

// Context

// Styles
import "./NavigationBar.css";

// Assets

export const NavigationBar = () => {
	const { isOnStory, profilePicture, navigateToProfile, navigateToSearch, navigateToCharacters, navigateToSubstories, navigateToWorld } =
		NavigationBarLogic();

	return (
		<div className='navigation-bar'>
			<div className='navigation-bar-primary-button-container'>
				<button className='navigation-bar-btn navigation-bar-btn-user' onClick={navigateToProfile}>
					{!profilePicture ? null : <img src={profilePicture} alt='' />}
				</button>
				<button className='navigation-bar-btn navigation-bar-btn-search' onClick={navigateToSearch}>
					<FaSearch />
				</button>
			</div>
			{!isOnStory ? (
				<div className='navigation-bar-placeholder-section' />
			) : (
				<>
					<div className='navigation-bar-story-button-container'>
						<button className='navigation-bar-btn' onClick={navigateToCharacters}>
							<FaUser />
						</button>
						<button className='navigation-bar-btn' onClick={navigateToSubstories}>
							<FaBookOpen />
						</button>
						<button className='navigation-bar-btn' onClick={navigateToWorld}>
							<FaGlobeEurope />
						</button>
					</div>
					<div className='navigation-bar-placeholder-section navigation-bar-placeholder-section-story-open' />
				</>
			)}
		</div>
	);
};
