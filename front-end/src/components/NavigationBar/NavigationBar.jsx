// Packages
import { FaUser, FaSearch, FaBookOpen, FaGlobeEurope, FaBook } from "react-icons/fa";

// Components

// Logic
import { NavigationBarLogic } from "./NavigationBarLogic";

// Context

// Styles
import "./NavigationBar.css";

// Assets

export const NavigationBar = () => {
	const {
		isOnStory,
		storyIcon,
		userProfilePicture,
		getBtnClassName,
		navigateToProfile,
		navigateToSearch,
		navigateToStory,
		navigateToCharacters,
		navigateToSubstories,
		navigateToWorld,
	} = NavigationBarLogic();

	return (
		<div className='navigation-bar'>
			<div className='navigation-bar-primary-button-container navigation-bar-section-container'>
				<button className={getBtnClassName("user", userProfilePicture)} onClick={navigateToProfile} onAuxClick={navigateToProfile}>
					{!userProfilePicture ? (
						<div className='navigation-bar-btn-user-placeholder' />
					) : (
						<img src={userProfilePicture} alt='' draggable={false} />
					)}
				</button>
				<button className={getBtnClassName("search", false)} onClick={navigateToSearch} onAuxClick={navigateToSearch}>
					<FaSearch />
				</button>
			</div>
			{!isOnStory ? (
				<div className='navigation-bar-placeholder-section navigation-bar-section-container' />
			) : (
				<>
					<div className='navigation-bar-story-button-container navigation-bar-section-container'>
						<button className={getBtnClassName("story", storyIcon)} onClick={navigateToStory} onAuxClick={navigateToStory}>
							{!storyIcon ? <FaBook /> : <img src={storyIcon} alt='' draggable={false} />}
						</button>
						<button className={getBtnClassName("characters", false)} onClick={navigateToCharacters} onAuxClick={navigateToCharacters}>
							<FaUser />
						</button>
						<button className={getBtnClassName("substories", false)} onClick={navigateToSubstories} onAuxClick={navigateToSubstories}>
							<FaBookOpen />
						</button>
						<button className={getBtnClassName("world", false)} onClick={navigateToWorld} onAuxClick={navigateToWorld}>
							<FaGlobeEurope />
						</button>
					</div>
					<div className='navigation-bar-placeholder-section navigation-bar-placeholder-section-story-open navigation-bar-section-container' />
				</>
			)}
		</div>
	);
};
