// Packages
import { FaChevronRight } from "react-icons/fa";

// Components

// Logic
import { GroupSectionSwitcherLogic } from "./SectionSwitcherLogic";

// Context

// Services

// Styles
import "./SectionSwitcher.css";

// Assets

export const GroupSectionSwitcher = () => {
	const { isOnOverviewSection, toggleIsOnOverviewSection } = GroupSectionSwitcherLogic();

	return (
		<div
			className={
				isOnOverviewSection
					? "group-section-switcher group-section-switcher-on-overview"
					: "group-section-switcher group-section-switcher-on-subpages"
			}
		>
			<button className='group-section-switcher-btn' onClick={toggleIsOnOverviewSection}>
				<FaChevronRight />
			</button>
		</div>
	);
};
