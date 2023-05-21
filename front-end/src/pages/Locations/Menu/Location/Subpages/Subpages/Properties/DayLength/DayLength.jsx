// Packages

// Components
import { EditableContainer } from "../../../../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";

// Logic
import { LocationDayLengthLogic } from "./DayLengthLogic";

// Context

// Services

// Styles
import "./DayLength.css";

// Assets

export const LocationDayLength = () => {
	const { isAuthorizedToEdit, location, changeDayLength, revertDayLength, saveDayLength } = LocationDayLengthLogic();

	if (!["planet", "moon"].includes(location?.type)) return null;
	return (
		<EditableContainer
			className='locations-location-day-length-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDayLength}
			onSave={saveDayLength}
		>
			<div className='locations-location-day-length'>
				<div className='locations-location-day-length-title'>Day Length</div>
				<div className='locations-location-day-length-value'>{location?.dayLength} Earth Day</div>
			</div>
			<div className='locations-location-day-length'>
				<div className='locations-location-day-length-title'>Day Length</div>
				<div className='locations-location-day-length-value'>
					<TextInput value={location?.dayLength} onChange={changeDayLength} />
				</div>
			</div>
		</EditableContainer>
	);
};
