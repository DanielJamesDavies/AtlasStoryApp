// Packages
import { FaCog, FaSignOutAlt } from "react-icons/fa";

// Components

// Logic
import { StoryPrimaryLogic } from "./StoryPrimaryLogic";

// Context

// Services

// Styles
import "./StoryPrimary.css";

// Assets

export const StoryPrimary = () => {
	const { story, members, icon, banner, isAuthorizedStoryProfile, logOut } = StoryPrimaryLogic();

	return (
		<div className='story-primary'>
			<div className='story-primary-banner'>{!banner ? null : <img src={banner} alt='' />}</div>
			<div className='story-primary-break'></div>
			<div className='story-primary-icon'>{!icon ? null : <img src={icon} alt='' />}</div>
			<div className='story-primary-main-info'>
				<div className='story-primary-main-info-title'>{story?.data?.title}</div>
				<div className='story-primary-main-info-creators'>
					{!Array.isArray(members) || members?.length === 0 ? null : "By "}
					{members.map((member, index) => (
						<p key={index} className='story-primary-main-info-creator'>
							{member?.nickname}
							{members.length - 1 === index ? null : ","}
						</p>
					))}
				</div>
			</div>
			{!isAuthorizedStoryProfile ? null : (
				<div className='story-primary-auth-buttons-container'>
					<button className='story-primary-auth-btn story-primary-auth-btn-settings'>
						<FaCog />
					</button>
					<button className='story-primary-auth-btn story-primary-auth-log-out' onClick={logOut}>
						<FaSignOutAlt />
					</button>
				</div>
			)}
		</div>
	);
};
