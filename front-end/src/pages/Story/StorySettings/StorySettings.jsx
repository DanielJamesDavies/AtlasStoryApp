// Packages

// Components
import { PopUpContainer } from "../../../components/PopUpContainer/PopUpContainer";
import { StorySettingsUID } from "./StorySettingsUID/StorySettingsUID";
import { StorySettingsMembers } from "./StorySettingsMembers/StorySettingsMembers";
import { StorySettingsColours } from "./StorySettingsColours/StorySettingsColours";
import { StorySettingsDelete } from "./StorySettingsDelete/StorySettingsDelete";

// Logic
import { StorySettingsLogic } from "./StorySettingsLogic";

// Context

// Services

// Styles
import "./StorySettings.css";

// Assets

export const StorySettings = () => {
	const { isDisplayingSettings, closeSettings } = StorySettingsLogic();

	return (
		<PopUpContainer
			className='story-settings-container'
			title='Story Settings'
			isDisplaying={isDisplayingSettings}
			onClosePopUp={closeSettings}
		>
			<div className='story-settings-form'>
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Unique Identifier (UID)</div>
					<StorySettingsUID />
				</div>
				{/* <div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Private Story</div>
				</div> */}
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Members</div>
					<StorySettingsMembers />
				</div>
				{/* <div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Cover</div>
				</div> */}
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Colours</div>
					<StorySettingsColours />
				</div>
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Delete Story</div>
					<StorySettingsDelete />
				</div>
			</div>
		</PopUpContainer>
	);
};
