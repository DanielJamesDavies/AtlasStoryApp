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
	const { isAuthorizedToEdit, banner, changeBanner, revertBanner, saveBanner, onClickBanner, errors } = BannerLogic();

	return (
		<EditableContainer
			className='user-banner-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertBanner}
			onSave={saveBanner}
		>
			<div className='user-banner lightbox-openable-image' onClick={onClickBanner}>
				{!banner ? null : <img src={banner} alt='' />}
			</div>
			<ImageInput className='user-banner' value={banner} onChange={changeBanner} />
			<ErrorMessage errors={errors} />
		</EditableContainer>
	);
};
