// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { EventsContext } from "../../EventsContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const EventsListCreateEventLogic = () => {
	const { story_uid, story, isDisplayingCreateEventForm, setIsDisplayingCreateEventForm } = useContext(EventsContext);

	function closeCreateEventForm() {
		setIsDisplayingCreateEventForm(false);
	}

	const [eventUIDSuggestions, setEventUIDSuggestions] = useState([]);

	function updateEventUIDSuggestions(newName) {
		let newEventUIDSuggestions = [];

		newEventUIDSuggestions.push(newName.toLowerCase().split(" ").join(""));

		const newNameSplitBySpace = newName.split(" ");
		if (newNameSplitBySpace.length > 1) newEventUIDSuggestions.push(newNameSplitBySpace.join("-").toLowerCase());

		if (newName.toLowerCase() !== newName) newEventUIDSuggestions.push(newName.split(" ").join(""));

		if (newNameSplitBySpace.length > 1 && newName.toLowerCase() !== newName) newEventUIDSuggestions.push(newNameSplitBySpace.join("-"));

		setEventUIDSuggestions(newEventUIDSuggestions);
	}

	const [eventName, setEventName] = useState("");
	function changeEventName(e) {
		setEventName(e.target.value);
		updateEventUIDSuggestions(e.target.value);
	}

	const [eventUID, setEventUID] = useState("");
	function changeEventUID(e) {
		setEventUID(e.target.value.split(" ").join("-"));
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateEvent() {
		const currStory = JSON.parse(JSON.stringify(story));
		if (!currStory?._id) return;

		const response = await APIRequest("/event", "POST", {
			story_id: currStory._id,
			name: JSON.parse(JSON.stringify(eventName)),
			uid: JSON.parse(JSON.stringify(eventUID)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);
		if (currStory?.uid && response?.data?.event_uid) changeLocation("/s/" + currStory.uid + "/e/" + response.data.event_uid);
	}

	return {
		story_uid,
		isDisplayingCreateEventForm,
		closeCreateEventForm,
		eventName,
		changeEventName,
		eventUID,
		changeEventUID,
		eventUIDSuggestions,
		errors,
		submitCreateEvent,
	};
};
