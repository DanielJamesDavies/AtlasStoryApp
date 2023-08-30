// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { LocationPrimaryTitle } from "./LocationPrimaryTitle/LocationPrimaryTitle";

// Logic
import { LocationPrimaryLogic } from "./LocationPrimaryLogic";

// Context

// Services

// Styles
import "./LocationPrimary.css";

// Assets

export const LocationPrimary = ({ locationPrimaryTitleRef }) => {
	const { story, storyIcon, primaryStoryStyles, toOverviewSection, toSubpagesSection } = LocationPrimaryLogic();

	return (
		<div className='location-primary-container' style={primaryStoryStyles}>
			<button className='location-primary-section-switcher-btn location-primary-section-switcher-btn-to-overview' onClick={toOverviewSection}>
				<FaChevronLeft />
			</button>
			<div className='location-primary'>
				<LocationPrimaryTitle locationPrimaryTitleRef={locationPrimaryTitleRef} primaryStoryStyles={primaryStoryStyles} />
				<div className='location-primary-story'>
					<div className='location-primary-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
					<div className='location-primary-story-name'>{story?.data?.title}</div>
				</div>
			</div>
			<button className='location-primary-section-switcher-btn location-primary-section-switcher-btn-to-subpages' onClick={toSubpagesSection}>
				<FaChevronRight />
			</button>
		</div>
	);
};
