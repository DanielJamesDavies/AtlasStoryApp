// Packages

// Components
import { TextInput } from "../../../components/TextInput/TextInput";
import { ToggleInput } from "../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { SubmitBtn } from "../../../components/SubmitBtn/SubmitBtn";

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
		storyIsPrivate,
		toggleStoryIsPrivate,
		errors,
		submitCreateStory,
	} = UserCreateStoryLogic();

	if (!isDisplayingCreateStoryForm) return null;
	return (
		<div className='user-stories-create-story-container'>
			<div className='user-stories-create-story-form'>
				<div className='user-stories-create-story-form-title'>Create Story</div>
				<div className='user-stories-create-story-form-input-container'>
					<TextInput label='Title' value={storyTitle} onChange={changeStoryTitle} isDark={true} />
					<ErrorMessage errors={errors} attribute='title' />
				</div>
				<div className='user-stories-create-story-form-input-container'>
					<TextInput label='Unique Identifier' value={storyUID} onChange={changeStoryUID} isDark={true} />
					<ErrorMessage errors={errors} attribute='uid' />
				</div>
				<div className='user-stories-create-story-form-input-container'>
					<ToggleInput label='Private Story' value={storyIsPrivate} onToggle={toggleStoryIsPrivate} />
					<ErrorMessage errors={errors} attribute='isPrivate' />
				</div>
				<ErrorMessage errors={errors} />
				<div className='user-stories-create-story-form-submit-container'>
					<SubmitBtn label='Create Story' onSubmit={submitCreateStory} />
				</div>
			</div>
			<div className='user-stories-create-story-background' onClick={closeCreateStoryForm} />
		</div>
	);
};
