// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./UserItem.css";

// Assets

export const UserItem = ({ user, addMember }) => {
	if (!user) return null;
	return (
		<div className='story-settings-members-user-item-container'>
			<ContentItem margin='none' hasBg={true} backgroundColour='grey3'>
				<div className='story-settings-members-user-item'>
					<div className='story-settings-members-user-item-profile-picture-container'>
						{!user?.data?.profilePicture?.image ? null : <img src={user.data.profilePicture.image} alt='' />}
					</div>
					<div className='story-settings-members-user-item-names-container'>
						<div className='story-settings-members-user-item-names-nickname'>{user?.data?.nickname}</div>
						{!user?.username ? null : <div className='story-settings-members-user-item-names-username'>@{user?.username}</div>}
					</div>
					<div className='story-settings-members-user-item-btns-container'>
						<IconBtn icon={<FaPlus />} iconName='plus' size='m' seamless={true} onClick={() => addMember(user._id)} />
					</div>
				</div>
			</ContentItem>
		</div>
	);
};
