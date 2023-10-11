// Packages

// Components
import { EventsListItem } from "./EventsListItem/EventsListItem";
import { EventsListPrimary } from "./EventsListPrimary/EventsListPrimary";
import { EventsListCreateEvent } from "./EventsListCreateEvent/EventsListCreateEvent";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";

// Logic
import { EventsListLogic } from "./EventsListLogic";

// Context

// Services

// Styles
import "./EventsList.css";

// Assets

export const EventsList = () => {
	const { authorized_user_id, story, events, eventsImages, isReorderingEvents, changeEventsOrder, setIsDisplayingCreateEventForm } =
		EventsListLogic();

	return (
		<div className='events-list-container'>
			{!events || eventsImages === false ? (
				<div className='events-list-loading-container'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<>
					<EventsListPrimary />
					<EventsListCreateEvent />
					{story?.data?.events?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1 ? (
						<div className='events-list-add-first-container'>
							<FirstAddButton label='Create Event' onClick={() => setIsDisplayingCreateEventForm(true)} />
						</div>
					) : (
						<DragDropContainer
							className='events-list'
							inlineItems={true}
							enableDragDrop={isReorderingEvents}
							onDropItem={changeEventsOrder}
						>
							{story?.data?.events.map((event_id, index) => (
								<DragDropItem key={index} index={index} className='lore-list-item-container'>
									<EventsListItem event={events.find((e) => e._id === event_id)} />
								</DragDropItem>
							))}
						</DragDropContainer>
					)}
				</>
			)}
		</div>
	);
};
