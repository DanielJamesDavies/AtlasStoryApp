// Packages

// Components

// Logic
import { EventsListItemLogic } from "./EventsListItemLogic";

// Context

// Services

// Styles
import "./EventsListItem.css";

// Assets

export const EventsListItem = ({ event }) => {
	const { eventsImages, onClick } = EventsListItemLogic({ event });

	return (
		<div
			className='events-list-item'
			style={event?.data?.colour ? { "--eventColour": event?.data?.colour } : { "--eventColour": "#0044ff" }}
			onClick={onClick}
			onAuxClick={onClick}
		>
			<div className='events-list-item-image-container'>
				<div className='events-list-item-image'>
					{eventsImages === false ? null : !eventsImages.find((e) => JSON.stringify(e._id) === JSON.stringify(event?.data?.listImage))
							?.image ? null : (
						<img src={eventsImages.find((e) => JSON.stringify(e._id) === JSON.stringify(event?.data?.listImage))?.image} alt='' />
					)}
				</div>
			</div>
			<div className='events-list-item-name'>{event?.data?.name}</div>
		</div>
	);
};
