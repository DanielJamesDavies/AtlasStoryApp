// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { SubstoryPrimaryTitle } from "./SubstoryPrimaryTitle/SubstoryPrimaryTitle";

// Logic
import { SubstoryPrimaryLogic } from "./SubstoryPrimaryLogic";

// Context

// Services

// Styles
import "./SubstoryPrimary.css";

// Assets

export const SubstoryPrimary = ({ substoryPrimaryTitleRef }) => {
	const { story, storyIcon, primaryStoryNameStyles, toOverviewSection, toSubpagesSection } = SubstoryPrimaryLogic();

	return (
		<div className='substory-primary-container'>
			<button className='substory-primary-section-switcher-btn substory-primary-section-switcher-btn-to-overview' onClick={toOverviewSection}>
				<FaChevronLeft />
			</button>
			<div className='substory-primary'>
				<SubstoryPrimaryTitle substoryPrimaryTitleRef={substoryPrimaryTitleRef} />
				<div className='substory-primary-story'>
					<div className='substory-primary-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
					<div className='substory-primary-story-name' style={primaryStoryNameStyles}>
						{story?.data?.title}
					</div>
				</div>
			</div>
			<button className='substory-primary-section-switcher-btn substory-primary-section-switcher-btn-to-subpages' onClick={toSubpagesSection}>
				<FaChevronRight />
			</button>
		</div>
	);
};
