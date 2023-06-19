// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { GroupProfileDescriptionLogic } from "./DescriptionLogic";

// Context

// Services

// Styles
import "./Description.css";

// Assets

export const GroupProfileDescription = () => {
	const { isAuthorizedToEdit, groupVersion, changeDescription, revertDescription, saveDescription } = GroupProfileDescriptionLogic();

	return (
		<EditableContainer
			className='group-profile-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
		>
			{!isAuthorizedToEdit &&
			(groupVersion?.description === undefined || groupVersion?.description.join("").split(" ").join("").length === 0) ? (
				<div />
			) : (
				<div className='group-profile-description'>
					<div className='group-profile-description-label'>Description</div>
					<Text value={groupVersion?.description} isLightText={true} />
				</div>
			)}
			<div className='group-profile-description'>
				<div className='group-profile-description-label'>Description</div>
				<MultiLineTextInput
					label='Description'
					seamless={true}
					value={groupVersion?.description?.join("\n")}
					onChange={changeDescription}
					isLightText={true}
					aiTools={true}
				/>
			</div>
		</EditableContainer>
	);
};
