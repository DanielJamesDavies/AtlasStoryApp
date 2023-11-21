import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";
import { APIContext } from "../../context/APIContext";

export const EventsContext = createContext();

const EventsProvider = ({ children, story_uid }) => {
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, createUnitForm } = useContext(StoryContext);
	const { user_id, APIRequest } = useContext(APIContext);
	const [events, setEvents] = useState(false);
	const [eventsImages, setEventsImages] = useState(false);

	const [createEventsValues, setCreateEventsValues] = useState({});

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "events") updateDocumentTitle();
			}, 500);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "events") updateDocumentTitle();
			}, 750);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "events") updateDocumentTitle();
			}, 1000);

			const newEvents = await getEvents();
			getEventsImages(newEvents?.map((event) => event?.data?.listImage));
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Events | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		async function getEvents() {
			const response = await APIRequest("/event?story_uid=" + story_uid, "GET");
			if (!response || response?.error || !response?.data?.events) return false;
			setEvents(response?.data?.events);
			return response?.data?.events;
		}

		async function getEventsImages(image_ids) {
			if (!image_ids) return setEventsImages([]);

			const newEventImages = await Promise.all(
				image_ids.map(async (image_id) => {
					if (!image_id) return false;

					const event_image_response = await APIRequest("/image/" + image_id, "GET");
					if (event_image_response?.errors || !event_image_response?.data?.image?.image) return false;
					return event_image_response.data.image;
				})
			);

			setEventsImages(newEventImages.filter((e) => e !== false));
		}

		getInitial();
	}, [location, story_uid, curr_story_uid, story, APIRequest]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	const [isDisplayingCreateEventForm, setIsDisplayingCreateEventForm] = useState(false);

	const lastCreateUnitForm = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateUnitForm?.current) !== JSON.stringify(createUnitForm)) {
			lastCreateUnitForm.current = JSON.parse(JSON.stringify(createUnitForm));
			if (createUnitForm?.unit_type === "event") {
				setIsDisplayingCreateEventForm(true);

				setCreateEventsValues({ name: createUnitForm?.name, uid: createUnitForm?.uid });
			}
		}
	}, [createUnitForm, setCreateEventsValues, setIsDisplayingCreateEventForm, lastCreateUnitForm]);

	return (
		<EventsContext.Provider
			value={{
				authorized_user_id: user_id,
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				events,
				eventsImages,
				isDisplayingCreateEventForm,
				setIsDisplayingCreateEventForm,
				createEventsValues,
				setCreateEventsValues,
			}}
		>
			{children}
		</EventsContext.Provider>
	);
};

export default EventsProvider;
