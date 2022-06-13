// Packages

// Components
import { SettingsUID } from "./SettingsUID/SettingsUID";
import { SettingsGroup } from "./SettingsGroup/SettingsGroup";
import { SettingsColour } from "./SettingsColour/SettingsColour";
import { SettingsPrimaryCharacter } from "./SettingsPrimaryCharacter/SettingsPrimaryCharacter";
import { SettingsDelete } from "./SettingsDelete/SettingsDelete";

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
				<SettingsUID />
				<SettingsGroup />
				<SettingsColour />
				<SettingsPrimaryCharacter />
				{/* Versions */}
				<SettingsDelete />
			</div>
			<div className='character-subpage-settings-section-2'>
				{/* Overview Background Image */}
				{/* Card Background Image */}
				{/* Face Image */}
			</div>
		</div>
	);
};
