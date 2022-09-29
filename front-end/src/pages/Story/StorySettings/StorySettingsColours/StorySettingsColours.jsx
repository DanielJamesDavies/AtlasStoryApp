// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../components/LabelContainer/LabelContainer";
import { ColourPicker } from "../../../../components/ColourPicker/ColourPicker";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { StorySettingsColoursLogic } from "./StorySettingsColoursLogic";

// Context

// Services

// Styles

// Assets

export const StorySettingsColours = () => {
	const {
		isAuthorizedToEdit,
		story,
		changeAccentColour,
		revertAccentColour,
		saveAccentColour,
		changeAccentHoverColour,
		revertAccentHoverColour,
		saveAccentHoverColour,
		errors,
	} = StorySettingsColoursLogic();

	return (
		<div>
			<EditableContainer
				className='story-settings-input-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertAccentColour}
				onSave={saveAccentColour}
			>
				<LabelContainer label='Accent Colour' isInline={true}>
					<ColourPicker
						value={story?.data?.colours?.accent}
						onChange={changeAccentColour}
						enableEdit={false}
						horizontalAlignment='right'
					/>
				</LabelContainer>
				<LabelContainer label='Accent Colour' isInline={true}>
					<ColourPicker
						value={story?.data?.colours?.accent}
						onChange={changeAccentColour}
						enableEdit={true}
						pickerVerticalPlacement='bottom'
						horizontalAlignment='right'
					/>
					<ErrorMessage errors={errors} />
				</LabelContainer>
			</EditableContainer>

			<EditableContainer
				className='story-settings-input-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertAccentHoverColour}
				onSave={saveAccentHoverColour}
			>
				<LabelContainer label='Accent Colour on Hover' isInline={true}>
					<ColourPicker
						value={story?.data?.colours?.accentHover}
						onChange={changeAccentHoverColour}
						enableEdit={false}
						horizontalAlignment='right'
					/>
				</LabelContainer>
				<LabelContainer label='Accent Colour on Hover' isInline={true}>
					<ColourPicker
						value={story?.data?.colours?.accentHover}
						onChange={changeAccentHoverColour}
						enableEdit={true}
						pickerVerticalPlacement='bottom'
						horizontalAlignment='right'
					/>
					<ErrorMessage errors={errors} />
				</LabelContainer>
			</EditableContainer>
		</div>
	);
};
