// Packages

// Components
import { SettingsUID } from "./SettingsUID/SettingsUID";
import { SettingsColour } from "./SettingsColour/SettingsColour";
import { SettingsVersions } from "./SettingsVersions/SettingsVersions";
import { SettingsSubpages } from "./SettingsSubpages/SettingsSubpages";
import { SettingsOverviewBackgroundImage } from "./SettingsOverviewBackgroundImage/SettingsOverviewBackgroundImage";
import { SettingsDelete } from "./SettingsDelete/SettingsDelete";

// Logic

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	return (
		<div className='group-subpage-settings'>
			<div className='group-subpage-settings-section-1'>
				<SettingsUID />
				<SettingsColour />
				<SettingsVersions />
				<SettingsSubpages />
			</div>
			<div className='group-subpage-settings-section-2'>
				<SettingsOverviewBackgroundImage />
				<SettingsDelete />
			</div>
		</div>
	);
};
