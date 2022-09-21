// Packages

// Components
import { SettingsUID } from "./SettingsUID/SettingsUID";
import { SettingsGroup } from "./SettingsGroup/SettingsGroup";
import { SettingsColour } from "./SettingsColour/SettingsColour";
import { SettingsPrimaryCharacter } from "./SettingsPrimaryCharacter/SettingsPrimaryCharacter";
import { SettingsVersions } from "./SettingsVersions/SettingsVersions";
import { SettingsSubpages } from "./SettingsSubpages/SettingsSubpages";
import { SettingsDelete } from "./SettingsDelete/SettingsDelete";
import { SettingsOverviewBackgroundImage } from "./SettingsOverviewBackgroundImage/SettingsOverviewBackgroundImage";
import { SettingsCardBackgroundImage } from "./SettingsCardBackgroundImage/SettingsCardBackgroundImage";

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
				<SettingsVersions />
				<SettingsSubpages />
				<SettingsDelete />
			</div>
			<div className='character-subpage-settings-section-2'>
				<SettingsOverviewBackgroundImage />
				<SettingsCardBackgroundImage />
				{/* Face Image */}
			</div>
		</div>
	);
};
