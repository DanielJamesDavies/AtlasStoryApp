// Packages
import { FaChevronRight } from "react-icons/fa";

// Components

// Logic
import { LocationSectionSwitcherLogic } from "./LocationSectionSwitcherLogic";

// Context

// Services

// Styles
import "./LocationSectionSwitcher.css";

// Assets

export const LocationSectionSwitcher = () => {
	const { isOnOverviewSection, toggleIsOnOverviewSection } = LocationSectionSwitcherLogic();

	return (
		<div
			className={
				isOnOverviewSection
					? "location-section-switcher location-section-switcher-on-overview"
					: "location-section-switcher location-section-switcher-on-subpages"
			}
		>
			<button className='location-section-switcher-btn' onClick={toggleIsOnOverviewSection}>
				<FaChevronRight />
			</button>
		</div>
	);
};
