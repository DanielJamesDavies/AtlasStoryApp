// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { ToggleInput } from "../../../../../../components/ToggleInput/ToggleInput";

// Logic
import { SettingsPrimaryCharacterLogic } from "./SettingsPrimaryCharacterLogic";

// Context

// Services

// Styles

// Assets

export const SettingsPrimaryCharacter = () => {
	const { unit_type, isAuthorizedToEdit, unit, toggleIsPrimaryCharacter, revertIsPrimaryCharacter, saveIsPrimaryCharacter, errors } =
		SettingsPrimaryCharacterLogic();

	if (!["character"].includes(unit_type)) return null;
	return (
		<LabelContainer className='unit-page-subpage-settings-item' label='Primary Character' isInline={true}>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertIsPrimaryCharacter} onSave={saveIsPrimaryCharacter}>
				<div>
					<ToggleInput value={unit?.isPrimaryCharacter} onToggle={toggleIsPrimaryCharacter} enableEdit={false} />
				</div>
				<div>
					<ToggleInput value={unit?.isPrimaryCharacter} onToggle={toggleIsPrimaryCharacter} enableEdit={true} />
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
