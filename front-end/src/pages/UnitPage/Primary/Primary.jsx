// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { Story } from "./Story/Story";
import { Name } from "./Name/Name";
import { CharacterType } from "./CharacterType/CharacterType";
import { Version } from "./Version/Version";
import { GoToMapBtn } from "./GoToMapBtn/GoToMapBtn";

// Logic
import { PrimaryLogic } from "./PrimaryLogic";

// Context

// Services

// Styles
import "./Primary.css";

// Assets

export const Primary = () => {
	const { unit_type, unitPagePrimaryRef, unitPagePrimaryVersionRef, primaryStoryStyles, toOverviewSection, toSubpagesSection } = PrimaryLogic();

	return (
		<div ref={unitPagePrimaryRef} className='unit-page-primary-container' style={primaryStoryStyles}>
			<button
				className='unit-page-primary-section-switcher-btn unit-page-primary-section-switcher-btn-to-overview'
				onClick={toOverviewSection}
			>
				<FaChevronLeft />
			</button>
			<div className='unit-page-primary'>
				<Story />
				<div className='unit-page-primary-name-and-type-container'>
					<Name primaryStoryStyles={primaryStoryStyles} />
					{unit_type !== "character" ? null : <CharacterType primaryStoryStyles={primaryStoryStyles} />}
				</div>
				{!["character", "group"].includes(unit_type) ? null : <Version unitPagePrimaryVersionRef={unitPagePrimaryVersionRef} />}
				{!["location"].includes(unit_type) ? null : <GoToMapBtn unitPagePrimaryVersionRef={unitPagePrimaryVersionRef} />}
			</div>
			<button
				className='unit-page-primary-section-switcher-btn unit-page-primary-section-switcher-btn-to-subpages'
				onClick={toSubpagesSection}
			>
				<FaChevronRight />
			</button>
		</div>
	);
};
