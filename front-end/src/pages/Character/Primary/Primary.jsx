// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { CharacterPrimaryName } from "./Name/Name";
import { CharacterPrimaryType } from "./Type/Type";
import { CharacterPrimaryVersion } from "./Version/Version";

// Logic
import { CharacterPrimaryLogic } from "./PrimaryLogic";

// Context

// Services

// Styles
import "./Primary.css";

// Assets

export const CharacterPrimary = ({ characterPrimaryRef }) => {
	const { story, storyIcon, characterPrimaryVersionRef, primaryStoryStyles, toOverviewSection, toSubpagesSection } = CharacterPrimaryLogic({
		characterPrimaryRef,
	});

	return (
		<div ref={characterPrimaryRef} className='character-primary-container' style={primaryStoryStyles}>
			<button
				className='character-primary-section-switcher-btn character-primary-section-switcher-btn-to-overview'
				onClick={toOverviewSection}
			>
				<FaChevronLeft />
			</button>
			<div className='character-primary'>
				<div className='character-primary-story'>
					<div className='character-primary-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
					<div className='character-primary-story-name'>{story?.data?.title}</div>
				</div>
				<div className='character-primary-name-and-type-container'>
					<CharacterPrimaryName primaryStoryStyles={primaryStoryStyles} />
					<CharacterPrimaryType primaryStoryStyles={primaryStoryStyles} />
				</div>
				<CharacterPrimaryVersion characterPrimaryVersionRef={characterPrimaryVersionRef} />
			</div>
			<button
				className='character-primary-section-switcher-btn character-primary-section-switcher-btn-to-subpages'
				onClick={toSubpagesSection}
			>
				<FaChevronRight />
			</button>
		</div>
	);
};
