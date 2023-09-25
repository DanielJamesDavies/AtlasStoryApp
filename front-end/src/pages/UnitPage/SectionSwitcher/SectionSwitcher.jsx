// Packages
import { FaChevronRight } from "react-icons/fa";

// Components

// Logic
import { SectionSwitcherLogic } from "./SectionSwitcherLogic";

// Context

// Services

// Styles
import "./SectionSwitcher.css";

// Assets

export const SectionSwitcher = () => {
	const { isOnOverviewSection, toggleIsOnOverviewSection } = SectionSwitcherLogic();

	return (
		<div
			className={
				isOnOverviewSection
					? "unit-page-section-switcher unit-page-section-switcher-on-overview"
					: "unit-page-section-switcher unit-page-section-switcher-on-subpages"
			}
		>
			<button className='unit-page-section-switcher-btn' onClick={toggleIsOnOverviewSection}>
				<FaChevronRight />
			</button>
		</div>
	);
};
