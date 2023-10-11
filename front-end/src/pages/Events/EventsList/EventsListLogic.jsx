// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { EventsContext } from "../EventsContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const EventsListLogic = () => {
	const { story, setStory, events, eventsImages, isReorderingEvents, setIsDisplayingCreateEventForm } = useContext(EventsContext);
	const { authorized_user_id, APIRequest } = useContext(APIContext);

	async function changeEventsOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newStory = JSON.parse(JSON.stringify(story));
		const tempItem = newStory.data.events.splice(res.from, 1)[0];
		newStory.data.events.splice(res.to, 0, tempItem);
		setStory(newStory);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "events"],
			newValue: newStory.data.events,
		});
	}

	return { authorized_user_id, story, events, eventsImages, isReorderingEvents, changeEventsOrder, setIsDisplayingCreateEventForm };
};
