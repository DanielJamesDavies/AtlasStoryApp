// Packages
import { FaBook, FaMountain, FaPencilAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faGlobeEurope, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

// Components

// Logic
import { NavigationBarLogic } from "./NavigationBarLogic";

// Context

// Styles
import "./NavigationBar.css";

// Assets

export const NavigationBar = () => {
	const {
		isActuallyAuthorizedToEdit,
		isAuthorizedToEdit,
		isOnStory,
		userProfilePicture,
		storyIcon,
		getBtnClassName,
		navigateToProfile,
		navigateToExplore,
		navigateToStory,
		navigateToCharacters,
		navigateToSubstories,
		navigateToWorld,
		toggleIsAuthorizedToEdit,
	} = NavigationBarLogic();

	return (
		<div className='navigation-bar'>
			<div className='navigation-bar-btn-container'>
				<button className={getBtnClassName("user", userProfilePicture)} onClick={navigateToProfile} onAuxClick={navigateToProfile}>
					{!userProfilePicture ? (
						<div className='navigation-bar-btn-user-placeholder' />
					) : (
						<img src={userProfilePicture} alt='' draggable={false} />
					)}
				</button>
				<div className='navigation-bar-btn-label'>My Profile</div>
			</div>
			<div className='navigation-bar-btn-container'>
				<button className={getBtnClassName("explore", false)} onClick={navigateToExplore} onAuxClick={navigateToExplore}>
					<FontAwesomeIcon icon={faSearch} />
				</button>
				<div className='navigation-bar-btn-label'>Explore</div>
			</div>
			{!isOnStory ? (
				<>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-placeholder'></div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-placeholder'></div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-placeholder'></div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-placeholder'></div>
				</>
			) : (
				<>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button className={getBtnClassName("story", storyIcon)} onClick={navigateToStory} onAuxClick={navigateToStory}>
							{!storyIcon ? <FaBook /> : <img src={storyIcon} alt='' draggable={false} />}
						</button>
						<div className='navigation-bar-btn-label'>Story</div>
					</div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button className={getBtnClassName("characters", false)} onClick={navigateToCharacters} onAuxClick={navigateToCharacters}>
							<FontAwesomeIcon icon={faUser} />
						</button>
						<div className='navigation-bar-btn-label'>Characters</div>
					</div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button className={getBtnClassName("plots", false)} onClick={navigateToSubstories} onAuxClick={navigateToSubstories}>
							<FontAwesomeIcon icon={faBookOpen} />
						</button>
						<div className='navigation-bar-btn-label'>Plots</div>
					</div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button className={getBtnClassName("world", false)} onClick={navigateToWorld} onAuxClick={navigateToWorld}>
							<FontAwesomeIcon icon={faGlobeEurope} />
						</button>
						<div className='navigation-bar-btn-label'>World</div>
					</div>
					{!isActuallyAuthorizedToEdit ? null : (
						<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
							<button
								className={
									isAuthorizedToEdit
										? "navigation-bar-btn navigation-bar-btn-viewer-mode"
										: "navigation-bar-btn navigation-bar-btn-editor-mode"
								}
								onClick={() => toggleIsAuthorizedToEdit()}
								onAuxClick={() => toggleIsAuthorizedToEdit()}
							>
								{isAuthorizedToEdit ? <FaMountain /> : <FaPencilAlt />}
							</button>
							<div className='navigation-bar-btn-label'>Switch to {isAuthorizedToEdit ? "Viewer" : "Editor"} Mode</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};
