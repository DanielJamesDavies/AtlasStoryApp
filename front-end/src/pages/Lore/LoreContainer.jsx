// Packages

// Components
import { Lore } from "./Lore";

// Logic

// Context
import LoreProvider from "./LoreContext";

// Services

// Styles

// Assets

export const LoreContainer = ({ story_uid }) => {
	return (
		<LoreProvider story_uid={story_uid}>
			<Lore />
		</LoreProvider>
	);
};
