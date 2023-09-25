// Packages
import { FaStickyNote } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { ObjectsTitleLogic } from "./ObjectsTitleLogic";

// Context

// Services

// Styles
import "./ObjectsTitle.css";

// Assets

export const ObjectsTitle = () => {
	const { story, storyIcon, goToObjectsNotes } = ObjectsTitleLogic();

	return (
		<div className='objects-title'>
			<div className='objects-title-story-icon'>
				{!storyIcon ? <div className='objects-title-story-icon-placeholder' /> : <img src={storyIcon} alt='' />}
			</div>
			{!story?.data?.title ? null : (
				<>
					<div className='objects-title-story-title'>{story?.data?.title}</div>
					<div className='objects-title-divider'>|</div>
					<div className='objects-title-objects-label'>Objects</div>
				</>
			)}
			<div className='objects-title-notes-btn-container'>
				<IconBtn
					className='objects-title-notes-btn'
					seamless={true}
					size='l'
					icon={<FaStickyNote />}
					iconName='sticky-note'
					onClick={goToObjectsNotes}
					label='Objects Notes'
				/>
			</div>
		</div>
	);
};
