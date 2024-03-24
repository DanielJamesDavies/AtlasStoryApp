// Packages

// Components

// Logic
import { TabsLogic } from "./TabsLogic";

// Context

// Services

// Styles
import "./Tabs.css";

// Assets

export const Tabs = () => {
	const { openMultiTabPane, setOpenMultiTabPane, openPieceID } = TabsLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane-tabs'>
			<button
				className={
					"unit-page-storyboard-editor-multi-tab-pane-tab" +
					(openMultiTabPane === "media" ? " unit-page-storyboard-editor-multi-tab-pane-tab-active" : "")
				}
				onClick={() => setOpenMultiTabPane("media")}
			>
				Media
			</button>
			{openPieceID === false ? null : (
				<button
					className={
						"unit-page-storyboard-editor-multi-tab-pane-tab" +
						(openMultiTabPane === "details" ? " unit-page-storyboard-editor-multi-tab-pane-tab-active" : "")
					}
					onClick={() => setOpenMultiTabPane("details")}
				>
					Details
				</button>
			)}
		</div>
	);
};
