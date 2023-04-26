// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../components/Text/Text";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { SubstoryOverviewDescriptionLogic } from "./SubstoryOverviewDescriptionLogic";

// Context

// Services

// Styles
import "./SubstoryOverviewDescription.css";

// Assets

export const SubstoryOverviewDescription = () => {
	const { isAuthorizedToEdit, substory, changeDescription, revertDescription, saveDescription } = SubstoryOverviewDescriptionLogic();

	return (
		<EditableContainer
			className='substory-overview-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
		>
			{substory?.data?.description === undefined || substory?.data?.description.join("").split(" ").join("").length === 0 ? (
				<div />
			) : (
				<div className='substory-overview-description'>
					<div className='substory-overview-description-label'>Description</div>
					<Text value={substory?.data?.description} isLightText={true} />
				</div>
			)}
			<div className='substory-overview-description'>
				<div className='substory-overview-description-label'>Description</div>
				<MultiLineTextInput
					label='Description'
					seamless={true}
					value={substory?.data?.description?.join("\n")}
					onChange={changeDescription}
					isLightText={true}
					aiTools={true}
				/>
			</div>
		</EditableContainer>
	);
};
