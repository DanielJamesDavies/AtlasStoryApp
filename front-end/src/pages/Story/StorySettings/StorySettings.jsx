// Packages

// Components
// import { StorySettingsDelete } from "./StorySettingsDelete";

// Logic
import { StorySettingsLogic } from "./StorySettingsLogic";

// Context

// Services

// Styles
import "./StorySettings.css";

// Assets

export const StorySettings = () => {
	const { isDisplayingSettings, closeSettings } = StorySettingsLogic();

	if (!isDisplayingSettings) return null;
	return (
		<div className='story-settings-container'>
			<div className='story-settings'>
				<div className='story-settings-title'>Story Settings</div>
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Unique Identifier</div>
				</div>
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Cover Image</div>
				</div>
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Private Story</div>
				</div>
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Delete Story</div>
					{/* <StorySettingsDelete /> */}
				</div>
			</div>
			<div className='story-settings-background' onClick={closeSettings} />
		</div>
	);
};
