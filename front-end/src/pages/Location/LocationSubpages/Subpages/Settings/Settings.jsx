// Packages

// Components
import { SettingsUID } from "./SettingsUID/SettingsUID";
import { SettingsColour } from "./SettingsColour/SettingsColour";
import { SettingsSubpages } from "./SettingsSubpages/SettingsSubpages";
import { SettingsDelete } from "./SettingsDelete/SettingsDelete";
import { SettingsOverviewBackgroundImage } from "./SettingsOverviewBackgroundImage/SettingsOverviewBackgroundImage";

// Logic

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	return (
		<div className='location-subpage-settings'>
			<div className='location-subpage-settings-section-1'>
				<SettingsUID />
				<SettingsColour />
				<SettingsSubpages />
				<SettingsDelete />
			</div>
			<div className='location-subpage-settings-section-2'>
				<SettingsOverviewBackgroundImage />
			</div>
		</div>
	);
};
