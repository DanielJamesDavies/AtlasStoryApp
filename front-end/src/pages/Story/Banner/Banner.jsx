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
	const { isAuthorizedToEdit, banner, changeStoryBanner, errors, revertStoryBanner, saveStoryBanner } = BannerLogic();

	return (
		<EditableContainer
			className='story-banner-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertStoryBanner}
			onSave={saveStoryBanner}
		>
			<div className='story-banner'>{!banner ? null : <img src={banner} alt='' />}</div>
			<ImageInput className='story-banner' value={banner} onChange={changeStoryBanner} />
			<ErrorMessage errors={errors} />
		</EditableContainer>
	);
};
