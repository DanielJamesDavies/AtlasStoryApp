// Packages
import { FaCog } from "react-icons/fa";

// Components
import { StoryPrimaryBanner } from "./StoryPrimaryBanner";
import { StoryPrimaryIcon } from "./StoryPrimaryIcon";
import { StoryPrimaryTitle } from "./StoryPrimaryTitle";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { StoryPrimaryLogic } from "./StoryPrimaryLogic";

// Context

// Services

// Styles
import "./StoryPrimary.css";

// Assets

export const StoryPrimary = () => {
	const { isAuthorizedToEdit, members } = StoryPrimaryLogic();

	return (
		<div className='story-primary'>
			<StoryPrimaryBanner />
			<div className='story-primary-break'></div>
			<StoryPrimaryIcon />
			<div className={isAuthorizedToEdit ? "story-primary-main-info story-primary-main-info-is-authorized" : "story-primary-main-info"}>
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
