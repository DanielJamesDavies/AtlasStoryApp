// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { SubstoryProfileDescriptionLogic } from "./DescriptionLogic";

// Context

// Services

// Styles
import "./Description.css";

// Assets

export const SubstoryProfileDescription = () => {
	const { isAuthorizedToEdit, substoryVersion, changeDescription, revertDescription, saveDescription } = SubstoryProfileDescriptionLogic();

	return (
		<EditableContainer
			className='substory-profile-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
		>
			{!isAuthorizedToEdit &&
			(substoryVersion?.description === undefined || substoryVersion?.description.join("").split(" ").join("").length === 0) ? (
				<div />
			) : (
				<div className='substory-profile-description'>
					<div className='substory-profile-description-label'>Description</div>
					<Text value={substoryVersion?.description} isLightText={true} />
				</div>
			)}
			<div className='substory-profile-description'>
				<div className='substory-profile-description-label'>Description</div>
				<MultiLineTextInput
					label='Description'
					seamless={true}
					value={substoryVersion?.description?.join("\n")}
					onChange={changeDescription}
					isLightText={true}
					aiTools={true}
				/>
			</div>
		</EditableContainer>
	);
};
