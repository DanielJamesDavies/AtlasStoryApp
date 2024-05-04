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
import logo from "../../content/logo.svg";

export const NavigationBar = () => {
	const {
		username,
		isActuallyAuthorizedToEdit,
		isAuthorizedToEdit,
		isOnStory,
		userProfilePicture,
		storyIcon,
		getBtnClassName,
		navigateToProfile,
		navigateToExplore,
		navigateToStoryPage,
		toggleIsAuthorizedToEdit,
	} = NavigationBarLogic();

	return (
		<div className={"navigation-bar" + (isOnStory ? " navigation-bar-is-on-story" : "")}>
			<div className='navigation-bar-btn-container navigation-bar-btn-container-user'>
				<button className={getBtnClassName("user", userProfilePicture)} onClick={navigateToProfile} onAuxClick={navigateToProfile}>
					{!username ? (
						<div className='navigation-bar-btn-logo'>
							<img src={logo} alt='' draggable={false} />
						</div>
					) : !userProfilePicture ? (
						<div className='navigation-bar-btn-user-placeholder' />
					) : (
						<img src={userProfilePicture} alt='' draggable={false} />
					)}
				</button>
				{!username ? null : <div className='navigation-bar-btn-label'>My Profile</div>}
			</div>
			<div className='navigation-bar-btn-container'>
				<button className={getBtnClassName("explore", false)} onClick={navigateToExplore} onAuxClick={navigateToExplore}>
					<FontAwesomeIcon icon={faSearch} />
				</button>
				<div className='navigation-bar-btn-label'>Explore</div>
			</div>
			{!isOnStory ? null : (
				<>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button
							className={getBtnClassName("story", storyIcon)}
							onClick={(e) => navigateToStoryPage(e, "")}
							onAuxClick={(e) => navigateToStoryPage(e, "")}
						>
							{!storyIcon ? <FaBook /> : <img src={storyIcon} alt='' draggable={false} />}
						</button>
						<div className='navigation-bar-btn-label'>Story</div>
					</div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button
							className={getBtnClassName("characters", false)}
							onClick={(e) => navigateToStoryPage(e, "/characters")}
							onAuxClick={(e) => navigateToStoryPage(e, "/characters")}
						>
							<FontAwesomeIcon icon={faUser} />
						</button>
						<div className='navigation-bar-btn-label'>Characters</div>
					</div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button
							className={getBtnClassName("plots", false)}
							onClick={(e) => navigateToStoryPage(e, "/plots")}
							onAuxClick={(e) => navigateToStoryPage(e, "/plots")}
						>
							<FontAwesomeIcon icon={faBookOpen} />
						</button>
						<div className='navigation-bar-btn-label'>Plots</div>
					</div>
					<div className='navigation-bar-btn-container navigation-bar-btn-container-story'>
						<button
							className={getBtnClassName("world", false)}
							onClick={(e) => navigateToStoryPage(e, "/world")}
							onAuxClick={(e) => navigateToStoryPage(e, "/world")}
						>
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
