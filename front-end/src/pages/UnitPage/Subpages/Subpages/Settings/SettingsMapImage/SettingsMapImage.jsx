// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsMapImageLogic } from "./SettingsMapImageLogic";

// Context

// Services

// Styles
import "./SettingsMapImage.css";

// Assets

export const SettingsMapImage = () => {
	const { unit_type, isAuthorizedToEdit, locationMapImage, changeMapImage, removeMapImage, revertMapImage, saveMapImage, errors } =
		SettingsMapImageLogic();

	if (!["location"].includes(unit_type)) return null;
	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer className='unit-page-subpage-settings-map-image-container' label='Map Image'>
				<EditableContainer
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRemove={removeMapImage}
					onRevert={revertMapImage}
					onSave={saveMapImage}
				>
					<div className='unit-page-subpage-settings-map-image-image'>
						{!locationMapImage || locationMapImage === "NO_IMAGE" ? null : <img src={locationMapImage} alt='' />}
					</div>
					<div>
						<div
							className={
								"unit-page-subpage-settings-map-image-image" +
								(!locationMapImage || locationMapImage === "NO_IMAGE" ? " unit-page-subpage-settings-map-image-image-no-image" : "")
							}
						>
							<ImageInput value={locationMapImage} onChange={changeMapImage} />
						</div>
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
