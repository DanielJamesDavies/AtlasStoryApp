// Packages

// Components
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { CoordinatesInput } from "../../../../../components/CoordinatesInput/CoordinatesInput";

// Logic
import { DetailsLocationRotationLogic } from "./DetailsLocationRotationLogic";

// Context

// Services

// Styles
import "./DetailsLocationRotation.css";

// Assets

export const DetailsLocationRotation = () => {
	const { isAuthorizedToEdit, locations, selectedLocationId, changeRotation, revertRotation, saveRotation } = DetailsLocationRotationLogic();

	if (["reality"].includes(locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.type)) return null;
	return (
		<EditableContainer
			className='locations-details-rotation-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertRotation}
			onSave={saveRotation}
		>
			<div className='locations-details-rotation'>
				<div className='locations-details-rotation-title'>Rotation</div>
				<CoordinatesInput value={locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.rotation} />
			</div>
			<div className='locations-details-rotation'>
				<div className='locations-details-rotation-title'>Rotation</div>
				<CoordinatesInput
					value={locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.rotation}
					onChange={changeRotation}
				/>
			</div>
		</EditableContainer>
	);
};
