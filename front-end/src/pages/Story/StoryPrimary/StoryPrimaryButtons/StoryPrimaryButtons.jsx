// Packages
import { FaStickyNote, FaCog, FaSignOutAlt } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { StoryPrimaryButtonsLogic } from "./StoryPrimaryButtonsLogic";

// Context

// Services

// Styles
import "./StoryPrimaryButtons.css";

// Assets

export const StoryPrimaryButtons = () => {
	const { user_id, isAuthorizedToEdit, story, goToStoryNotes, openSettings, leaveStory } = StoryPrimaryButtonsLogic();

	return (
		<div className='story-primary-buttons-container'>
			<IconBtn className='story-primary-btn' seamless={true} size='l' icon={<FaStickyNote />} onClick={goToStoryNotes} label='Story Notes' />
			{!isAuthorizedToEdit ? null : (
				<IconBtn className='story-primary-btn' seamless={true} size='l' icon={<FaCog />} onClick={openSettings} label='Story Settings' />
			)}
			{story?.data?.members.findIndex((e) => e.user_id === user_id && e.type !== "owner") === -1 ? null : (
				<IconBtn className='story-primary-btn' seamless={true} size='l' icon={<FaSignOutAlt />} onClick={leaveStory} label='Leave Story' />
			)}
		</div>
	);
};
