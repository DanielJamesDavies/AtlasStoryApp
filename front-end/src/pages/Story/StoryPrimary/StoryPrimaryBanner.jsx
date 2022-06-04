// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../components/ImageInput/ImageInput";

// Logic
import { StoryPrimaryBannerLogic } from "./StoryPrimaryBannerLogic";

// Context

// Services

// Styles
import "./StoryPrimaryBanner.css";

// Assets

export const StoryPrimaryBanner = () => {
	const { isAuthorizedToEdit, banner, changeStoryBanner, revertStoryBanner, saveStoryBanner } = StoryPrimaryBannerLogic();

	return (
		<EditableContainer
			className='story-primary-banner-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertStoryBanner}
			onSave={saveStoryBanner}
		>
			<div className='story-primary-banner'>{!banner ? null : <img src={banner} alt='' />}</div>
			<ImageInput className='story-primary-banner' value={banner} onChange={changeStoryBanner} />
		</EditableContainer>
	);
};
