// Packages

// Components
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ToggleInput } from "../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { SuggestionsMessage } from "../../../../components/SuggestionsMessage/SuggestionsMessage";
import { URLPreviewMessage } from "../../../../components/URLPreviewMessage/URLPreviewMessage";
import { SubmitBtn } from "../../../../components/SubmitBtn/SubmitBtn";

// Logic
import { UserCreateStoryLogic } from "./UserCreateStoryLogic";

// Context

// Services

// Styles
import "./UserCreateStory.css";

// Assets

export const UserCreateStory = () => {
	const {
		isDisplayingCreateStoryForm,
		closeCreateStoryForm,
		storyTitle,
		changeStoryTitle,
		storyUID,
		changeStoryUID,
		storyUIDSuggestions,
		storyIsPrivate,
		toggleStoryIsPrivate,
		errors,
		submitCreateStory,
	} = UserCreateStoryLogic();

	return (
		<PopUpContainer
			className='user-stories-create-story-container'
			title='Create Story'
			isDisplaying={isDisplayingCreateStoryForm}
			onClosePopUp={closeCreateStoryForm}
		>
			<div className='user-stories-create-story-form'>
				<div className='user-stories-create-story-form-input-container'>
					<TextInput label='Title' value={storyTitle} onChange={changeStoryTitle} isDark={true} />
					<ErrorMessage errors={errors} attribute='title' />
				</div>
				<div className='user-stories-create-story-form-input-container'>
					<TextInput label='Unique Identifier (UID)' value={storyUID} onChange={changeStoryUID} isDark={true} />
					<SuggestionsMessage suggestions={storyUIDSuggestions} labelContext={"for UID"} />
					{storyUID.length === 0 ? null : (
						<URLPreviewMessage path={"s/" + storyUID} label='With this UID, your story will be accessable on the following URL:' />
					)}
					<ErrorMessage errors={errors} attribute='uid' />
				</div>
				<div className='user-stories-create-story-form-input-container'>
					<ToggleInput label='Private Story' value={storyIsPrivate} onToggle={toggleStoryIsPrivate} enableEdit={true} />
					<ErrorMessage errors={errors} attribute='isPrivate' />
				</div>
				<ErrorMessage errors={errors} />
				<div className='user-stories-create-story-form-submit-container'>
					<SubmitBtn label='Create Story' onSubmit={submitCreateStory} />
				</div>
			</div>
		</PopUpContainer>
	);
};
