// Packages

// Components
import { SettingsUID } from "./SettingsUID/SettingsUID";
import { SettingsColour } from "./SettingsColour/SettingsColour";
import { SettingsStoryTitleInTitle } from "./SettingsStoryTitleInTitle/SettingsStoryTitleInTitle";
import { SettingsDelete } from "./SettingsDelete/SettingsDelete";
import { SettingsOverviewBackgroundImage } from "./SettingsOverviewBackgroundImage/SettingsOverviewBackgroundImage";
import { SettingsPosterBackgroundImage } from "./SettingsPosterBackgroundImage/SettingsPosterBackgroundImage";

// Logic

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	return (
		<div className='substory-subpage-settings'>
			<div className='substory-subpage-settings-section-1'>
				<SettingsUID />
				<SettingsColour />
				<SettingsStoryTitleInTitle />
				<SettingsDelete />
			</div>
			<div className='substory-subpage-settings-section-2'>
				<SettingsOverviewBackgroundImage />
				<SettingsPosterBackgroundImage />
			</div>
		</div>
	);
};
