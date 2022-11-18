// Packages

// Components
import { FaTimes } from "react-icons/fa";
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { DropdownContainer } from "../../../../../components/DropdownContainer/DropdownContainer";
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./StorySettingsMemberItem.css";

// Assets

export const StorySettingsMemberItem = ({ member, index, memberType, memberTypes, changeMemberType, isEditing, isOwner, removeMember }) => {
	if (!member) return null;
	return (
		<ContentItem hasBg={true} margin='none' backgroundColour='grey4'>
			<div className='story-settings-member'>
				<div className='story-settings-member-profile-picture-container'>
					{!member?.profilePicture ? null : <img src={member?.profilePicture} alt='' />}
				</div>
				<div className='story-settings-member-names-container'>
					<div className='story-settings-member-nickname'>{member?.nickname}</div>
					<div className='story-settings-member-username'>@{member?.username}</div>
				</div>
				{!isEditing || isOwner ? (
					<div className='story-settings-member-type-container'>
						<div className='story-settings-member-type'>{memberType?.name}</div>
					</div>
				) : (
					<DropdownContainer
						className='story-settings-member-type-container'
						value={memberType?.name}
						onChange={(e) => changeMemberType(e, index)}
					>
						{memberTypes?.map((type, index) => (
							<div key={index}>{type.name}</div>
						))}
					</DropdownContainer>
				)}
				{!isEditing || isOwner ? null : (
					<div className='story-settings-member-item-btns-container'>
						<IconBtn icon={<FaTimes />} iconName='times' size='m' seamless={true} onClick={() => removeMember(member._id)} />
					</div>
				)}
			</div>
		</ContentItem>
	);
};
