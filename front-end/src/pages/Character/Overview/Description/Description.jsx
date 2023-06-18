// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { CharacterOverviewDescriptionLogic } from "./DescriptionLogic";

// Context

// Services

// Styles
import "./Description.css";

// Assets

export const CharacterOverviewDescription = () => {
	const { isAuthorizedToEdit, characterVersion, changeDescription, revertDescription, saveDescription } = CharacterOverviewDescriptionLogic();

	return (
		<EditableContainer
			className='character-overview-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
		>
			{!isAuthorizedToEdit &&
			(characterVersion?.description === undefined || characterVersion?.description.join("").split(" ").join("").length === 0) ? (
				<div />
			) : (
				<div className='character-overview-description'>
					<div className='character-overview-description-label'>Description</div>
					<Text value={characterVersion?.description} isLightText={true} />
				</div>
			)}
			<div className='character-overview-description'>
				<div className='character-overview-description-label'>Description</div>
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
