// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../components/ImageInput/ImageInput";

// Logic
import { PrimaryImageLogic } from "./PrimaryImageLogic";

// Context

// Services

// Styles
import "./PrimaryImage.css";

// Assets

export const PrimaryImage = () => {
	const { isAuthorizedToEdit, unitVersion, unitPrimaryImages, onPrimaryImageClick, changePrimaryImage, revertPrimaryImage, savePrimaryImage } =
		PrimaryImageLogic();

	if (
		!isAuthorizedToEdit &&
		(!unitPrimaryImages.find((e) => e?._id === unitVersion?._id)?.image?.image ||
			unitPrimaryImages.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE")
	)
		return null;
	return (
		<EditableContainer
			className={
				!unitPrimaryImages.find((e) => e?._id === unitVersion?._id)?.image?.image ||
				unitPrimaryImages.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE"
					? "unit-page-overview-primary-image-container unit-page-overview-primary-image-container-no-image"
					: "unit-page-overview-primary-image-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPrimaryImage}
			onSave={savePrimaryImage}
		>
			<div className='unit-page-overview-primary-image'>
				{!unitPrimaryImages.find((e) => e?._id === unitVersion?._id)?.image?.image ||
				unitPrimaryImages.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
					<img
						className='lightbox-openable-image'
						src={unitPrimaryImages.find((e) => e?._id === unitVersion?._id)?.image?.image}
						alt=''
						onClick={() => onPrimaryImageClick()}
					/>
				)}
			</div>
			<div className='unit-page-overview-primary-image'>
				<ImageInput value={unitPrimaryImages.find((e) => e?._id === unitVersion?._id)?.image?.image} onChange={changePrimaryImage} />
			</div>
		</EditableContainer>
	);
};
