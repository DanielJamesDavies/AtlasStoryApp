// Packages
import { FaChevronRight } from "react-icons/fa";

// Components
import { TextInput } from "../../../components/TextInput/TextInput";
import { ToggleInput } from "../../../components/ToggleInput/ToggleInput";

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
		storyURL,
		changeStoryURL,
		storyIsPrivate,
		toggleStoryIsPrivate,
	} = UserCreateStoryLogic();

	if (!isDisplayingCreateStoryForm) return null;
	return (
		<div className='user-stories-create-story-container'>
			<div className='user-stories-create-story-form'>
				<div className='user-stories-create-story-form-title'>Create Story</div>
				<div className='user-stories-create-story-form-input-container'>
					<TextInput label='Title' value={storyTitle} onChange={changeStoryTitle} isDark={true} />
				</div>
				<div className='user-stories-create-story-form-input-container'>
					<TextInput label='URL' value={storyURL} onChange={changeStoryURL} isDark={true} />
				</div>
				<div className='user-stories-create-story-form-input-container'>
					<ToggleInput label='Private Story' value={storyIsPrivate} onToggle={toggleStoryIsPrivate} />
				</div>
				<div className='user-stories-create-story-form-submit-container'>
					<button className='user-stories-create-story-form-submit-btn'>
						<div className='user-stories-create-story-form-submit-btn-text'>Create Story</div>
						<FaChevronRight className='user-stories-create-story-form-submit-btn-icon' />
					</button>
				</div>
			</div>
			<div className='user-stories-create-story-background' onClick={closeCreateStoryForm} />
		</div>
	);
};
