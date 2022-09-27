// Packages
import { FaStickyNote } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { SubstoriesTitleLogic } from "./SubstoriesTitleLogic";

// Context

// Services

// Styles
import "./SubstoriesTitle.css";

// Assets

export const SubstoriesTitle = () => {
	const { story, storyIcon, goToSubstoriesNotes } = SubstoriesTitleLogic();

	return (
		<div className='substories-title'>
			<div className='substories-title-story-icon'>
				{!storyIcon ? <div className='substories-title-story-icon-placeholder' /> : <img src={storyIcon} alt='' />}
			</div>
			{!story?.data?.title ? null : (
				<>
					<div className='substories-title-story-title'>{story?.data?.title}</div>
					<div className='substories-title-divider'>|</div>
					<div className='substories-title-substories-label'>Substories</div>
				</>
			)}
			<div className='substories-title-notes-btn-container'>
				<IconBtn
					className='substories-title-notes-btn'
					seamless={true}
					size='l'
					icon={<FaStickyNote />}
					iconName='sticky-note'
					onClick={goToSubstoriesNotes}
					label='Substories Notes'
				/>
			</div>
		</div>
	);
};
