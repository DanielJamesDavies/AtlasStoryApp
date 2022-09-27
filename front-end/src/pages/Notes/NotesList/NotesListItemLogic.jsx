// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { NotesContext } from "../NotesContext";

// Services

// Styles

// Assets

export const NotesListItemLogic = ({ index }) => {
	const { notes_uid, story, setStory } = useContext(NotesContext);

	function changeItemTitle(e) {
		let newStory = JSON.parse(JSON.stringify(story));
		const notesIndex = newStory.data.notes.findIndex((e) => e.uid === notes_uid);
		if (notesIndex === -1) return false;
		newStory.data.notes[notesIndex].items[index].title = e.target.value;
		setStory(newStory);
	}

	function changeItemText(e) {
		let newStory = JSON.parse(JSON.stringify(story));
		const notesIndex = newStory.data.notes.findIndex((e) => e.uid === notes_uid);
		if (notesIndex === -1) return false;
		newStory.data.notes[notesIndex].items[index].text = e.target.value.split("\n");
		setStory(newStory);
	}

	function removeItem() {
		let newStory = JSON.parse(JSON.stringify(story));
		const notesIndex = newStory.data.notes.findIndex((e) => e.uid === notes_uid);
		if (notesIndex === -1) return false;
		newStory.data.notes[notesIndex].items.splice(index, 1);
		setStory(newStory);
	}

	return { changeItemTitle, changeItemText, removeItem };
};
