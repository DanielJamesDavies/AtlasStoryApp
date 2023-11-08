// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { DescriptionLogic } from "./DescriptionLogic";

// Context

// Services

// Styles
import "./Description.css";

// Assets

export const Description = () => {
	const { unit_type, isAuthorizedToEdit, unit, unitVersion, changeDescription, revertDescription, saveDescription, unitVersionItemCopying, copyVersionDescription, pasteVersionDescription } = DescriptionLogic();

	return (
		<EditableContainer
			className='unit-page-overview-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
			onCopyVersionValue={copyVersionDescription}
			onPasteVersionValue={JSON.stringify(unitVersionItemCopying?.item) !== JSON.stringify(["description"]) ? undefined : pasteVersionDescription}
		>
			{["character", "group"].includes(unit_type) ? (
				!isAuthorizedToEdit &&
				(unitVersion?.description === undefined || unitVersion?.description.join("").split(" ").join("").length === 0) ? (
					<div />
				) : (
					<div className='unit-page-overview-description'>
						<div className='unit-page-overview-description-label'>Description</div>
						<Text value={unitVersion?.description} isLightText={true} />
					</div>
				)
			) : !isAuthorizedToEdit &&
			  (unit?.data?.description === undefined || unit?.data?.description.join("").split(" ").join("").length === 0) ? (
				<div />
			) : (
				<div className='unit-page-overview-description'>
					<div className='unit-page-overview-description-label'>Description</div>
					<Text value={unit?.data?.description} isLightText={true} />
				</div>
			)}
			{["character", "group"].includes(unit_type) ? (
				<div className='unit-page-overview-description'>
					<div className='unit-page-overview-description-label'>Description</div>
					<MultiLineTextInput
						label='Description'
						seamless={true}
						value={unitVersion?.description?.join("\n")}
						onChange={changeDescription}
						isLightText={true}
						aiTools={true}
					/>
				</div>
			) : (
				<div className='unit-page-overview-description'>
					<div className='unit-page-overview-description-label'>Description</div>
					<MultiLineTextInput
						label='Description'
						seamless={true}
						value={unit?.data?.description?.join("\n")}
						onChange={changeDescription}
						isLightText={true}
						aiTools={true}
					/>
				</div>
			)}
		</EditableContainer>
	);
};
