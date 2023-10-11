// Packages
import { FaPlus, FaSort, FaBookOpen } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { EventsListPrimaryLogic } from "./EventsListPrimaryLogic";

// Context

// Services

// Styles
import "./EventsListPrimary.css";

// Assets

export const EventsListPrimary = () => {
	const { isAuthorizedToEdit, openCreateEventForm, toggleIsReorderingEvents } = EventsListPrimaryLogic();

	return (
		<div className='events-list-primary'>
			<div
				className={
					isAuthorizedToEdit
						? "events-list-primary-buttons-container events-list-primary-buttons-container-authorized-to-edit"
						: "events-list-primary-buttons-container"
				}
			>
				{!isAuthorizedToEdit ? null : (
					<div className='events-list-primary-modify-btns-container'>
						<IconBtn
							className='events-list-primary-modify-btn'
							seamless={true}
							icon={<FaBookOpen />}
							iconName='book-open'
							iconSmall={<FaPlus />}
							onClick={openCreateEventForm}
							label='Create Event'
						/>
						<IconBtn
							className='events-list-primary-modify-btn'
							seamless={true}
							icon={<FaSort />}
							iconName='sort'
							onClick={toggleIsReorderingEvents}
							label='Reorder Events'
						/>
					</div>
				)}
			</div>
		</div>
	);
};
