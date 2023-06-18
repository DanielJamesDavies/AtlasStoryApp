// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { GroupOverviewDescriptionLogic } from "./DescriptionLogic";

// Context

// Services

// Styles
import "./Description.css";

// Assets

export const GroupOverviewDescription = () => {
	const { isAuthorizedToEdit, groupVersion, changeDescription, revertDescription, saveDescription } = GroupOverviewDescriptionLogic();

	return (
		<EditableContainer
			className='group-overview-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
		>
			{!isAuthorizedToEdit &&
			(groupVersion?.description === undefined || groupVersion?.description.join("").split(" ").join("").length === 0) ? (
				<div />
			) : (
				<div className='group-overview-description'>
					<div className='group-overview-description-label'>Description</div>
					<Text value={groupVersion?.description} isLightText={true} />
				</div>
			)}
			<div className='group-overview-description'>
				<div className='group-overview-description-label'>Description</div>
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
