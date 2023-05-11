// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../../components/TextInput/TextInput";

// Logic
import { LocationNameLogic } from "./NameLogic";

// Context

// Services

// Styles
import "./Name.css";

// Assets

export const LocationName = () => {
	const { isAuthorizedToEdit, locations, selectedLocationId, changeName, revertName, saveName } = LocationNameLogic();

	return (
		<EditableContainer
			className='locations-location-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertName}
			onSave={saveName}
			absolutePositionEditBtns={true}
		>
			<div className='locations-location-name'>
				{locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.data?.name}
			</div>
			<TextInput
				className='locations-location-name'
				label='Location Name'
				seamless={true}
				value={locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.data?.name}
				onChange={changeName}
			/>
		</EditableContainer>
	);
};
