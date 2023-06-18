// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { GroupPrimaryName } from "./Name/Name";
import { GroupPrimaryVersion } from "./Version/Version";

// Logic
import { GroupPrimaryLogic } from "./PrimaryLogic";

// Context

// Services

// Styles
import "./Primary.css";

// Assets

export const GroupPrimary = ({ groupPrimaryRef }) => {
	const { story, storyIcon, groupPrimaryVersionRef, primaryStoryStyles, toOverviewSection, toSubpagesSection } = GroupPrimaryLogic({
		groupPrimaryRef,
	});

	return (
		<div ref={groupPrimaryRef} className='group-primary-container' style={primaryStoryStyles}>
			<button className='group-primary-section-switcher-btn group-primary-section-switcher-btn-to-overview' onClick={toOverviewSection}>
				<FaChevronLeft />
			</button>
			<div className='group-primary'>
				<div className='group-primary-story'>
					<div className='group-primary-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
					<div className='group-primary-story-name'>{story?.data?.title}</div>
				</div>
				<GroupPrimaryName primaryStoryStyles={primaryStoryStyles} />
				<GroupPrimaryVersion groupPrimaryVersionRef={groupPrimaryVersionRef} />
			</div>
			<button className='group-primary-section-switcher-btn group-primary-section-switcher-btn-to-subpages' onClick={toSubpagesSection}>
				<FaChevronRight />
			</button>
		</div>
	);
};
