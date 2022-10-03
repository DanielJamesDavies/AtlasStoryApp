// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./StorySettingsMember.css";

// Assets

export const StorySettingsMember = ({ member, type, changeMemberType, isEditing }) => {
	if (!member) return null;
	return (
		<div className='story-settings-member'>
			<div className='story-settings-member-profile-picture-container'>
				{!member?.profilePicture ? null : <img src={member?.profilePicture} alt='' />}
			</div>
			<div className='story-settings-member-names-container'>
				<div className='story-settings-member-nickname'>{member?.nickname}</div>
				<div className='story-settings-member-username'>@{member?.username}</div>
			</div>
			<div className='story-settings-member-type'>{type?.name}</div>
		</div>
	);
};
