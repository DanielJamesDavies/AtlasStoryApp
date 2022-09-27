// Packages
import { FaStickyNote } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { WorldTitleLogic } from "./WorldTitleLogic";

// Context

// Services

// Styles
import "./WorldTitle.css";

// Assets

export const WorldTitle = () => {
	const { story, storyIcon, goToWorldNotes } = WorldTitleLogic();

	return (
		<div className='world-title'>
			<div className='world-title-story-icon'>
				{!storyIcon ? <div className='world-title-story-icon-placeholder' /> : <img src={storyIcon} alt='' />}
			</div>
			{!story?.data?.title ? null : (
				<>
					<div className='world-title-story-title'>{story?.data?.title}</div>
					<div className='world-title-divider'>|</div>
					<div className='world-title-world-label'>World</div>
				</>
			)}
			<div className='world-title-notes-btn-container'>
				<IconBtn
					className='world-title-notes-btn'
					seamless={true}
					size='l'
					icon={<FaStickyNote />}
					iconName='sticky-note'
					onClick={goToWorldNotes}
					label='World Notes'
				/>
			</div>
		</div>
	);
};
