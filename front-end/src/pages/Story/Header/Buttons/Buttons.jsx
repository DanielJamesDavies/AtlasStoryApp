// Packages
import { FaStickyNote, FaCog, FaSignOutAlt } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { ButtonsLogic } from "./ButtonsLogic";

// Context

// Services

// Styles
import "./Buttons.css";

// Assets

export const Buttons = () => {
	const { user_id, isAuthorizedToEdit, isFollowingStory, story, goToStoryNotes, openSettings, leaveStory, onFollowStoryBtnClick } =
		ButtonsLogic();

	return (
		<div className='story-header-buttons-container'>
			{!story ? null : (
				<>
					<button
						className={isFollowingStory ? "story-header-follow-btn story-header-follow-btn-is-following" : "story-header-follow-btn"}
						onClick={onFollowStoryBtnClick}
					>
						<div className='story-header-follow-btn-text story-header-follow-btn-text-follow'>Follow</div>
						<div className='story-header-follow-btn-text story-header-follow-btn-text-following'>Following</div>
						<div className='story-header-follow-btn-text story-header-follow-btn-text-unfollow'>Unfollow</div>
					</button>
					<IconBtn
						className='story-header-btn'
						seamless={true}
						size='l'
						icon={<FaStickyNote />}
						onClick={goToStoryNotes}
						label='Story Notes'
					/>
					{!isAuthorizedToEdit ? null : (
						<IconBtn
							className='story-header-btn'
							seamless={true}
							size='l'
							icon={<FaCog />}
							onClick={openSettings}
							label='Story Settings'
						/>
					)}
					{story?.data?.members.findIndex((e) => e.user_id === user_id && e.type !== "owner") === -1 ? null : (
						<IconBtn
							className='story-header-btn'
							seamless={true}
							size='l'
							icon={<FaSignOutAlt />}
							onClick={leaveStory}
							label='Leave Story'
						/>
					)}
				</>
			)}
		</div>
	);
};
