// Packages

// Components
import { EditableContainer } from "../../../../../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../../../../../components/TextInput/TextInput";

// Logic
import { LocationInclinationLogic } from "./InclinationLogic";

// Context

// Services

// Styles
import "./Inclination.css";

// Assets

export const LocationInclination = () => {
	const { isAuthorizedToEdit, location, changeInclination, revertInclination, saveInclination } = LocationInclinationLogic();

	if (["reality"].includes(location?.type)) return null;
	return (
		<EditableContainer
			className='locations-location-inclination-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertInclination}
			onSave={saveInclination}
		>
			<div className='locations-location-inclination'>
				<div className='locations-location-inclination-title'>Inclination</div>
				<div className='locations-location-inclination-value'>{location?.inclination}°</div>
			</div>
			<div className='locations-location-inclination'>
				<div className='locations-location-inclination-title'>Inclination</div>
				<div className='locations-location-inclination-value'>
					<TextInput value={location?.inclination + "°"} onChange={changeInclination} />
				</div>
			</div>
		</EditableContainer>
	);
};
