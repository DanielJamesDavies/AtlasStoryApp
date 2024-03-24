// Packages

// Components
import { TopBar } from "./TopBar/TopBar";
import { MultiTabPane } from "./MultiTabPane/MultiTabPane";
import { Player } from "../Player/Player";
import { Layers } from "./Layers/Layers";

// Logic
import { EditorLogic } from "./EditorLogic";

// Context

// Services

// Styles
import "./Editor.css";

// Assets

export const Editor = () => {
	const { isAuthorizedToEdit, isEditingStoryboard, onScroll } = EditorLogic();

	if (!isAuthorizedToEdit || !isEditingStoryboard) return null;
	return (
		<div className='unit-page-storyboard-editor-container' onScroll={onScroll} onWheel={onScroll}>
			<TopBar />
			<div className='unit-page-storyboard-editor-section-1-container'>
				<MultiTabPane />
				<div className='unit-page-storyboard-editor-player-container'>
					<Player isEditorPlayer={true} />
				</div>
			</div>
			<div className='unit-page-storyboard-editor-section-2-container'>
				<Layers />
			</div>
		</div>
	);
};
