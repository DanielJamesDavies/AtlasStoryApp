// Packages

// Components
import { EditableContainer } from "../../../../../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../../../../../components/TextInput/TextInput";

// Logic
import { LocationPointsLogic } from "./PointsLogic";

// Context

// Services

// Styles
import "./Points.css";

// Assets

export const LocationPoints = () => {
	const { isAuthorizedToEdit, location, changePoints, revertPoints, savePoints } = LocationPointsLogic();

	if (["reality"].includes(location?.type)) return null;
	return (
		<EditableContainer
			className='locations-location-points-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPoints}
			onSave={savePoints}
		>
			<div className='locations-location-points'>
				<div className='locations-location-points-title'>Points</div>
				<div className='locations-location-points-value'>Aphelion: {Math.max(...location?.points).toLocaleString()}km</div>
				<div className='locations-location-points-value'>Perihelion: {Math.min(...location?.points).toLocaleString()}km</div>
			</div>
			<div className='locations-location-points'>
				<div className='locations-location-points-title'>Points</div>
				<div>
					<div className='locations-location-points-value'>
						<div className='locations-location-points-value-label'>Aphelion (km):&nbsp;&nbsp;</div>
						<TextInput value={location?.points[0]} onChange={(e) => changePoints(e, 0)} />
					</div>
					<div className='locations-location-points-value'>
						<div className='locations-location-points-value-label'>Perihelion (km):</div>
						<TextInput value={location?.points[1]} onChange={(e) => changePoints(e, 1)} />
					</div>
				</div>
			</div>
		</EditableContainer>
	);
};
