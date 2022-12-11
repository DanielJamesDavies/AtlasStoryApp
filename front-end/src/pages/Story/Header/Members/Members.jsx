// Packages

// Components

// Logic
import { MembersLogic } from "./MembersLogic";

// Context

// Services

// Styles
import "./Members.css";

// Assets

export const Members = () => {
	const { members, navigateToMember } = MembersLogic();

	return (
		<div className='story-header-main-info-members'>
			{!Array.isArray(members) || members?.filter((e) => e.type !== "viewer")?.length === 0 ? null : "By "}
			{members
				.filter((e) => e.type !== "viewer")
				.map((member, index) => (
					<div
						key={index}
						className='story-header-main-info-member'
						onClick={(e) => navigateToMember(e, member?.username)}
						onAuxClick={(e) => navigateToMember(e, member?.username)}
						onMouseDown={(e) => e.preventDefault()}
					>
						{member?.nickname}
						{members.filter((e) => e.type !== "viewer").length - 1 === index ? null : ","}
						<div className='story-header-main-info-member-label'>
							<div className='ustory-header-main-info-member-label-username'>@{member?.username}</div>
						</div>
					</div>
				))}
		</div>
	);
};
