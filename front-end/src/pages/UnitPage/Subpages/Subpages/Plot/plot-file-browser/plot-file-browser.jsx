// Packages
import { useRef, useEffect, useState, useMemo } from "react";
import {
	FaFolder, FaFileAlt, FaPen, FaTrash, FaPlus, FaTimes, FaCheck,
	FaChevronLeft, FaChevronRight, FaHome, FaLevelUpAlt,
} from "react-icons/fa";

// Components
import { PopUpContainer } from "../../../../../../components/PopUpContainer/PopUpContainer";

// Logic
import { PlotFileBrowserLogic } from "./plot-file-browser-logic";

// Context

// Services

// Styles
import "./plot-file-browser.css";

// Assets

export const PlotFileBrowser = ({ isOpen, onClose, currentFileID, onSelectFile }) => {
	const {
		isAuthorizedToEdit,
		folders,
		// Navigation
		currentFolderID,
		currentPath,
		historyStack,
		forwardStack,
		navigateTo,
		navigateBack,
		navigateForward,
		visibleFolders,
		visibleFiles,
		// Rename
		renamingID,
		renamingValue,
		setRenamingValue,
		startRename,
		cancelRename,
		renameFolder,
		renameFile,
		// Delete
		confirmingDeleteID,
		startDelete,
		cancelDelete,
		deleteFolder,
		deleteFile,
		// Move (drag-and-drop)
		moveFolder,
		moveFile,
		// Create folder
		isCreatingFolder,
		newFolderName,
		setNewFolderName,
		startCreateFolder,
		cancelCreateFolder,
		createFolder,
		// Create file
		isCreatingFile,
		newFileName,
		setNewFileName,
		startCreateFile,
		cancelCreateFile,
		createFile,
	} = PlotFileBrowserLogic({ onSelectFile });

	// Parent folder (for the "go up" card)
	const parentFolderID = useMemo(() => {
		if (!currentFolderID) return undefined; // at root, no parent card
		const current = folders.find((f) => JSON.stringify(f._id) === JSON.stringify(currentFolderID));
		return current?.parentId ?? null; // null = parent is root
	}, [currentFolderID, folders]);

	const parentFolderName = useMemo(() => {
		if (parentFolderID === undefined) return null;
		if (parentFolderID === null) return "Home";
		const parent = folders.find((f) => JSON.stringify(f._id) === JSON.stringify(parentFolderID));
		return parent?.name ?? "Home";
	}, [parentFolderID, folders]);

	// ── Drag state (UI only) ──────────────────────────────────────────────────
	const [draggingItem, setDraggingItem] = useState(null); // { id, type }
	const [dragOverID, setDragOverID] = useState(undefined); // folder _id
	const [isDragOverParent, setIsDragOverParent] = useState(false);

	function onDragStart(id, type) {
		setDraggingItem({ id, type });
	}

	function onDragEnd() {
		setDraggingItem(null);
		setDragOverID(undefined);
		setIsDragOverParent(false);
	}

	function onDragOverFolder(e, folderId) {
		if (!draggingItem) return;
		if (draggingItem.type === "folder" && JSON.stringify(draggingItem.id) === JSON.stringify(folderId)) return;
		e.preventDefault();
		e.stopPropagation();
		setDragOverID(folderId);
	}

	function onDragLeaveFolder(e) {
		if (!e.currentTarget.contains(e.relatedTarget)) setDragOverID(undefined);
	}

	function onDropFolder(e, targetFolderID) {
		e.preventDefault();
		e.stopPropagation();
		if (!draggingItem) return;
		if (draggingItem.type === "folder" && JSON.stringify(draggingItem.id) === JSON.stringify(targetFolderID)) return;
		if (draggingItem.type === "folder") moveFolder(draggingItem.id, targetFolderID);
		else moveFile(draggingItem.id, targetFolderID);
		onDragEnd();
	}


	const isEmpty = visibleFolders.length === 0 && visibleFiles.length === 0;

	return (
		<PopUpContainer className='plot-file-browser-popup' title='Plot Files' isDisplaying={isOpen} onClosePopUp={onClose} nullOnHidden modalID='plot_files_modal'>
			<div className='plot-file-browser-body'>
				{/* Top navigation bar */}
				<div className='plot-file-browser-nav'>
					<div className='plot-file-browser-nav-left'>
						<button className='plot-file-browser-nav-btn' onClick={navigateBack} disabled={historyStack.length === 0} title='Back'>
							<FaChevronLeft />
						</button>
						<button className='plot-file-browser-nav-btn' onClick={navigateForward} disabled={forwardStack.length === 0} title='Forward'>
							<FaChevronRight />
						</button>
					</div>

					<div className='plot-file-browser-breadcrumb'>
						<button className='plot-file-browser-crumb plot-file-browser-crumb-root' onClick={() => navigateTo(null)} title='Root'>
							<FaHome />
						</button>
						{currentPath.map((crumb) => (
							<span key={JSON.stringify(crumb._id)} className='plot-file-browser-crumb-group'>
								<span className='plot-file-browser-crumb-sep'>/</span>
								<button className='plot-file-browser-crumb' onClick={() => navigateTo(crumb._id)}>
									{crumb.name}
								</button>
							</span>
						))}
					</div>

					{isAuthorizedToEdit && (
						<div className='plot-file-browser-nav-actions'>
							<button className='plot-file-browser-add-btn' onClick={startCreateFolder} title='New Folder'>
								<FaPlus />
								<span>New Folder</span>
							</button>
							<button className='plot-file-browser-add-btn' onClick={startCreateFile} title='New File'>
								<FaPlus />
								<span>New File</span>
							</button>
						</div>
					)}
				</div>

				{/* Creation inputs */}
				{(isCreatingFolder || isCreatingFile) && (
					<div className='plot-file-browser-create-row'>
						<NewItemInput
							value={isCreatingFolder ? newFolderName : newFileName}
							onChange={isCreatingFolder ? setNewFolderName : setNewFileName}
							onConfirm={isCreatingFolder ? createFolder : createFile}
							onCancel={isCreatingFolder ? cancelCreateFolder : cancelCreateFile}
							placeholder={isCreatingFolder ? "Folder name…" : "File name…"}
							icon={isCreatingFolder ? <FaFolder /> : <FaFileAlt />}
						/>
					</div>
				)}

				{/* Grid */}
				<div className='plot-file-browser-grid'>
					{parentFolderID !== undefined && (
						<ParentCard
							name={parentFolderName}
							isDragOver={isDragOverParent}
							isDragging={!!draggingItem}
							onClick={() => navigateTo(parentFolderID)}
							onDragOver={(e) => { if (!draggingItem) return; e.preventDefault(); e.stopPropagation(); setIsDragOverParent(true); }}
							onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsDragOverParent(false); }}
							onDrop={(e) => {
								e.preventDefault();
								e.stopPropagation();
								if (!draggingItem) return;
								if (draggingItem.type === "folder") moveFolder(draggingItem.id, parentFolderID);
								else moveFile(draggingItem.id, parentFolderID);
								onDragEnd();
							}}
						/>
					)}

					{isEmpty && !isCreatingFolder && !isCreatingFile && (
						<p className='plot-file-browser-empty'>This folder is empty</p>
					)}

					{visibleFolders.map((folder) => (
						<FolderCard
							key={JSON.stringify(folder._id)}
							folder={folder}
							isAuthorizedToEdit={isAuthorizedToEdit}
							isDragOver={JSON.stringify(dragOverID) === JSON.stringify(folder._id)}
							isDragging={draggingItem && JSON.stringify(draggingItem.id) === JSON.stringify(folder._id)}
							onDragStart={() => onDragStart(folder._id, "folder")}
							onDragEnd={onDragEnd}
							onDragOver={(e) => onDragOverFolder(e, folder._id)}
							onDragLeave={onDragLeaveFolder}
							onDrop={(e) => onDropFolder(e, folder._id)}
							renamingID={renamingID}
							renamingValue={renamingValue}
							setRenamingValue={setRenamingValue}
							startRename={startRename}
							cancelRename={cancelRename}
							renameFolder={renameFolder}
							confirmingDeleteID={confirmingDeleteID}
							startDelete={startDelete}
							cancelDelete={cancelDelete}
							deleteFolder={deleteFolder}
							onOpen={() => navigateTo(folder._id)}
						/>
					))}

					{visibleFiles.map((file) => (
						<FileCard
							key={JSON.stringify(file._id)}
							file={file}
							isActive={JSON.stringify(file._id) === JSON.stringify(currentFileID)}
							isDragging={draggingItem && JSON.stringify(draggingItem.id) === JSON.stringify(file._id)}
							onClick={() => onSelectFile(file._id)}
							onDragStart={() => onDragStart(file._id, "file")}
							onDragEnd={onDragEnd}
							isAuthorizedToEdit={isAuthorizedToEdit}
							renamingID={renamingID}
							renamingValue={renamingValue}
							setRenamingValue={setRenamingValue}
							startRename={startRename}
							cancelRename={cancelRename}
							renameFile={renameFile}
							confirmingDeleteID={confirmingDeleteID}
							startDelete={startDelete}
							cancelDelete={cancelDelete}
							deleteFile={deleteFile}
						/>
					))}
				</div>
			</div>
		</PopUpContainer>
	);
};

// ── ParentCard ────────────────────────────────────────────────────────────────

const ParentCard = ({ name, isDragOver, isDragging, onClick, onDragOver, onDragLeave, onDrop }) => (
	<div
		className={[
			"plot-file-browser-card plot-file-browser-card-parent",
			isDragOver ? "plot-file-browser-card-drag-over" : "",
		].filter(Boolean).join(" ")}
		onDragOver={onDragOver}
		onDragLeave={onDragLeave}
		onDrop={onDrop}
	>
		<button className='plot-file-browser-card-main' onClick={onClick}>
			<span className='plot-file-browser-card-up-icon'>
				<FaFolder className='plot-file-browser-card-icon' />
				<FaLevelUpAlt className='plot-file-browser-card-up-badge' />
			</span>
			<span className='plot-file-browser-card-label plot-file-browser-card-label-muted'>{name}</span>
		</button>
	</div>
);

// ── FolderCard ────────────────────────────────────────────────────────────────

const FolderCard = ({
	folder, isAuthorizedToEdit, onOpen, isDragOver, isDragging,
	onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop,
	renamingID, renamingValue, setRenamingValue, startRename, cancelRename, renameFolder,
	confirmingDeleteID, startDelete, cancelDelete, deleteFolder,
}) => {
	const isRenaming = JSON.stringify(renamingID) === JSON.stringify(folder._id);
	const isConfirmingDelete = JSON.stringify(confirmingDeleteID) === JSON.stringify(folder._id);
	const inputRef = useRef();
	useEffect(() => { if (isRenaming) inputRef.current?.focus(); }, [isRenaming]);

	return (
		<div
			className={[
				"plot-file-browser-card",
				isConfirmingDelete ? "plot-file-browser-card-danger" : "",
				isDragOver ? "plot-file-browser-card-drag-over" : "",
				isDragging ? "plot-file-browser-card-dragging" : "",
			].filter(Boolean).join(" ")}
			draggable={isAuthorizedToEdit && !isRenaming}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
		>
			<button className='plot-file-browser-card-main' onClick={isConfirmingDelete ? undefined : onOpen}>
				<FaFolder className='plot-file-browser-card-icon' />
				{isRenaming ? (
					<input
						ref={inputRef}
						className='plot-file-browser-card-rename-input'
						value={renamingValue}
						onChange={(e) => setRenamingValue(e.target.value)}
						onKeyDown={(e) => { if (e.key === "Enter") renameFolder(folder._id); if (e.key === "Escape") cancelRename(); }}
						onBlur={() => renameFolder(folder._id)}
						onClick={(e) => e.stopPropagation()}
					/>
				) : isConfirmingDelete ? (
					<span className='plot-file-browser-card-label plot-file-browser-card-label-danger'>Delete?</span>
				) : (
					<span className='plot-file-browser-card-label'>{folder.name}</span>
				)}
			</button>

		{isAuthorizedToEdit && !isRenaming && (
			<div className='plot-file-browser-card-actions'>
				{isConfirmingDelete ? (
					<>
						<button className='plot-file-browser-card-action-btn' onClick={(e) => { e.stopPropagation(); cancelDelete(); }} title='Cancel'><FaTimes /></button>
						<button className='plot-file-browser-card-action-btn plot-file-browser-card-action-btn-danger' onClick={(e) => { e.stopPropagation(); deleteFolder(folder._id); }} title='Confirm delete'><FaTrash /></button>
					</>
				) : (
					<>
						<button className='plot-file-browser-card-action-btn' onClick={(e) => { e.stopPropagation(); startRename(folder._id, folder.name); }} title='Rename'><FaPen /></button>
						<button className='plot-file-browser-card-action-btn' onClick={(e) => { e.stopPropagation(); startDelete(folder._id); }} title='Delete'><FaTrash /></button>
					</>
				)}
			</div>
		)}
		</div>
	);
};

// ── FileCard ──────────────────────────────────────────────────────────────────

const FileCard = ({
	file, isActive, onClick, isDragging, isAuthorizedToEdit,
	onDragStart, onDragEnd,
	renamingID, renamingValue, setRenamingValue, startRename, cancelRename, renameFile,
	confirmingDeleteID, startDelete, cancelDelete, deleteFile,
}) => {
	const isRenaming = JSON.stringify(renamingID) === JSON.stringify(file._id);
	const isConfirmingDelete = JSON.stringify(confirmingDeleteID) === JSON.stringify(file._id);
	const inputRef = useRef();
	useEffect(() => { if (isRenaming) inputRef.current?.focus(); }, [isRenaming]);

	return (
		<div
			className={[
				"plot-file-browser-card",
				isActive ? "plot-file-browser-card-active" : "",
				isConfirmingDelete ? "plot-file-browser-card-danger" : "",
				isDragging ? "plot-file-browser-card-dragging" : "",
			].filter(Boolean).join(" ")}
			draggable={isAuthorizedToEdit && !isRenaming}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<button className='plot-file-browser-card-main' onClick={isConfirmingDelete ? undefined : onClick}>
				<FaFileAlt className='plot-file-browser-card-icon' />
				{isRenaming ? (
					<input
						ref={inputRef}
						className='plot-file-browser-card-rename-input'
						value={renamingValue}
						onChange={(e) => setRenamingValue(e.target.value)}
						onKeyDown={(e) => { if (e.key === "Enter") renameFile(file._id); if (e.key === "Escape") cancelRename(); }}
						onBlur={() => renameFile(file._id)}
						onClick={(e) => e.stopPropagation()}
					/>
				) : isConfirmingDelete ? (
					<span className='plot-file-browser-card-label plot-file-browser-card-label-danger'>Delete?</span>
				) : (
					<span className='plot-file-browser-card-label'>{file.name}</span>
				)}
			</button>

		{isAuthorizedToEdit && !isRenaming && (
			<div className='plot-file-browser-card-actions'>
				{isConfirmingDelete ? (
					<>
						<button className='plot-file-browser-card-action-btn' onClick={(e) => { e.stopPropagation(); cancelDelete(); }} title='Cancel'><FaTimes /></button>
						<button className='plot-file-browser-card-action-btn plot-file-browser-card-action-btn-danger' onClick={(e) => { e.stopPropagation(); deleteFile(file._id); }} title='Confirm delete'><FaTrash /></button>
					</>
				) : (
					<>
						<button className='plot-file-browser-card-action-btn' onClick={(e) => { e.stopPropagation(); startRename(file._id, file.name); }} title='Rename'><FaPen /></button>
						<button className='plot-file-browser-card-action-btn' onClick={(e) => { e.stopPropagation(); startDelete(file._id); }} title='Delete'><FaTrash /></button>
					</>
				)}
			</div>
		)}
		</div>
	);
};

// ── NewItemInput ──────────────────────────────────────────────────────────────

const NewItemInput = ({ value, onChange, onConfirm, onCancel, placeholder, icon }) => {
	const inputRef = useRef();
	useEffect(() => { inputRef.current?.focus(); }, []);

	return (
		<div className='plot-file-browser-new-item-row'>
			<span className='plot-file-browser-new-item-icon'>{icon}</span>
			<input
				ref={inputRef}
				className='plot-file-browser-new-item-input'
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => { if (e.key === "Enter") onConfirm(); if (e.key === "Escape") onCancel(); }}
				placeholder={placeholder}
			/>
			<button className='plot-file-browser-new-item-btn plot-file-browser-new-item-btn-confirm' onClick={onConfirm} title='Create'><FaCheck /></button>
			<button className='plot-file-browser-new-item-btn' onClick={onCancel} title='Cancel'><FaTimes /></button>
		</div>
	);
};
