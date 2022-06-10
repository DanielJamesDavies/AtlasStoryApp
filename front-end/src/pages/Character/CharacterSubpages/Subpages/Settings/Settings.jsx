// Packages

// Components
import { SettingsURL } from "./SettingsURL/SettingsURL";
import { SettingsColour } from "./SettingsColour/SettingsColour";

// Logic

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	return (
		<div className='character-subpage-settings'>
			<div className='character-subpage-settings-section-1'>
				<SettingsURL />
				{/* Group */}
				<SettingsColour />
				{/* Versions */}
			</div>
			<div className='character-subpage-settings-section-2'>
				{/* Overview Background Image */}
				{/* Card Background Image */}
				{/* Face Image */}
			</div>
		</div>
	);
};
