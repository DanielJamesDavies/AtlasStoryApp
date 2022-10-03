// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { StorySettingsMember } from "./StorySettingsMember";

// Logic
import { StorySettingsMembersLogic } from "./StorySettingsMembersLogic";

// Context

// Services

// Styles

// Assets

export const StorySettingsMembers = () => {
	const { isAuthorizedToEdit, story, members, types, changeMemberType, revertMembers, saveMembers, errors } = StorySettingsMembersLogic();

	return (
		<div>
			<EditableContainer
				className='story-settings-input-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertMembers}
				onSave={saveMembers}
			>
				<div>
					{story?.data?.members?.map((member, index) => (
						<div key={index} className='story-settings-member-container'>
							<StorySettingsMember
								member={members?.find((e) => e._id === member.user_id)}
								type={types?.find((e) => e.id === member?.type)}
								isEditing={false}
							/>
						</div>
					))}
				</div>
				<div>
					<ErrorMessage errors={errors} />
					<div>
						{story?.data?.members?.map((member, index) => (
							<div key={index} className='story-settings-member-container'>
								<StorySettingsMember
									member={members?.find((e) => e._id === member.user_id)}
									type={types?.find((e) => e.id === member?.type)}
									changeMemberType={changeMemberType}
									isEditing={true}
								/>
							</div>
						))}
					</div>
				</div>
			</EditableContainer>
		</div>
	);
};
