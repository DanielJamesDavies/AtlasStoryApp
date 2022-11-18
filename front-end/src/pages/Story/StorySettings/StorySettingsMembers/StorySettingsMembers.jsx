// Packages

// Components
import { StorySettingsMemberItem } from "./StorySettingsMemberItem/StorySettingsMemberItem";
import { StorySettingsMembersUserItem } from "./StorySettingsMembersUserItem/StorySettingsMembersUserItem";
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { LoadingCircle } from "../../../../components/LoadingCircle/LoadingCircle";
import { ContentItem } from "../../../../components/ContentItem/ContentItem";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { StorySettingsMembersLogic } from "./StorySettingsMembersLogic";

// Context

// Services

// Styles
import "./StorySettingsMembers.css";

// Assets

export const StorySettingsMembers = () => {
	const {
		isAuthorizedToEdit,
		story,
		members,
		users,
		memberTypes,
		changeMemberType,
		revertMembers,
		saveMembers,
		errors,
		searchUsersValue,
		changeSearchUsersValue,
		addMember,
		removeMember,
	} = StorySettingsMembersLogic();

	return (
		<div>
			<EditableContainer
				className='story-settings-members-container story-settings-input-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertMembers}
				onSave={saveMembers}
			>
				<div>
					{!members ? (
						<div className='story-settings-members-loading-container'>
							<LoadingCircle size='s' center={true} />
						</div>
					) : (
						<ContentItem hasBg={true} margin='none' backgroundColour='grey3'>
							<div className='story-settings-members-list-container'>
								{story?.data?.members?.map((member, index) => (
									<div key={index} className='story-settings-member-item-container'>
										<StorySettingsMemberItem
											member={members?.find((e) => e._id === member.user_id)}
											memberType={memberTypes?.find((e) => e.id === member?.type)}
											isEditing={false}
										/>
									</div>
								))}
							</div>
						</ContentItem>
					)}
				</div>
				<div>
					<ErrorMessage errors={errors} />
					<div>
						{!members ? (
							<div className='story-settings-members-loading-container'>
								<LoadingCircle size='s' center={true} />
							</div>
						) : (
							<ContentItem hasBg={true} margin='none' backgroundColour='grey3'>
								<div className='story-settings-members-list-container'>
									{story?.data?.members?.map((member, index) => (
										<div key={index} className='story-settings-member-item-container'>
											<StorySettingsMemberItem
												member={members?.find((e) => e._id === member.user_id)}
												index={index}
												memberType={memberTypes?.find((e) => e.id === member?.type)}
												memberTypes={memberTypes}
												changeMemberType={changeMemberType}
												isEditing={true}
												isOwner={story?.owner === member.user_id}
												removeMember={removeMember}
											/>
										</div>
									))}
								</div>
								<div className='story-settings-members-users-container'>
									<div className='story-settings-members-users-search-container'>
										<TextInput
											label='Search Users'
											value={searchUsersValue}
											onChange={changeSearchUsersValue}
											size='s'
											backgroundColour='grey4'
										/>
									</div>
									<div className='story-settings-members-users-list-container'>
										{!users
											? null
											: users
													.filter(
														(e) =>
															story?.data?.members.findIndex((e2) => e2.user_id === e._id) === -1 &&
															(new RegExp("^" + searchUsersValue, "i").test(e.data.nickname) ||
																new RegExp("^" + searchUsersValue, "i").test(e.username))
													)
													.sort((a, b) => {
														const regex = new RegExp("^" + searchUsersValue, "i");
														return regex.test(a.data.nickname) ? (regex.test(b.data.nickname) ? 1 : -1) : 1;
													})
													.map((user, index) => (
														<StorySettingsMembersUserItem key={index} user={user} addMember={addMember} />
													))}
									</div>
								</div>
							</ContentItem>
						)}
					</div>
				</div>
			</EditableContainer>
		</div>
	);
};
