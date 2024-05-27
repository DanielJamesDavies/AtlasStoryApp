// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { OpenableComponent } from "../../../../../../../../../components/OpenableComponent/OpenableComponent";
import { IconBtn } from "../../../../../../../../../components/IconBtn/IconBtn";
import { Content } from "./Content/Content";

// Logic
import { MediaLogic } from "./MediaLogic";

// Context

// Services

// Styles
import "./Media.css";

// Assets

export const Media = () => {
	const { playerHeight, content_simple, content_images, addImageInputRef, onAddImageInputChange } = MediaLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane-content-media' style={{ "--player_height": playerHeight + "px" }}>
			<OpenableComponent className='unit-page-storyboard-editor-multi-tab-pane-content-media-section' title='Simple'>
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list'>
					{content_simple?.map((content_item, index) => (
						<Content key={index} content_item={content_item} type={content_item?.type} />
					))}
				</div>
			</OpenableComponent>
			<OpenableComponent className='unit-page-storyboard-editor-multi-tab-pane-content-media-section' title='Images'>
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-images-add-container'>
					<IconBtn
						className='unit-page-storyboard-editor-multi-tab-pane-content-media-images-add-btn'
						seamless={true}
						size='s'
						icon={<FaPlus />}
						iconName='plus'
						onClick={() => addImageInputRef.current.click()}
						label='Add Image'
						labelAlignment='left'
					/>
					<input ref={addImageInputRef} type='file' accept='image/*' onChange={onAddImageInputChange} />
				</div>
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list'>
					{content_images?.map((content_item, index) => (
						<Content key={index} content_item={content_item} type='image' />
					))}
				</div>
			</OpenableComponent>
		</div>
	);
};
