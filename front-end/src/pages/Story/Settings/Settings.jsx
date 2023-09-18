// Packages

// Components
import { PopUpContainer } from "../../../components/PopUpContainer/PopUpContainer";
import { UID } from "./UID/UID";
import { Private } from "./Private/Private";
import { Members } from "./Members/Members";
import { Colours } from "./Colours/Colours";
import { Delete } from "./Delete/Delete";

// Logic
import { SettingsLogic } from "./SettingsLogic";

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	const { isDisplayingSettings, closeSettings } = SettingsLogic();

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
					<UID />
				</div>
				<div className='story-settings-section-container'>
					{/* <div className='story-settings-section-label'>Colours</div> */}
					<Colours />
				</div>
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Private Story</div>
					<Private />
				</div>
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Members</div>
					<Members />
				</div>
				{/* <div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Cover</div>
				</div> */}
				<div className='story-settings-section-container'>
					<div className='story-settings-section-label'>Delete Story</div>
					<Delete />
				</div>
			</div>
		</PopUpContainer>
	);
};
