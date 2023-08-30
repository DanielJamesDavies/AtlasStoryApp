// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { ColourPicker } from "../../../../../../components/ColourPicker/ColourPicker";

// Logic
import { SettingsColourLogic } from "./SettingsColourLogic";

// Context

// Services

// Styles

// Assets

export const SettingsColour = () => {
	const { isAuthorizedToEdit, location, changeColour, revertColour, saveColour, errors } = SettingsColourLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Colour' isInline={true}>
				<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertColour} onSave={saveColour}>
					<div>
						<ColourPicker value={location?.data?.colour} onChange={changeColour} enableEdit={false} horizontalAlignment='right' />
					</div>
					<div>
						<ColourPicker
							value={location?.data?.colour}
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
