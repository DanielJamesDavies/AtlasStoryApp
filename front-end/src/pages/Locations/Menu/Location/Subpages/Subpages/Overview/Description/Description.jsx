// Packages

// Components
import { EditableContainer } from "../../../../../../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { LocationDescriptionLogic } from "./DescriptionLogic";

// Context

// Services

// Styles
import "./Description.css";

// Assets

export const LocationDescription = () => {
	const { isAuthorizedToEdit, location, changeDescription, revertDescription, saveDescription } = LocationDescriptionLogic();

	return (
		<EditableContainer
			className='locations-location-description-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDescription}
			onSave={saveDescription}
		>
			{location?.data?.description === undefined || location?.data?.description.join("").split(" ").join("").length === 0 ? (
				<div />
			) : (
				<div className='locations-location-description'>
					<div className='locations-location-description-label'>Description</div>
					<Text value={location?.data?.description} isLightText={true} />
				</div>
			)}
			<div className='locations-location-description'>
				<div className='locations-location-description-label'>Description</div>
				<MultiLineTextInput
					label='Description'
					seamless={true}
					value={location?.data?.description?.join("\n")}
					onChange={changeDescription}
					isLightText={true}
					aiTools={true}
				/>
			</div>
		</EditableContainer>
	);
};
