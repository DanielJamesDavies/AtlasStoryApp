// Packages

// Components
import { Settings } from "./Settings";

// Logic

// Context
import SettingsProvider from "./SettingsContext";

// Services

// Styles

// Assets

export const SettingsContainer = () => {
	return (
		<SettingsProvider>
			<Settings />
		</SettingsProvider>
	);
};
