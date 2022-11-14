// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DropdownContainer } from "../../../../../../components/DropdownContainer/DropdownContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsGroupLogic } from "./SettingsGroupLogic";

// Context

// Services

// Styles

// Assets

export const SettingsGroup = () => {
	const { isAuthorizedToEdit, groups, group, changeGroup, revertGroup, saveGroup, errors } = SettingsGroupLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Group' isInline={true}>
				<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertGroup} onSave={saveGroup}>
					<div>
						<div>{group?.data?.name}</div>
					</div>
					<div>
						<DropdownContainer value={group?.data?.name} onChange={changeGroup}>
							{groups.map((groupsGroup, index) => (
								<div key={index} className=''>
									{groupsGroup?.data?.name}
								</div>
							))}
						</DropdownContainer>
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
