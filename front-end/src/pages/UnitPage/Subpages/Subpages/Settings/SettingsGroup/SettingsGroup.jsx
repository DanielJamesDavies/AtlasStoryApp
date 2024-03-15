// Packages

// Components
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DropdownContainer } from "../../../../../../components/DropdownContainer/DropdownContainer";

// Logic
import { SettingsGroupLogic } from "./SettingsGroupLogic";

// Context

// Services

// Styles
import "./SettingsGroup.css";

// Assets

export const SettingsGroup = () => {
	const { unit_type, isAuthorizedToEdit, storyGroups, group, changeGroup, revertGroup, saveGroup } = SettingsGroupLogic();

	if (!["character"].includes(unit_type)) return null;
	return (
		<div className='unit-page-subpage-settings-item unit-page-settings-group'>
			<LabelContainer label='Group' isInline={true}>
				<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertGroup} onSave={saveGroup} higherEditBtns={true}>
					<div>{group?.data?.name}</div>
					<DropdownContainer value={group?.data?.name} onChange={changeGroup}>
						{storyGroups.map((groupsGroup, index) => (
							<div key={index}>{groupsGroup?.data?.name}</div>
						))}
					</DropdownContainer>
				</EditableContainer>
			</LabelContainer>
		</div>
	);
};
