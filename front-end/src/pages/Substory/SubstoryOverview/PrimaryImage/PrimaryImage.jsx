// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../components/ImageInput/ImageInput";

// Logic
import { SubstoryOverviewPrimaryImageLogic } from "./PrimaryImageLogic";

// Context

// Services

// Styles
import "./PrimaryImage.css";

// Assets

export const SubstoryOverviewPrimaryImage = () => {
	const { isAuthorizedToEdit, substoryPrimaryImage, changePrimaryImage, revertPrimaryImage, savePrimaryImage } =
		SubstoryOverviewPrimaryImageLogic();

	if (!isAuthorizedToEdit && (!substoryPrimaryImage || substoryPrimaryImage === "NO_IMAGE")) return null;
	return (
		<EditableContainer
			className={
				!substoryPrimaryImage || substoryPrimaryImage === "NO_IMAGE"
					? "substory-overview-primary-image-container substory-overview-primary-image-container-no-image"
					: "substory-overview-primary-image-container"
			}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPrimaryImage}
			onSave={savePrimaryImage}
		>
			<div className='substory-overview-primary-image'>
				{!substoryPrimaryImage || substoryPrimaryImage === "NO_IMAGE" ? null : <img src={substoryPrimaryImage} alt='' />}
			</div>
			<div className='substory-overview-primary-image'>
				<ImageInput value={substoryPrimaryImage} onChange={changePrimaryImage} />
			</div>
		</EditableContainer>
	);
};
