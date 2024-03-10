// Packages
import {
	FaCodeBranch,
	FaCog,
	FaCopy,
	FaEyeSlash,
	FaMountain,
	FaPaste,
	FaPencilAlt,
	FaPlus,
	FaSave,
	FaSort,
	FaTimes,
	FaUndoAlt,
} from "react-icons/fa";

// Components

// Logic
import { EditableContainerLogic } from "./EditableContainerLogic";

// Context

// Services

// Styles
import "./EditableContainer.css";

// Assets

export const EditableContainer = ({
	children,
	innerRef,
	className,
	isMediaContent,
	absolutePositionEditBtns,
	isAuthorizedToEdit,
	onClose,
	onHide,
	onAdd,
	onRemove,
	onDefault,
	onSaveDefault,
	onReorder,
	onCopyVersionValue,
	onPasteVersionValue,
	onRevert,
	onSave,
	onScroll,
	isLight,
	higherEditBtns,
	controlScrollDepth,
	scrollItemsDepth,
	scrollItemsGap,
}) => {
	const {
		isEditing,
		editableContainerRef,
		editableContainerClassName,
		onEditableContainerKeyDown,
		onCloseBtnClick,
		onEditBtnClick,
		onViewBtnClick,
		onHideBtnClick,
		onAddBtnClick,
		onRemoveBtnClick,
		onDefaultBtnClick,
		onSaveDefaultBtnClick,
		onReorderBtnClick,
		onCopyVersionValueBtnClick,
		onPasteVersionValueBtnClick,
		onRevertBtnClick,
		onSaveBtnClick,
	} = EditableContainerLogic({
		className,
		isMediaContent,
		absolutePositionEditBtns,
		isAuthorizedToEdit,
		onClose,
		onHide,
		onAdd,
		onRemove,
		onDefault,
		onSaveDefault,
		onReorder,
		onCopyVersionValue,
		onPasteVersionValue,
		onRevert,
		onSave,
		onScroll,
		isLight,
		higherEditBtns,
		controlScrollDepth,
		scrollItemsDepth,
		scrollItemsGap,
	});

	return (
		<div ref={editableContainerRef} className={editableContainerClassName} onKeyDown={onEditableContainerKeyDown}>
			<div ref={innerRef} className='editable-container-content'>
				{children.map((child, index) => ((isEditing && index === 0) || (!isEditing && index === 1) ? null : child))}
			</div>
			{!isAuthorizedToEdit ? null : !isEditing ? (
				<div className='editable-container-buttons-container'>
					{onClose === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-close' onClick={onCloseBtnClick}>
							<FaTimes />
						</button>
					)}
					<button className='editable-container-edit-btn' onClick={onEditBtnClick}>
						<FaPencilAlt />
					</button>
				</div>
			) : (
				<div className='editable-container-buttons-container'>
					<button className='editable-container-edit-btn' onClick={onViewBtnClick}>
						<FaMountain />
					</button>
					{onHide === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-hide' onClick={onHideBtnClick}>
							<FaEyeSlash />
						</button>
					)}
					{onAdd === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-add' onClick={onAddBtnClick}>
							<FaPlus />
						</button>
					)}
					{onRemove === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-remove' onClick={onRemoveBtnClick}>
							<FaTimes />
						</button>
					)}
					{onDefault === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-default' onClick={onDefaultBtnClick}>
							<FaCog />
							<div className='editable-container-edit-btn-small-icon-container'>
								<div className='editable-container-edit-btn-small-icon'>
									<FaUndoAlt />
								</div>
								<div className='editable-container-edit-btn-small-icon-bg-1'>
									<FaUndoAlt />
								</div>
								<div className='editable-container-edit-btn-small-icon-bg-2'>
									<FaUndoAlt />
								</div>
							</div>
						</button>
					)}
					{onSaveDefault === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-save-default' onClick={onSaveDefaultBtnClick}>
							<FaCog />
							<div className='editable-container-edit-btn-small-icon-container'>
								<div className='editable-container-edit-btn-small-icon'>
									<FaSave />
								</div>
								<div className='editable-container-edit-btn-small-icon-bg-1'>
									<FaSave />
								</div>
								<div className='editable-container-edit-btn-small-icon-bg-2'>
									<FaSave />
								</div>
							</div>
						</button>
					)}
					{onReorder === undefined ? null : (
						<button className='editable-container-edit-btn editable-container-edit-btn-reorder' onClick={onReorderBtnClick}>
							<FaSort />
						</button>
					)}
					{onCopyVersionValue === undefined ? null : (
						<button
							className='editable-container-edit-btn editable-container-edit-btn-copy-version-value'
							onClick={onCopyVersionValueBtnClick}
						>
							<FaCopy />
							<div className='editable-container-edit-btn-small-icon'>
								<FaCodeBranch />
								<FaCodeBranch />
							</div>
						</button>
					)}
					{onPasteVersionValue === undefined ? null : (
						<button
							className='editable-container-edit-btn editable-container-edit-btn-paste-version-value'
							onClick={onPasteVersionValueBtnClick}
						>
							<FaPaste />
							<div className='editable-container-edit-btn-small-icon'>
								<FaCodeBranch />
								<FaCodeBranch />
							</div>
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
