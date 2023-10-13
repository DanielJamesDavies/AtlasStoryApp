// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { EventsPrimaryLogic } from "./EventsPrimaryLogic";

// Context

// Services

// Styles
import "./EventsPrimary.css";

// Assets

export const EventsPrimary = () => {
	const { isAuthorizedToEdit, romanNumeralHours, openCreateEventForm } = EventsPrimaryLogic();

	return (
		<div className='events-primary'>
			<div className='events-primary-roman-numerals-container'>
				<div className='events-primary-roman-numerals'>
					{romanNumeralHours
						?.concat(romanNumeralHours)
						?.concat(romanNumeralHours)
						?.concat([""])
						?.map((hour, index) => (
							<div key={index}>{hour}</div>
						))}
				</div>
			</div>
			<div
				className={
					isAuthorizedToEdit
						? "events-primary-buttons-container events-primary-buttons-container-authorized-to-edit"
						: "events-primary-buttons-container"
				}
			>
				{!isAuthorizedToEdit ? null : (
					<div className='events-primary-modify-btns-container'>
						<IconBtn
							className='events-primary-modify-btn'
							seamless={true}
							icon={<FaPlus />}
							iconName='plus'
							onClick={openCreateEventForm}
							label='Create Event'
						/>
					</div>
				)}
			</div>
		</div>
	);
};
