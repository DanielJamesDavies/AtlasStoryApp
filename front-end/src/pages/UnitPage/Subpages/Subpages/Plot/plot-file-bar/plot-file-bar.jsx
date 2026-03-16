// Packages
import { FaFolderOpen, FaChevronRight, FaPencilAlt, FaFlag, FaRegFlag, FaSave, FaUndoAlt } from "react-icons/fa";

// Components

// Logic

// Context

// Services
import { getFileBreadcrumbs } from "../plot-utils";

// Styles
import "./plot-file-bar.css";

// Assets

export const PlotFileBar = ({
  currentFile,
  currentFileID,
  initialFileID,
  folders,
  onOpenBrowser,
  isEditing,
  isAuthorizedToEdit,
  onEdit,
  onSetInitialFile,
  onRevert,
  onSave,
}) => {
  const breadcrumbs = getFileBreadcrumbs(currentFile?.folderId, folders);
  const isInitial = currentFileID && JSON.stringify(currentFileID) === JSON.stringify(initialFileID);

  return (
    <div className="plot-file-bar">
      <button className="plot-file-bar-files-btn" onClick={onOpenBrowser} disabled={isEditing}>
        <FaFolderOpen />
        <span>Files</span>
      </button>
      <div className="plot-file-bar-path">
        {currentFile ? (
          <>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="plot-file-bar-crumb">
                <span className="plot-file-bar-crumb-name">{crumb.name}</span>
                <FaChevronRight className="plot-file-bar-crumb-sep" />
              </span>
            ))}
            <span className="plot-file-bar-crumb-current">{currentFile.name}</span>
          </>
        ) : (
          <span className="plot-file-bar-no-file">Select a file to view</span>
        )}
      </div>
      {currentFile && isAuthorizedToEdit && (
        <div className="plot-file-bar-actions">
          {!isEditing && (
            <button
              className={`plot-file-bar-initial-btn${isInitial ? " plot-file-bar-initial-btn-active" : ""}`}
              onClick={onSetInitialFile}
              title={isInitial ? "This file opens by default" : "Set as default opening file"}
              disabled={isInitial}
            >
              {isInitial ? <FaFlag /> : <FaRegFlag />}
              <span>{isInitial ? "Default File" : "Set Default"}</span>
            </button>
          )}
          {isEditing ? (
            <>
              <button className="plot-file-bar-cancel-btn" onClick={onRevert} title="Cancel editing">
                <FaUndoAlt />
                <span>Cancel</span>
              </button>
              <button className="plot-file-bar-save-btn" onClick={onSave} title="Save file (Ctrl+S)">
                <FaSave />
                <span>Save</span>
              </button>
            </>
          ) : (
            <button className="plot-file-bar-edit-btn" onClick={onEdit} title="Edit file (Ctrl+S to save)">
              <FaPencilAlt />
              <span>Edit</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
