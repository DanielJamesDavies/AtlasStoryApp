// Packages
import { FaUser, FaHome, FaBookOpen, FaGlobeEurope, FaBook, FaMountain, FaPencilAlt } from "react-icons/fa";

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
		navigateToHome,
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
				<button className={getBtnClassName("home", false)} onClick={navigateToHome} onAuxClick={navigateToHome}>
					<FaHome />
				</button>
				<div className='navigation-bar-btn-label'>Home</div>
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
							<FaUser />
						</button>
						<div className='navigation-bar-btn-label'>Characters</div>
					</div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button className={getBtnClassName("plots", false)} onClick={navigateToSubstories} onAuxClick={navigateToSubstories}>
							<FaBookOpen />
						</button>
						<div className='navigation-bar-btn-label'>Plots</div>
					</div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button className={getBtnClassName("world", false)} onClick={navigateToWorld} onAuxClick={navigateToWorld}>
							<FaGlobeEurope />
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
