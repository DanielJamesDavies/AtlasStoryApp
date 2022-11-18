// Packages

// Components
import { ToggleInput } from "../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { StorySettingsPrivateLogic } from "./StorySettingsPrivateLogic";

// Context

// Services

// Styles
import "./StorySettingsPrivate.css";

// Assets

export const StorySettingsPrivate = () => {
	const { errors, story, toggleIsStoryPrivate } = StorySettingsPrivateLogic();

	return (
		<>
			<ToggleInput
				className='story-settings-private-story-input'
				label='Private Story'
				value={story?.data?.isPrivate}
				onToggle={toggleIsStoryPrivate}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} />
		</>
	);
};
