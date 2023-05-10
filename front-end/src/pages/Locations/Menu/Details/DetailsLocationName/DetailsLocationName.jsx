// Packages

// Components
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../components/TextInput/TextInput";

// Logic
import { DetailsLocationNameLogic } from "./DetailsLocationNameLogic";

// Context

// Services

// Styles
import "./DetailsLocationName.css";

// Assets

export const DetailsLocationName = () => {
	const { isAuthorizedToEdit, locations, selectedLocationId, changeName, revertName, saveName } = DetailsLocationNameLogic();

	return (
		<EditableContainer
			className='locations-details-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertName}
			onSave={saveName}
			absolutePositionEditBtns={true}
		>
			<div className='locations-details-name'>
				{locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.data?.name}
			</div>
			<TextInput
				className='locations-details-name'
				label='Location Name'
				seamless={true}
				value={locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.data?.name}
				onChange={changeName}
			/>
		</EditableContainer>
	);
};
