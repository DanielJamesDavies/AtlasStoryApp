// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { NotesContext } from "../NotesContext";
import { APIContext } from "../../../context/APIContext";
import { LightboxContext } from "../../../context/LightboxContext";

// Services
import getImageFromFile from "../../../services/GetImageFromFile";

// Styles

// Assets

export const NotesListItemLogic = ({ item, index }) => {
	const { notes_uid, story, setStory, noteImages, setNoteImages } = useContext(NotesContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

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

	function reorderItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newStory = JSON.parse(JSON.stringify(story));
		const notesIndex = newStory.data.notes.findIndex((e) => e.uid === notes_uid);
		if (notesIndex === -1) return false;
		const tempDevImageItem = newStory.data.notes[notesIndex].items[index].images.splice(res.from, 1)[0];
		newStory.data.notes[notesIndex].items[index].images.splice(res.to, 0, tempDevImageItem);
		setStory(newStory);
	}

	function changeItemImageCaption(e, imageIndex) {
		let newStory = JSON.parse(JSON.stringify(story));
		const notesIndex = newStory.data.notes.findIndex((e) => e.uid === notes_uid);
		if (notesIndex === -1) return false;
		newStory.data.notes[notesIndex].items[index].images[imageIndex].caption = e.target.value;
		setStory(newStory);
	}

	function removeItemImage(imageIndex) {
		let newStory = JSON.parse(JSON.stringify(story));
		const notesIndex = newStory.data.notes.findIndex((e) => e.uid === notes_uid);
		if (notesIndex === -1) return false;
		newStory.data.notes[notesIndex].items[index].images.splice(imageIndex, 1);
		setStory(newStory);
	}

	function removeItem() {
		let newStory = JSON.parse(JSON.stringify(story));
		const notesIndex = newStory.data.notes.findIndex((e) => e.uid === notes_uid);
		if (notesIndex === -1) return false;
		newStory.data.notes[notesIndex].items.splice(index, 1);
		setStory(newStory);
	}

	const addImageInputRef = useRef();

	async function onAddImageToItem(e) {
		const image = await getImageFromFile(e.target.files[0]);
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		let newStory = JSON.parse(JSON.stringify(story));
		const notesIndex = newStory.data.notes.findIndex((e) => e.uid === notes_uid);
		if (notesIndex === -1) return false;
		newStory.data.notes[notesIndex].items[index].images.push({ image: new_id_response.data._id, caption: "" });
		setStory(newStory);

		setNoteImages((oldNoteImages) => {
			let newNoteImages = JSON.parse(JSON.stringify(oldNoteImages));
			newNoteImages.push({ _id: new_id_response.data._id, image: image.data, isUnsaved: true });
			return newNoteImages;
		});

		return true;
	}

	function onItemImageClick(imageIndex) {
		setLightboxImageIDs(item.images);
		setLightboxIndex(imageIndex);
	}

	return {
		changeItemTitle,
		changeItemText,
		reorderItemImages,
		changeItemImageCaption,
		removeItemImage,
		removeItem,
		noteImages,
		addImageInputRef,
		onAddImageToItem,
		onItemImageClick,
	};
};
