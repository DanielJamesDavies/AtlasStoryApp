// Packages
import { FaStickyNote } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { LocationsTitleLogic } from "./LocationsTitleLogic";

// Context

// Services

// Styles
import "./LocationsTitle.css";

// Assets

export const LocationsTitle = () => {
	const { story, storyIcon, goToLocationsNotes } = LocationsTitleLogic();

	return (
		<div className='locations-title'>
			<div className='locations-title-story-icon'>
				{!storyIcon ? <div className='locations-title-story-icon-placeholder' /> : <img src={storyIcon} alt='' />}
			</div>
			{!story?.data?.title ? null : (
				<>
					<div className='locations-title-story-title'>{story?.data?.title}</div>
					<div className='locations-title-divider'>|</div>
					<div className='locations-title-locations-label'>Locations</div>
				</>
			)}
			<div className='locations-title-notes-btn-container'>
				<IconBtn
					className='locations-title-notes-btn'
					seamless={true}
					size='l'
					icon={<FaStickyNote />}
					iconName='sticky-note'
					onClick={goToLocationsNotes}
					label='Locations Notes'
				/>
			</div>
		</div>
	);
};
