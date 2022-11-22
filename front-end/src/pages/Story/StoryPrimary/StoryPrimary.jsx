// Packages

// Components
import { StoryPrimaryBanner } from "./StoryPrimaryBanner/StoryPrimaryBanner";
import { StoryPrimaryIcon } from "./StoryPrimaryIcon/StoryPrimaryIcon";
import { StoryPrimaryTitle } from "./StoryPrimaryTitle/StoryPrimaryTitle";
import { StoryPrimaryMembers } from "./StoryPrimaryMembers/StoryPrimaryMembers";
import { StoryPrimaryButtons } from "./StoryPrimaryButtons/StoryPrimaryButtons";

// Logic
import { StoryPrimaryLogic } from "./StoryPrimaryLogic";

// Context

// Services

// Styles
import "./StoryPrimary.css";
import { StoryPrimaryFollowBtn } from "./StoryPrimaryFollowBtn/StoryPrimaryFollowBtn";

// Assets

export const StoryPrimary = () => {
	const { isAuthorizedToEdit, user_id, story } = StoryPrimaryLogic();

	return (
		<div className={isAuthorizedToEdit ? "story-primary-container story-primary-container-is-authorized" : "story-primary-container"}>
			<div className='story-primary'>
				<StoryPrimaryBanner />
				<div className='story-primary-break'></div>
				<StoryPrimaryIcon />
				<div
					className={
						story?.data?.members.findIndex((e) => e.user_id === user_id) !== -1
							? "story-primary-title-members-follow-container story-primary-title-members-follow-container-is-member"
							: "story-primary-title-members-follow-container"
					}
				>
					<div>
						<StoryPrimaryTitle />
						<StoryPrimaryMembers />
					</div>
					<div>
						<StoryPrimaryFollowBtn />
					</div>
				</div>
				<StoryPrimaryButtons />
			</div>
			<div className='story-primary story-primary-mobile'>
				<StoryPrimaryBanner />
				<div className='story-primary-break'></div>
				<div className='story-primary-icon-follow-buttons-container'>
					<StoryPrimaryIcon />
					<StoryPrimaryFollowBtn />
					<StoryPrimaryButtons />
				</div>
				<div
					className={
						story?.data?.members.findIndex((e) => e.user_id === user_id) !== -1
							? "story-primary-title-members-container story-primary-title-members-container-is-member"
							: "story-primary-title-members-container"
					}
				>
					<StoryPrimaryTitle />
					<StoryPrimaryMembers />
				</div>
			</div>
		</div>
	);
};
