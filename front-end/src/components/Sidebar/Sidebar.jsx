// Packages
import { FaBook, FaUser, FaBookOpen, FaGlobeEurope } from "react-icons/fa";

// Components

// Logic
import { SidebarLogic } from "./SidebarLogic";

// Context

// Styles
import "./Sidebar.css";

// Assets

export const Sidebar = () => {
	const { navigateToProfile, navigateToStories, navigateToCharacters, navigateToSubstories, navigateToWorld } = SidebarLogic();

	return (
		<div className='side-bar'>
			<div className='side-bar-primary-button-container'>
				<button className='side-bar-btn side-bar-btn-profile' onClick={navigateToProfile}></button>
				<button className='side-bar-btn' onClick={navigateToStories}>
					<FaBook />
				</button>
			</div>
			<div className='side-bar-story-button-container'>
				<button className='side-bar-btn' onClick={navigateToCharacters}>
					<FaUser />
				</button>
				<button className='side-bar-btn' onClick={navigateToSubstories}>
					<FaBookOpen />
				</button>
				<button className='side-bar-btn' onClick={navigateToWorld}>
					<FaGlobeEurope />
				</button>
			</div>
		</div>
	);
};
