// Packages

// Components
import { EditableContainer } from "../../../../../../../../components/EditableContainer/EditableContainer";
import { CoordinatesInput } from "../../../../../../../../components/CoordinatesInput/CoordinatesInput";

// Logic
import { LocationPositionLogic } from "./PositionLogic";

// Context

// Services

// Styles
import "./Position.css";

// Assets

export const LocationPosition = () => {
	const { isAuthorizedToEdit, location, changePosition, revertPosition, savePosition } = LocationPositionLogic();

	if (["reality", "star", "planet", "moon"].includes(location?.type)) return null;
	return (
		<EditableContainer
			className='locations-location-position-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPosition}
			onSave={savePosition}
		>
			<div className='locations-location-position'>
				<div className='locations-location-position-title'>Position</div>
				<CoordinatesInput value={location?.position} />
			</div>
			<div className='locations-location-position'>
				<div className='locations-location-position-title'>Position</div>
				<CoordinatesInput value={location?.position} onChange={changePosition} />
			</div>
		</EditableContainer>
	);
};
