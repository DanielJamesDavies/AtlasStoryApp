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
import { SettingsMapVersions } from "./SettingsMapVersions/SettingsMapVersions";
import { SettingsSubpages } from "./SettingsSubpages/SettingsSubpages";
import { SettingsOverviewBackgroundImage } from "./SettingsOverviewBackgroundImage/SettingsOverviewBackgroundImage";
import { SettingsOverviewForegroundImage } from "./SettingsOverviewForegroundImage/SettingsOverviewForegroundImage";
import { SettingsMapImage } from "./SettingsMapImage/SettingsMapImage";
import { SettingsCardBackgroundImage } from "./SettingsCardBackgroundImage/SettingsCardBackgroundImage";
import { SettingsCardNameColour } from "./SettingsCardNameColour/SettingsCardNameColour";
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
		<div className='unit-page-subpage unit-page-subpage-settings'>
			<div className='unit-page-subpage-settings-section-1'>
				<SettingsUID />
				<SettingsGroup />
				<SettingsColour />
				<SettingsPrimaryCharacter />
				<SettingsMajorEvent />
				<SettingsTitleOnPoster />
				<SettingsStoryTitleInTitle />
				<SettingsVersions />
				<SettingsMapVersions />
				<SettingsSubpages />
				<SettingsDelete />
			</div>
			<div className='unit-page-subpage-settings-section-2'>
				<SettingsMapImage />
				<SettingsOverviewForegroundImage />
				<SettingsOverviewBackgroundImage />
				<SettingsCardNameColour />
				<SettingsCardBackgroundImage />
				<SettingsFaceImage />
				<SettingsListImage />
				<SettingsDelete />
			</div>
		</div>
	);
};
