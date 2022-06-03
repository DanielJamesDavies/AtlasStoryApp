// Packages
import { FaCog } from "react-icons/fa";

// Components
import { StoryPrimaryTitle } from "./StoryPrimaryTitle";

// Logic
import { StoryPrimaryLogic } from "./StoryPrimaryLogic";

// Context

// Services

// Styles
import "./StoryPrimary.css";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Assets

export const StoryPrimary = () => {
	const { isAuthorizedToEdit, members, icon, banner } = StoryPrimaryLogic();

	return (
		<div className='story-primary'>
			<div className='story-primary-banner'>{!banner ? null : <img src={banner} alt='' />}</div>
			<div className='story-primary-break'></div>
			<div className='story-primary-icon'>{!icon ? null : <img src={icon} alt='' />}</div>
			<div className='story-primary-main-info'>
				<StoryPrimaryTitle />
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
			{!isAuthorizedToEdit ? null : (
				<div className='story-primary-auth-buttons-container'>
					<IconBtn className='story-primary-auth-btn story-primary-auth-btn-settings' seamless={true} size='l' icon={<FaCog />} />
				</div>
			)}
		</div>
	);
};
