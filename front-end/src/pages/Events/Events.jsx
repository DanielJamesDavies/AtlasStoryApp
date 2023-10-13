// Packages

// Components
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";
import { FirstAddButton } from "../../components/FirstAddButton/FirstAddButton";
import { EventsTitle } from "./EventsTitle/EventsTitle";
import { EventsPrimary } from "./EventsPrimary/EventsPrimary";
import { EventsCreateEvent } from "./EventsCreateEvent/EventsCreateEvent";
import { Timeline } from "./Timeline/Timeline";

// Logic
import { EventsLogic } from "./EventsLogic";

// Context

// Services

// Styles
import "./Events.css";

// Assets

export const Events = () => {
	const { authorized_user_id, story, events, eventsImages, setIsDisplayingCreateEventForm } = EventsLogic();

	return (
		<div className='events'>
			<EventsTitle />
			<div className='events-content'>
				<div className={"events-loading-container" + (!events || eventsImages === false ? "" : " events-loading-container-hidden")}>
					<LoadingCircle center={true} />
				</div>
				{!events || eventsImages === false ? null : (
					<>
						<EventsPrimary />
						<EventsCreateEvent />
						{story?.data?.events?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1 ? (
							<div className='events-add-first-container'>
								<FirstAddButton label='Create Event' onClick={() => setIsDisplayingCreateEventForm(true)} />
							</div>
						) : (
							<Timeline />
						)}
					</>
				)}
			</div>
		</div>
	);
};
