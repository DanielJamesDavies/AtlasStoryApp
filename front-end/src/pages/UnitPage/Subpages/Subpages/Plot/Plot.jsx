// Packages
import { useRef } from "react";

// Components
import { PlotFileBar } from "./plot-file-bar/plot-file-bar";
import { PlotFileBrowser } from "./plot-file-browser/plot-file-browser";
import { PlotFileViewer } from "./plot-file-viewer/plot-file-viewer";
import { PlotFileEditor } from "./plot-file-editor/plot-file-editor";

// Logic
import { PlotLogic } from "./PlotLogic";

// Context

// Services

// Styles
import "./Plot.css";

// Assets

export const Plot = () => {
	const {
		unit,
		currentFile,
		currentFileID,
		initialFileID,
		setInitialFile,
		isFileBrowserOpen,
		openFileBrowser,
		closeFileBrowser,
		selectFile,
		isEditing,
		isAuthorizedToEdit,
		enterEditMode,
		saveFile,
		renameFile,
		revertFile,
	} = PlotLogic();

	const hasFiles = (unit?.data?.plot?.files?.length ?? 0) > 0;
	const editorRef = useRef(null);
	const nameRef = useRef(null);

	return (
		<div className='unit-page-subpage unit-page-subpage-plot'>
		<PlotFileBar
			currentFile={currentFile}
			currentFileID={currentFileID}
			initialFileID={initialFileID}
			folders={unit?.data?.plot?.folders || []}
			onOpenBrowser={openFileBrowser}
			isEditing={isEditing}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onEdit={enterEditMode}
			onSetInitialFile={setInitialFile}
			onRevert={revertFile}
			onSave={() => saveFile(editorRef.current?.getMarkdown() ?? "", nameRef.current?.value)}
		/>
			<PlotFileBrowser
				isOpen={isFileBrowserOpen}
				onClose={closeFileBrowser}
				currentFileID={currentFileID}
				onSelectFile={selectFile}
			/>
			{isEditing ? (
				<PlotFileEditor
					currentFile={currentFile}
					onSave={saveFile}
					isAuthorizedToEdit={isAuthorizedToEdit}
					editorRef={editorRef}
					nameRef={nameRef}
				/>
			) : (
				<PlotFileViewer
					currentFile={currentFile}
					hasFiles={hasFiles}
					isAuthorizedToEdit={isAuthorizedToEdit}
					onOpenBrowser={openFileBrowser}
				/>
			)}
		</div>
	);
};
