// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { NotesContext } from "../NotesContext";

// Services

// Styles

// Assets

export const NotesTitleLogic = () => {
	const { notes_uid, story, storyIcon } = useContext(NotesContext);

	const [notesTitleLabel, setNotesTitleLabel] = useState("");

	useEffect(() => {
		function getNotesTitleLabel() {
			let newNotesTitleLabel = "";
			switch (notes_uid) {
				case "characters":
					newNotesTitleLabel = "Characters";
					break;
				case "substories":
					newNotesTitleLabel = "Substories";
					break;
				case "world":
					newNotesTitleLabel = "World";
					break;
				default:
					break;
			}
			setNotesTitleLabel(newNotesTitleLabel);
		}
		getNotesTitleLabel();
	}, [setNotesTitleLabel, notes_uid]);

	return { story, storyIcon, notesTitleLabel };
};
