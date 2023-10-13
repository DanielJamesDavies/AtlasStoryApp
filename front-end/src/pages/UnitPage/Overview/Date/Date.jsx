// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";

// Logic
import { DateLogic } from "./DateLogic";

// Context

// Services

// Styles
import "./Date.css";

// Assets

export const Date = () => {
	const {
		isAuthorizedToEdit,
		unit_type,
		unit,
		changeDate,
		revertDate,
		saveDate,
		dateTimeHoursRef,
		dateDayRef,
		dateMonthRef,
		dateYearRef,
		dateTimeMinutesRef,
		onKeyDownTimeInput,
		onKeyDownDateInput,
	} = DateLogic();

	if (!["event"].includes(unit_type)) return null;
	return (
		<EditableContainer
			className='unit-page-overview-date-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertDate}
			onSave={saveDate}
		>
			<div className='unit-page-overview-date'>
				<div className='unit-page-overview-date-title'>Date of Event</div>
				<div className='unit-page-overview-date-text'>
					{unit?.data?.date?.time} {unit?.data?.date?.day}/{unit?.data?.date?.month}/{unit?.data?.date?.year}
				</div>
			</div>
			<div className='unit-page-overview-date'>
				<div className='unit-page-overview-date-title'>Date of Event</div>
				<div className='unit-page-overview-date-input-container'>
					<div className='unit-page-overview-date-input-label'>Time: </div>
					<div className='unit-page-overview-date-input-time-wrapper'>
						<input
							ref={dateTimeHoursRef}
							value={unit?.data?.date?.time?.split(":")[0]}
							onChange={(e) => changeDate(e, "time", 0)}
							onKeyDown={(e) => onKeyDownTimeInput(e, 0)}
							placeholder='HH'
						/>
						<div>:</div>
						<input
							ref={dateTimeMinutesRef}
							value={unit?.data?.date?.time?.split(":")[1]}
							onChange={(e) => changeDate(e, "time", 1)}
							onKeyDown={(e) => onKeyDownTimeInput(e, 1)}
							placeholder='MM'
						/>
					</div>
				</div>
				<div className='unit-page-overview-date-input-container'>
					<div className='unit-page-overview-date-input-label'>Day: </div>
					<input
						ref={dateDayRef}
						placeholder='Day'
						value={unit?.data?.date?.day}
						onChange={(e) => changeDate(e, "day")}
						onKeyDown={(e) => onKeyDownDateInput(e, "day")}
					/>
				</div>
				<div className='unit-page-overview-date-input-container'>
					<div className='unit-page-overview-date-input-label'>Month: </div>
					<input
						ref={dateMonthRef}
						placeholder='Month'
						value={unit?.data?.date?.month}
						onChange={(e) => changeDate(e, "month")}
						onKeyDown={(e) => onKeyDownDateInput(e, "month")}
					/>
				</div>
				<div className='unit-page-overview-date-input-container'>
					<div className='unit-page-overview-date-input-label'>Year: </div>
					<input
						ref={dateYearRef}
						placeholder='Year'
						value={unit?.data?.date?.year}
						onChange={(e) => changeDate(e, "year")}
						onKeyDown={(e) => onKeyDownDateInput(e, "year")}
					/>
				</div>
			</div>
		</EditableContainer>
	);
};
