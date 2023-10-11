// Packages

// Components
import { EventsTitle } from "./EventsTitle/EventsTitle";
import { EventsList } from "./EventsList/EventsList";

// Logic

// Context

// Services

// Styles
import "./Events.css";

// Assets

export const Events = () => {
	return (
		<div className='events'>
			<EventsTitle />
			<EventsList />
		</div>
	);
};
