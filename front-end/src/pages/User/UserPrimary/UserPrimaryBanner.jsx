// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../components/ImageInput/ImageInput";

// Logic
import { UserPrimaryBannerLogic } from "./UserPrimaryBannerLogic";

// Context

// Services

// Styles
import "./UserPrimaryBanner.css";

// Assets

export const UserPrimaryBanner = () => {
	const { isAuthorizedToEdit, banner, changeBanner, revertBanner, saveBanner } = UserPrimaryBannerLogic();

	return (
		<EditableContainer
			className='user-primary-banner-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertBanner}
			onSave={saveBanner}
		>
			<div className='user-primary-banner'>{!banner ? null : <img src={banner} alt='' />}</div>
			<ImageInput className='user-primary-banner' value={banner} onChange={changeBanner} />
		</EditableContainer>
	);
};
