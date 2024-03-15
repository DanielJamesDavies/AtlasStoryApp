// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { ToggleInput } from "../../../../../../components/ToggleInput/ToggleInput";

// Logic
import { SettingsMajorEventLogic } from "./SettingsMajorEventLogic";

// Context

// Services

// Styles

// Assets

export const SettingsMajorEvent = () => {
	const { unit_type, isAuthorizedToEdit, unit, toggleIsMajorEvent, revertIsMajorEvent, saveIsMajorEvent, errors } = SettingsMajorEventLogic();

	if (!["event"].includes(unit_type)) return null;
	return (
		<LabelContainer className='unit-page-subpage-settings-item' label='Major Event' isInline={true}>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertIsMajorEvent} onSave={saveIsMajorEvent}>
				<div>
					<ToggleInput value={unit?.data?.isMajor} onToggle={toggleIsMajorEvent} enableEdit={false} />
				</div>
				<div>
					<ToggleInput value={unit?.data?.isMajor} onToggle={toggleIsMajorEvent} enableEdit={true} />
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
