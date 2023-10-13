// Packages

// Components
import { PopUpContainer } from "../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { SuggestionsMessage } from "../../../components/SuggestionsMessage/SuggestionsMessage";
import { URLPreviewMessage } from "../../../components/URLPreviewMessage/URLPreviewMessage";
import { SubmitBtn } from "../../../components/SubmitBtn/SubmitBtn";

// Logic
import { EventsCreateEventLogic } from "./EventsCreateEventLogic";

// Context

// Services

// Styles
import "./EventsCreateEvent.css";

// Assets

export const EventsCreateEvent = () => {
	const {
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
	} = EventsCreateEventLogic();

	return (
		<PopUpContainer
			className='events-create-event-container'
			title='Create Event'
			isDisplaying={isDisplayingCreateEventForm}
			onClosePopUp={closeCreateEventForm}
		>
			<div className='events-create-event-form'>
				<div className='events-create-event-form-input-container'>
					<TextInput label='Name' value={eventName} onChange={changeEventName} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='events-create-event-form-input-container'>
					<TextInput label='Unique Identifier (UID)' value={eventUID} onChange={changeEventUID} isDark={true} />
					<ErrorMessage errors={errors} attribute='uid' />
					<SuggestionsMessage suggestions={eventUIDSuggestions} labelContext={"for UID"} />
					{eventUID.length === 0 ? null : (
						<URLPreviewMessage
							path={"s/" + story_uid + "/c/" + eventUID}
							label='With this UID, your event will be accessable on the following URL:'
						/>
					)}
					<ErrorMessage errors={errors} attribute='uid' />
				</div>
				<ErrorMessage errors={errors} />
				<div className='events-create-event-form-submit-container'>
					<SubmitBtn label='Create Event' onSubmit={submitCreateEvent} />
				</div>
			</div>
		</PopUpContainer>
	);
};
