// Packages
import { FaCog, FaStickyNote } from "react-icons/fa";

// Components
import { StoryPrimaryBanner } from "./StoryPrimaryBanner/StoryPrimaryBanner";
import { StoryPrimaryIcon } from "./StoryPrimaryIcon/StoryPrimaryIcon";
import { StoryPrimaryTitle } from "./StoryPrimaryTitle/StoryPrimaryTitle";
import { StoryPrimaryMembers } from "./StoryPrimaryMembers/StoryPrimaryMembers";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { StoryPrimaryLogic } from "./StoryPrimaryLogic";

// Context

// Services

// Styles
import "./StoryPrimary.css";

// Assets

export const StoryPrimary = () => {
	const { isAuthorizedToEdit, goToStoryNotes, openSettings } = StoryPrimaryLogic();

	return (
		<div className='story-primary'>
			<StoryPrimaryBanner />
			<div className='story-primary-break'></div>
			<StoryPrimaryIcon />
			<div className={isAuthorizedToEdit ? "story-primary-main-info story-primary-main-info-is-authorized" : "story-primary-main-info"}>
				<StoryPrimaryTitle />
				<StoryPrimaryMembers />
			</div>
			<div className='story-primary-buttons-container'>
				<IconBtn
					className='story-primary-btn'
					seamless={true}
					size='l'
					icon={<FaStickyNote />}
					onClick={goToStoryNotes}
					label='Story Notes'
				/>
				{!isAuthorizedToEdit ? null : (
					<IconBtn
						className='story-primary-btn'
						seamless={true}
						size='l'
						icon={<FaCog />}
						onClick={openSettings}
						label='Story Settings'
					/>
				)}
			</div>
		</div>
	);
};
