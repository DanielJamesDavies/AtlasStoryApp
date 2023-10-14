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
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";

// Assets

export const Banner = () => {
	const {
		isAuthorizedToEdit,
		authorized_username,
		user,
		banner,
		addFirstBanner,
		changeBanner,
		removeBanner,
		revertBanner,
		saveBanner,
		onClickBanner,
		errors,
		firstBannerInputRef,
	} = BannerLogic();

	if ((!banner || banner === "NO_IMAGE") && authorized_username === user?.username)
		return (
			<div className='user-banner-container'>
				<FirstAddButton label='Add a Profile Banner' onClick={() => firstBannerInputRef.current.click()} />
				<input ref={firstBannerInputRef} type='file' accept='image/*' onChange={addFirstBanner} style={{ display: "none" }} />
			</div>
		);
	return (
		<EditableContainer
			className='user-banner-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRemove={removeBanner}
			onRevert={revertBanner}
			onSave={saveBanner}
		>
			<div className='user-banner lightbox-openable-image' onClick={onClickBanner}>
				{!banner || banner === "NO_IMAGE" ? null : <img src={banner} alt='' />}
			</div>
			<ImageInput className='user-banner' value={banner} onChange={changeBanner} />
			<ErrorMessage errors={errors} />
		</EditableContainer>
	);
};
