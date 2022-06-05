// Packages
import { FaCog } from "react-icons/fa";

// Components
import { StoryPrimaryBanner } from "./StoryPrimaryBanner";
import { StoryPrimaryIcon } from "./StoryPrimaryIcon";
import { StoryPrimaryTitle } from "./StoryPrimaryTitle";
import { StoryPrimaryMembers } from "./StoryPrimaryMembers";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { StoryPrimaryLogic } from "./StoryPrimaryLogic";

// Context

// Services

// Styles
import "./StoryPrimary.css";

// Assets

export const StoryPrimary = () => {
	const { isAuthorizedToEdit } = StoryPrimaryLogic();

	return (
		<div className='story-primary'>
			<StoryPrimaryBanner />
			<div className='story-primary-break'></div>
			<StoryPrimaryIcon />
			<div className={isAuthorizedToEdit ? "story-primary-main-info story-primary-main-info-is-authorized" : "story-primary-main-info"}>
				<StoryPrimaryTitle />
				<StoryPrimaryMembers />
			</div>
			{!isAuthorizedToEdit ? null : (
				<div className='story-primary-auth-buttons-container'>
					<IconBtn className='story-primary-auth-btn story-primary-auth-btn-settings' seamless={true} size='l' icon={<FaCog />} />
				</div>
			)}
		</div>
	);
};
