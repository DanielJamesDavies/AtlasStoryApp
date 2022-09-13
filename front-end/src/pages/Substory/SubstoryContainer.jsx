// Packages

// Components
import { Substory } from "./Substory";

// Logic

// Context
import SubstoryProvider from "./SubstoryContext";

// Services

// Styles

// Assets

export const SubstoryContainer = ({ story_uid, substory_uid }) => {
	return (
		<SubstoryProvider story_uid={story_uid} substory_uid={substory_uid}>
			<Substory />
		</SubstoryProvider>
	);
};
