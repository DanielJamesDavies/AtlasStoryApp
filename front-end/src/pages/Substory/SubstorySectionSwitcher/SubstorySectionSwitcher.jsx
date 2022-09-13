// Packages
import { FaChevronRight } from "react-icons/fa";

// Components

// Logic
import { SubstorySectionSwitcherLogic } from "./SubstorySectionSwitcherLogic";

// Context

// Services

// Styles
import "./SubstorySectionSwitcher.css";

// Assets

export const SubstorySectionSwitcher = () => {
	const { isOnOverviewSection, toggleIsOnOverviewSection } = SubstorySectionSwitcherLogic();

	return (
		<div
			className={
				isOnOverviewSection
					? "substory-section-switcher substory-section-switcher-on-overview"
					: "substory-section-switcher substory-section-switcher-on-subpages"
			}
		>
			<button className='substory-section-switcher-btn' onClick={toggleIsOnOverviewSection}>
				<FaChevronRight />
			</button>
		</div>
	);
};
