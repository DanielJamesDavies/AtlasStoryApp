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
	const { members, navigateToMember } = StoryPrimaryMembersLogic();

	return (
		<div className='story-primary-main-info-members'>
			{!Array.isArray(members) || members?.filter((e) => e.type !== "viewer")?.length === 0 ? null : "By "}
			{members
				.filter((e) => e.type !== "viewer")
				.map((member, index) => (
					<div
						key={index}
						className='story-primary-main-info-member'
						onClick={(e) => navigateToMember(e, member?.username)}
						onAuxClick={(e) => navigateToMember(e, member?.username)}
						onMouseDown={(e) => e.preventDefault()}
					>
						{member?.nickname}
						{members.filter((e) => e.type !== "viewer").length - 1 === index ? null : ","}
						<div className='story-primary-main-info-member-label'>
							<div className='ustory-primary-main-info-member-label-username'>@{member?.username}</div>
						</div>
					</div>
				))}
		</div>
	);
};
