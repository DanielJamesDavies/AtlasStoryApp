// Packages

// Components
import { NotesListItem } from "../NotesListItem/NotesListItem";
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { NotesListLogic } from "./NotesListLogic";

// Context

// Services

// Styles
import "./NotesList.css";

// Assets

export const NotesList = () => {
	const {
		notes_uid,
		isAuthorizedToEdit,
		story,
		addNotesItem,
		isReorderingNotes,
		toggleIsReorderingNotes,
		reorderNotes,
		errors,
		revertNotes,
		saveNotes,
	} = NotesListLogic();

	if (!story) return null;
	return (
		<EditableContainer
			className='notes-list-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addNotesItem}
			onReorder={toggleIsReorderingNotes}
			onRevert={revertNotes}
			onSave={saveNotes}
		>
			<div className='notes-list'>
				{story?.data?.notes
					.find((e) => e.uid === notes_uid)
					?.items.map((item, index) => (
						<div key={index} className='notes-list-item-container'>
							<NotesListItem item={item} index={index} isEditing={false} />
						</div>
					))}
			</div>
			<>
				<ErrorMessage errors={errors} />
				<DragDropContainer className='notes-list' enableDragDrop={isReorderingNotes} onDropItem={reorderNotes}>
					{story?.data?.notes
						.find((e) => e.uid === notes_uid)
						?.items.map((item, index) => (
							<DragDropItem key={index} index={index} className='notes-list-item-container'>
								<NotesListItem item={item} index={index} isEditing={true} isReorderingNotes={isReorderingNotes} />
							</DragDropItem>
						))}
				</DragDropContainer>
			</>
		</EditableContainer>
	);
};
