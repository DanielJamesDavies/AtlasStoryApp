// Packages
import { FaStickyNote } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { LoreTitleLogic } from "./LoreTitleLogic";

// Context

// Services

// Styles
import "./LoreTitle.css";

// Assets

export const LoreTitle = () => {
	const { story, storyIcon, goToLoreNotes } = LoreTitleLogic();

	return (
		<div className='lore-title'>
			<div className='lore-title-story-icon'>
				{!storyIcon ? <div className='lore-title-story-icon-placeholder' /> : <img src={storyIcon} alt='' />}
			</div>
			{!story?.data?.title ? null : (
				<>
					<div className='lore-title-story-title'>{story?.data?.title}</div>
					<div className='lore-title-divider'>|</div>
					<div className='lore-title-lore-label'>World Building</div>
				</>
			)}
			<div className='lore-title-notes-btn-container'>
				<IconBtn
					className='lore-title-notes-btn'
					seamless={true}
					size='l'
					icon={<FaStickyNote />}
					iconName='sticky-note'
					onClick={goToLoreNotes}
					label='Lore Notes'
				/>
			</div>
		</div>
	);
};
