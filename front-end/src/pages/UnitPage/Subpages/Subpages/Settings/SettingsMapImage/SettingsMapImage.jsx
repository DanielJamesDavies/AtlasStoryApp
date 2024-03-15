// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { DropdownContainer } from "../../../../../../components/DropdownContainer/DropdownContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsMapImageLogic } from "./SettingsMapImageLogic";

// Context

// Services

// Styles
import "./SettingsMapImage.css";

// Assets

export const SettingsMapImage = () => {
	const {
		unit_type,
		isAuthorizedToEdit,
		unit,
		mapVersion,
		changeMapVersion,
		mapVersionImage,
		changeMapImage,
		removeMapImage,
		revertMapImage,
		saveMapImage,
		errors,
	} = SettingsMapImageLogic();

	if (
		!["location"].includes(unit_type) ||
		!unit ||
		!["surfaceLocation", "planet", "moon"].includes(unit?.type) ||
		!mapVersion ||
		mapVersion === ""
	)
		return null;
	return (
		<LabelContainer className='unit-page-subpage-settings-item unit-page-subpage-settings-map-image-container' label='Map Images'>
			<div className='unit-page-subpage-settings-map-image-select-version-container'>
				<div className='unit-page-subpage-settings-map-image-select-version-label'>Map Version: </div>
				<DropdownContainer
					value={unit?.data?.mapVersions.find((e) => e?._id === mapVersion)?.title}
					onChange={changeMapVersion}
					includeUnselectedOption={false}
				>
					{unit?.data?.mapVersions?.map((version, index) => (
						<div key={index}>{version?.title}</div>
					))}
				</DropdownContainer>
			</div>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRemove={removeMapImage} onRevert={revertMapImage} onSave={saveMapImage}>
				<div className='unit-page-subpage-settings-map-image-image'>
					{!mapVersionImage || mapVersionImage === "NO_IMAGE" ? null : <img src={mapVersionImage} alt='' />}
				</div>
				<div>
					<div
						className={
							"unit-page-subpage-settings-map-image-image" +
							(!mapVersionImage || mapVersionImage === "NO_IMAGE" ? " unit-page-subpage-settings-map-image-image-no-image" : "")
						}
					>
						<ImageInput value={mapVersionImage} onChange={changeMapImage} />
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
