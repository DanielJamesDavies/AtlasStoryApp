// Packages

// Components
import { OpenableComponent } from "../../../../../../../../../components/OpenableComponent/OpenableComponent";
import { Content } from "./Content/Content";

// Logic
import { MediaLogic } from "./MediaLogic";

// Context

// Services

// Styles
import "./Media.css";

// Assets

export const Media = () => {
	const { playerHeight, content_simple, content_images, content_music } = MediaLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane-content-media' style={{ "--player_height": playerHeight + "px" }}>
			<OpenableComponent className='unit-page-storyboard-editor-multi-tab-pane-content-media-section' title='Simple'>
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list'>
					{content_simple?.map((content_item, index) => (
						<Content key={index} content_item={content_item} />
					))}
				</div>
			</OpenableComponent>
			<OpenableComponent className='unit-page-storyboard-editor-multi-tab-pane-content-media-section' title='Images'>
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list'>
					{content_images?.map((content_item, index) => (
						<Content key={index} content_item={content_item} />
					))}
				</div>
			</OpenableComponent>
			<OpenableComponent className='unit-page-storyboard-editor-multi-tab-pane-content-media-section' title='Music'>
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list'>
					{content_music?.map((content_item, index) => (
						<Content key={index} content_item={content_item} />
					))}
				</div>
			</OpenableComponent>
		</div>
	);
};
