// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { ColourPicker } from "../../../../../../components/ColourPicker/ColourPicker";

// Logic
import { SettingsCardNameColourLogic } from "./SettingsCardNameColourLogic";

// Context

// Services

// Styles

// Assets

export const SettingsCardNameColour = () => {
	const { isAuthorizedToEdit, unit_type, unit, changeColour, revertColour, saveColour, errors } = SettingsCardNameColourLogic();

	if (!["character"].includes(unit_type)) return null;
	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Card Name Colour' isInline={true}>
				<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertColour} onSave={saveColour}>
					<div>
						<ColourPicker value={unit?.data?.cardNameColour} onChange={changeColour} enableEdit={false} horizontalAlignment='right' />
					</div>
					<div>
						<ColourPicker
							value={unit?.data?.cardNameColour}
							onChange={changeColour}
							enableEdit={true}
							pickerVerticalPlacement='bottom'
							horizontalAlignment='right'
						/>
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
