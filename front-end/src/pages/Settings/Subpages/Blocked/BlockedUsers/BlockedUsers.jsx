// Packages

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";

// Logic
import { BlockedUsersLogic } from "./BlockedUsersLogic";

// Context

// Services

// Styles
import "./BlockedUsers.css";

// Assets

export const BlockedUsers = () => {
	const { blockedUsers, unblockUser } = BlockedUsersLogic();

	return (
		<ContentItem className='settings-item settings-item-blocked-users' size='s' hasBg={true}>
			<div className='settings-item-title'>Blocked Users</div>
			{blockedUsers?.length === 0 ? (
				<div className='settings-blocked-users-message'>No Users Blocked</div>
			) : (
				<div className='settings-blocked-users-list'>
					{blockedUsers?.map((user, index) => (
						<div key={index} className='settings-blocked-users-item'>
							<div className='settings-blocked-users-item-names'>
								<div>{user?.data?.nickname}</div>
								<div>@{user?.username}</div>
							</div>
							<button className='settings-blocked-users-item-unblock-btn' onClick={() => unblockUser(user?._id)}>
								Unblock
							</button>
						</div>
					))}
				</div>
			)}
		</ContentItem>
	);
};
