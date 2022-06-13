// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DropdownContainer } from "../../../../../../components/DropdownContainer/DropdownContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
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
	);
};
