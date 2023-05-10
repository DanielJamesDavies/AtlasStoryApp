// Packages
import { FaChevronRight } from "react-icons/fa";

// Components

// Logic
import { CharacterSectionSwitcherLogic } from "./SectionSwitcherLogic";

// Context

// Services

// Styles
import "./SectionSwitcher.css";

// Assets

export const CharacterSectionSwitcher = () => {
	const { isOnOverviewSection, toggleIsOnOverviewSection } = CharacterSectionSwitcherLogic();

	return (
		<div
			className={
				isOnOverviewSection
					? "character-section-switcher character-section-switcher-on-overview"
					: "character-section-switcher character-section-switcher-on-subpages"
			}
		>
			<button className='character-section-switcher-btn' onClick={toggleIsOnOverviewSection}>
				<FaChevronRight />
			</button>
		</div>
	);
};
