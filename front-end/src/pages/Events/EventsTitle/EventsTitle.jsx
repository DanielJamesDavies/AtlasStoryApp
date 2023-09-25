// Packages
import { FaStickyNote } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { EventsTitleLogic } from "./EventsTitleLogic";

// Context

// Services

// Styles
import "./EventsTitle.css";

// Assets

export const EventsTitle = () => {
	const { story, storyIcon, goToEventsNotes } = EventsTitleLogic();

	return (
		<div className='events-title'>
			<div className='events-title-story-icon'>
				{!storyIcon ? <div className='events-title-story-icon-placeholder' /> : <img src={storyIcon} alt='' />}
			</div>
			{!story?.data?.title ? null : (
				<>
					<div className='events-title-story-title'>{story?.data?.title}</div>
					<div className='events-title-divider'>|</div>
					<div className='events-title-events-label'>Events</div>
				</>
			)}
			<div className='events-title-notes-btn-container'>
				<IconBtn
					className='events-title-notes-btn'
					seamless={true}
					size='l'
					icon={<FaStickyNote />}
					iconName='sticky-note'
					onClick={goToEventsNotes}
					label='Events Notes'
				/>
			</div>
		</div>
	);
};
