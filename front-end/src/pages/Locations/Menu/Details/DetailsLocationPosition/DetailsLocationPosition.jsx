// Packages

// Components
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { CoordinatesInput } from "../../../../../components/CoordinatesInput/CoordinatesInput";

// Logic
import { DetailsLocationPositionLogic } from "./DetailsLocationPositionLogic";

// Context

// Services

// Styles
import "./DetailsLocationPosition.css";

// Assets

export const DetailsLocationPosition = () => {
	const { isAuthorizedToEdit, locations, selectedLocationId, changePosition, revertPosition, savePosition } = DetailsLocationPositionLogic();

	return (
		<EditableContainer
			className='locations-details-position-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPosition}
			onSave={savePosition}
		>
			<div className='locations-details-position'>
				<div className='locations-details-position-title'>Position</div>
				<CoordinatesInput value={locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.position} />
			</div>
			<div className='locations-details-position'>
				<div className='locations-details-position-title'>Position</div>
				<CoordinatesInput
					value={locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.position}
					onChange={changePosition}
				/>
			</div>
		</EditableContainer>
	);
};
