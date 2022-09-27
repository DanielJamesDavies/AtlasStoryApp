// Packages
import { FaStickyNote } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { CharactersTitleLogic } from "./CharactersTitleLogic";

// Context

// Services

// Styles
import "./CharactersTitle.css";

// Assets

export const CharactersTitle = () => {
	const { story, storyIcon, goToCharactersNotes } = CharactersTitleLogic();

	return (
		<div className='characters-title'>
			<div className='characters-title-story-icon'>
				{!storyIcon ? <div className='characters-title-story-icon-placeholder' /> : <img src={storyIcon} alt='' />}
			</div>
			{!story?.data?.title ? null : (
				<>
					<div className='characters-title-story-title'>{story?.data?.title}</div>
					<div className='characters-title-divider'>|</div>
					<div className='characters-title-characters-label'>Characters</div>
				</>
			)}
			<div className='characters-title-notes-btn-container'>
				<IconBtn
					className='characters-title-notes-btn'
					seamless={true}
					size='l'
					icon={<FaStickyNote />}
					iconName='sticky-note'
					onClick={goToCharactersNotes}
					label='Characters Notes'
				/>
			</div>
		</div>
	);
};
