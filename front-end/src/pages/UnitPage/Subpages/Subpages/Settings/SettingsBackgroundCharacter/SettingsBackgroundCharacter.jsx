// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { ToggleInput } from "../../../../../../components/ToggleInput/ToggleInput";

// Logic
import { SettingsBackgroundCharacterLogic } from "./SettingsBackgroundCharacterLogic";

// Context

// Services

// Styles

// Assets

export const SettingsBackgroundCharacter = () => {
	const { unit_type, isAuthorizedToEdit, unit, toggleIsBackgroundCharacter, revertIsBackgroundCharacter, saveIsBackgroundCharacter, errors } =
		SettingsBackgroundCharacterLogic();

	if (!["character"].includes(unit_type)) return null;
	return (
		<LabelContainer className='unit-page-subpage-settings-item' label='Background Character' isInline={true}>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertIsBackgroundCharacter} onSave={saveIsBackgroundCharacter}>
				<div>
					<ToggleInput value={unit?.isBackgroundCharacter} onToggle={toggleIsBackgroundCharacter} enableEdit={false} />
				</div>
				<div>
					<ToggleInput value={unit?.isBackgroundCharacter} onToggle={toggleIsBackgroundCharacter} enableEdit={true} />
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
