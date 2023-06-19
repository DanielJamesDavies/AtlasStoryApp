// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { CharacterProfileDescriptionLogic } from "./DescriptionLogic";

// Context

// Services

// Styles
import "./Description.css";

// Assets

export const CharacterProfileDescription = () => {
	const { isAuthorizedToEdit, characterVersion, changeDescription, revertDescription, saveDescription } = CharacterProfileDescriptionLogic();

	return (
		<EditableContainer
			className='character-profile-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
		>
			{!isAuthorizedToEdit &&
			(characterVersion?.description === undefined || characterVersion?.description.join("").split(" ").join("").length === 0) ? (
				<div />
			) : (
				<div className='character-profile-description'>
					<div className='character-profile-description-label'>Description</div>
					<Text value={characterVersion?.description} isLightText={true} />
				</div>
			)}
			<div className='character-profile-description'>
				<div className='character-profile-description-label'>Description</div>
				<MultiLineTextInput
					label='Description'
					seamless={true}
					value={characterVersion?.description?.join("\n")}
					onChange={changeDescription}
					isLightText={true}
					aiTools={true}
				/>
			</div>
		</EditableContainer>
	);
};
