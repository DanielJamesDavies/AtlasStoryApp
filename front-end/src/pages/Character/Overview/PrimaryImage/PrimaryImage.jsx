// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../components/ImageInput/ImageInput";

// Logic
import { CharacterOverviewPrimaryImageLogic } from "./PrimaryImageLogic";

// Context

// Services

// Styles
import "./PrimaryImage.css";

// Assets

export const CharacterOverviewPrimaryImage = () => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		characterPrimaryImages,
		onPrimaryImageClick,
		changePrimaryImage,
		revertPrimaryImage,
		savePrimaryImage,
	} = CharacterOverviewPrimaryImageLogic();

	if (
		!isAuthorizedToEdit &&
		(!characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image ||
			characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE")
	)
		return null;
	return (
		<EditableContainer
			className={
				!characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image ||
				characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE"
					? "character-overview-primary-image-container character-overview-primary-image-container-no-image"
					: "character-overview-primary-image-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPrimaryImage}
			onSave={savePrimaryImage}
		>
			<div className='character-overview-primary-image'>
				{!characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image ||
				characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
					<img
						className='lightbox-openable-image'
						src={characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image}
						alt=''
						onClick={() => onPrimaryImageClick()}
					/>
				)}
			</div>
			<div className='character-overview-primary-image'>
				<ImageInput
					value={characterPrimaryImages.find((e) => e?._id === characterVersion?._id)?.image?.image}
					onChange={changePrimaryImage}
				/>
			</div>
		</EditableContainer>
	);
};
