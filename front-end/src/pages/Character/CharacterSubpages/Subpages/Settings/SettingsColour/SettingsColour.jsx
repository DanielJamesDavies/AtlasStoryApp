// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { ColourPicker } from "../../../../../../components/ColourPicker/ColourPicker";

// Logic
import { SettingsColourLogic } from "./SettingsColourLogic";

// Context

// Services

// Styles
import "./SettingsColour.css";

// Assets

export const SettingsColour = () => {
	const { isAuthorizedToEdit, character, changeColour, revertColour, saveColour, errors } = SettingsColourLogic();

	return (
		<div className='character-subpage-settings-colour'>
			<div className='character-subpage-settings-colour-label'>Colour</div>
			<EditableContainer
				className='character-subpage-settings-colour-value-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertColour}
				onSave={saveColour}
			>
				<div className='character-subpage-settings-colour-value'>
					<ColourPicker value={character?.data?.colour} onChange={changeColour} enableEdit={false} horizontalAlignment='right' />
					<ErrorMessage errors={errors} />
				</div>
				<div className='character-subpage-settings-colour-value'>
					<ColourPicker
						value={character?.data?.colour}
						onChange={changeColour}
						enableEdit={true}
						pickerVerticalPlacement='bottom'
						horizontalAlignment='right'
					/>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</div>
	);
};
