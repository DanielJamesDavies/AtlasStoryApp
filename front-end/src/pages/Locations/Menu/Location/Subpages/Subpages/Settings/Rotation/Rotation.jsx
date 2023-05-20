// Packages

// Components
import { EditableContainer } from "../../../../../../../../components/EditableContainer/EditableContainer";
import { CoordinatesInput } from "../../../../../../../../components/CoordinatesInput/CoordinatesInput";

// Logic
import { LocationRotationLogic } from "./RotationLogic";

// Context

// Services

// Styles
import "./Rotation.css";

// Assets

export const LocationRotation = () => {
	const { isAuthorizedToEdit, location, changeRotation, revertRotation, saveRotation } = LocationRotationLogic();

	if (["reality", "starSystem", "star", "planet", "moon"].includes(location?.type)) return null;
	return (
		<EditableContainer
			className='locations-location-rotation-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertRotation}
			onSave={saveRotation}
		>
			<div className='locations-location-rotation'>
				<div className='locations-location-rotation-title'>Rotation</div>
				<CoordinatesInput value={location?.rotation} />
			</div>
			<div className='locations-location-rotation'>
				<div className='locations-location-rotation-title'>Rotation</div>
				<CoordinatesInput value={location?.rotation} onChange={changeRotation} />
			</div>
		</EditableContainer>
	);
};
