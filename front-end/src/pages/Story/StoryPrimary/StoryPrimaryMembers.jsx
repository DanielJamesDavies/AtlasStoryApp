// Packages

// Components

// Logic
import { StoryPrimaryMembersLogic } from "./StoryPrimaryMembersLogic";

// Context

// Services

// Styles
import "./StoryPrimaryMembers.css";

// Assets

export const StoryPrimaryMembers = () => {
	const { members } = StoryPrimaryMembersLogic();

	return (
		<div className='story-primary-main-info-members'>
			{!Array.isArray(members) || members?.length === 0 ? null : "By "}
			{members.map((member, index) => (
				<p key={index} className='story-primary-main-info-member'>
					{member?.nickname}
					{members.length - 1 === index ? null : ","}
				</p>
			))}
		</div>
	);
};
