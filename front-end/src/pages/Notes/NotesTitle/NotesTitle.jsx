// Packages

// Components

// Logic
import { NotesTitleLogic } from "./NotesTitleLogic";

// Context

// Services

// Styles
import "./NotesTitle.css";

// Assets

export const NotesTitle = () => {
	const { story, storyIcon, notesTitleLabel } = NotesTitleLogic();

	return (
		<div className='notes-title'>
			<div className='notes-title-story-icon'>
				{!storyIcon ? <div className='notes-title-story-icon-placeholder' /> : <img src={storyIcon} alt='' />}
			</div>
			{!story?.data?.title ? null : (
				<>
					<div className='notes-title-story-title'>{story?.data?.title}</div>
					{notesTitleLabel.split("").length === 0 ? null : (
						<>
							<div className='notes-title-divider'>|</div>
							<div className='notes-title-notes-label'>{notesTitleLabel}</div>
						</>
					)}
					<div className='notes-title-divider'>|</div>
					<div className='notes-title-notes-label'>Notes</div>
				</>
			)}
		</div>
	);
};
