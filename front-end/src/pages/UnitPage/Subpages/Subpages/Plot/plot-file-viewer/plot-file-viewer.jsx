// Packages
import ReactMarkdown from "react-markdown";
import { FaFileAlt, FaFolderOpen } from "react-icons/fa";

// Components
import { PlotFileImage } from "./plot-file-image";

// Logic

// Context

// Services

// Styles
import "./plot-file-viewer.css";

// Assets

export const PlotFileViewer = ({ currentFile, hasFiles, isAuthorizedToEdit, onOpenBrowser }) => {
	if (!currentFile) {
		return (
			<div className='plot-file-viewer-empty-state'>
				{hasFiles ? (
					<>
						<FaFileAlt />
						<span>Select a file from the browser to start reading</span>
					</>
				) : (
					<>
						<FaFileAlt />
						<p>No plot files yet.</p>
						{isAuthorizedToEdit && (
							<button className='plot-file-viewer-empty-cta' onClick={onOpenBrowser}>
								<FaFolderOpen />
								<span>Open file browser to get started</span>
							</button>
						)}
					</>
				)}
			</div>
		);
	}

	return (
		<div className='plot-file-viewer'>
			<h1 className='plot-file-viewer-title'>{currentFile.name}</h1>
			{!currentFile.content ? (
				<p className='plot-file-viewer-empty-content'>This file has no content yet. Click Edit to start writing.</p>
			) : (
				<div className='plot-file-viewer-content'>
					<ReactMarkdown
						components={{
							img: ({ src, alt }) => <PlotFileImage src={src} alt={alt} />,
						}}
					>
						{currentFile.content}
					</ReactMarkdown>
				</div>
			)}
		</div>
	);
};
