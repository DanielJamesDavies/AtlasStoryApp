// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../components/Text/Text";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { CharacterOverviewDescriptionLogic } from "./CharacterOverviewDescriptionLogic";

// Context

// Services

// Styles
import "./CharacterOverviewDescription.css";

// Assets

export const CharacterOverviewDescription = () => {
	const { isAuthorizedToEdit, character, changeDescription, revertDescription, saveDescription } = CharacterOverviewDescriptionLogic();

	return (
		<EditableContainer
			className='character-overview-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
		>
			{character?.data?.description === undefined || character?.data?.description.join("").split(" ").join("").length === 0 ? (
				<div />
			) : (
				<Text className='character-overview-description' value={character?.data?.description} />
			)}
			<MultiLineTextInput
				className='character-overview-description'
				label='Description'
				seamless={true}
				value={character?.data?.description.join("\n")}
				onChange={changeDescription}
			/>
		</EditableContainer>
	);
};
