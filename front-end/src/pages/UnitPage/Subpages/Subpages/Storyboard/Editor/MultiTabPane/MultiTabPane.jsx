// Packages

// Components
import { Tabs } from "./Tabs/Tabs";

// Logic
import { MultiTabPaneLogic } from "./MultiTabPaneLogic";

// Context

// Services

// Styles
import "./MultiTabPane.css";

// Assets

export const MultiTabPane = () => {
	const { content } = MultiTabPaneLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane'>
			<Tabs />
			<div className='unit-page-storyboard-editor-multi-tab-pane-content'>{content}</div>
		</div>
	);
};
