// Packages

// Components
import { EditableContainer } from "../../../../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";

// Logic
import { LocationTiltLogic } from "./TiltLogic";

// Context

// Services

// Styles
import "./Tilt.css";

// Assets

export const LocationTilt = () => {
	const { isAuthorizedToEdit, location, changeTilt, revertTilt, saveTilt } = LocationTiltLogic();

	if (["reality", "starSystem"].includes(location?.type)) return null;
	return (
		<EditableContainer
			className='locations-location-tilt-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertTilt}
			onSave={saveTilt}
		>
			<div className='locations-location-tilt'>
				<div className='locations-location-tilt-title'>Tilt</div>
				<div className='locations-location-tilt-value'>{location?.tilt}°</div>
			</div>
			<div className='locations-location-tilt'>
				<div className='locations-location-tilt-title'>Tilt</div>
				<div className='locations-location-tilt-value'>
					<TextInput value={location?.tilt + "°"} onChange={changeTilt} />
				</div>
			</div>
		</EditableContainer>
	);
};
