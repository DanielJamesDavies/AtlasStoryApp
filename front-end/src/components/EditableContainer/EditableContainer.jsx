// Packages
import { FaMountain, FaPencilAlt, FaPlus, FaSave, FaSort, FaUndoAlt } from "react-icons/fa";

// Components

// Logic
import { EditableContainerLogic } from "./EditableContainerLogic";

// Context

// Services

// Styles
import "./EditableContainer.css";

// Assets

export const EditableContainer = ({ children, className, isMediaContent, isAuthorizedToEdit, onAdd, onReorder, onRevert, onSave }) => {
	const {
		isEditing,
		editableContainerClassName,
		onEditBtnClick,
		onViewBtnClick,
		onAddBtnClick,
		onReorderBtnClick,
		onRevertBtnClick,
		onSaveBtnClick,
	} = EditableContainerLogic({
		className,
		isMediaContent,
		isAuthorizedToEdit,
		onAdd,
		onReorder,
		onRevert,
		onSave,
	});

	return (
		<div className={editableContainerClassName}>
			<div className='editable-container-content'>
				{children.map((child, index) => ((isEditing && index === 0) || (!isEditing && index === 1) ? null : child))}
			</div>
			{!isAuthorizedToEdit ? null : !isEditing ? (
				<div className='editable-container-buttons-container'>
					<button className='editable-container-edit-btn' onClick={onEditBtnClick}>
						<FaPencilAlt />
					</button>
				</div>
			) : (
				<div className='editable-container-buttons-container'>
					<button className='editable-container-edit-btn' onClick={onViewBtnClick}>
						<FaMountain />
					</button>
					{onAdd === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-add' onClick={onAddBtnClick}>
							<FaPlus />
						</button>
					)}
					{onReorder === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-reorder' onClick={onReorderBtnClick}>
							<FaSort />
						</button>
					)}
					{onRevert === undefined ? null : (
						<button className='editable-container-edit-btn' onClick={onRevertBtnClick}>
							<FaUndoAlt />
						</button>
					)}
					{onSave === undefined ? null : (
						<button className='editable-container-edit-btn' onClick={onSaveBtnClick}>
							<FaSave />
						</button>
					)}
				</div>
			)}
		</div>
	);
};
