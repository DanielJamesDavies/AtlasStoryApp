// Packages

// Components
import { SettingsUID } from "./SettingsUID/SettingsUID";
import { SettingsGroup } from "./SettingsGroup/SettingsGroup";
import { SettingsColour } from "./SettingsColour/SettingsColour";
import { SettingsPrimaryCharacter } from "./SettingsPrimaryCharacter/SettingsPrimaryCharacter";
import { SettingsMajorEvent } from "./SettingsMajorEvent/SettingsMajorEvent";
import { SettingsTitleOnPoster } from "./SettingsTitleOnPoster/SettingsTitleOnPoster";
import { SettingsStoryTitleInTitle } from "./SettingsStoryTitleInTitle/SettingsStoryTitleInTitle";
import { SettingsVersions } from "./SettingsVersions/SettingsVersions";
import { SettingsSubpages } from "./SettingsSubpages/SettingsSubpages";
import { SettingsOverviewBackgroundImage } from "./SettingsOverviewBackgroundImage/SettingsOverviewBackgroundImage";
import { SettingsOverviewForegroundImage } from "./SettingsOverviewForegroundImage/SettingsOverviewForegroundImage";
import { SettingsCardBackgroundImage } from "./SettingsCardBackgroundImage/SettingsCardBackgroundImage";
import { SettingsFaceImage } from "./SettingsFaceImage/SettingsFaceImage";
import { SettingsListImage } from "./SettingsListImage/SettingsListImage";
import { SettingsDelete } from "./SettingsDelete/SettingsDelete";

// Logic

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	return (
		<div className='unit-page-subpage-settings'>
			<div className='unit-page-subpage-settings-section-1'>
				<SettingsUID />
				<SettingsGroup />
				<SettingsColour />
				<SettingsPrimaryCharacter />
				<SettingsMajorEvent />
				<SettingsTitleOnPoster />
				<SettingsStoryTitleInTitle />
				<SettingsVersions />
				<SettingsSubpages />
				<SettingsDelete />
			</div>
			<div className='unit-page-subpage-settings-section-2'>
				<SettingsOverviewForegroundImage />
				<SettingsOverviewBackgroundImage />
				<SettingsCardBackgroundImage />
				<SettingsFaceImage />
				<SettingsListImage />
				<SettingsDelete />
			</div>
		</div>
	);
};
