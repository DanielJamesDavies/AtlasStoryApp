// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { BannerLogic } from "./BannerLogic";

// Context

// Services

// Styles
import "./Banner.css";

// Assets

export const Banner = () => {
	const { isAuthorizedToEdit, storyBanner, changeStoryBanner, removeStoryBanner, errors, revertStoryBanner, saveStoryBanner, onClickBanner } =
		BannerLogic();

	return (
		<EditableContainer
			className='story-banner-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRemove={removeStoryBanner}
			onRevert={revertStoryBanner}
			onSave={saveStoryBanner}
		>
			<div className='story-banner lightbox-openable-image' onClick={onClickBanner}>
				{!storyBanner ? null : <img src={storyBanner} alt='' />}
			</div>
			<ImageInput className='story-banner' value={storyBanner} onChange={changeStoryBanner} />
			<ErrorMessage errors={errors} />
		</EditableContainer>
	);
};
