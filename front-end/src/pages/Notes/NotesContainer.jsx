// Packages

// Components
import { Notes } from "./Notes";

// Logic

// Context
import NotesProvider from "./NotesContext";

// Services

// Styles

// Assets

export const NotesContainer = ({ story_uid, notes_uid }) => {
	return (
		<NotesProvider story_uid={story_uid} notes_uid={notes_uid}>
			<Notes />
		</NotesProvider>
	);
};
