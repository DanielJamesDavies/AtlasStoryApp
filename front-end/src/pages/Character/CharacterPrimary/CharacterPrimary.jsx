// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { CharacterPrimaryName } from "./CharacterPrimaryName/CharacterPrimaryName";
import { CharacterPrimaryType } from "./CharacterPrimaryType/CharacterPrimaryType";
import { CharacterPrimaryVersion } from "./CharacterPrimaryVersion/CharacterPrimaryVersion";

// Logic
import { CharacterPrimaryLogic } from "./CharacterPrimaryLogic";

// Context

// Services

// Styles
import "./CharacterPrimary.css";

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
				<CharacterPrimaryName />
				<CharacterPrimaryType />
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
