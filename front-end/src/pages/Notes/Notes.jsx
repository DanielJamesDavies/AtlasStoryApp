// Packages

// Components
import { NotesTitle } from "./NotesTitle/NotesTitle";
import { NotesList } from "./NotesList/NotesList";

// Logic

// Context

// Services

// Styles
import "./Notes.css";

// Assets

export const Notes = () => {
	return (
		<div className='notes'>
			<NotesTitle />
			<NotesList />
		</div>
	);
};
