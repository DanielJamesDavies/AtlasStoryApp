// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsPosterBackgroundImageLogic } from "./SettingsPosterBackgroundImageLogic";

// Context

// Services

// Styles
import "./SettingsPosterBackgroundImage.css";

// Assets

export const SettingsPosterBackgroundImage = () => {
	const {
		unit_type,
		isAuthorizedToEdit,
		plotPosterBackground,
		changePosterBackground,
		removePosterBackground,
		revertPosterBackground,
		savePosterBackground,
		errors,
	} = SettingsPosterBackgroundImageLogic();

	if (!["plot"].includes(unit_type)) return null;
	return (
		<LabelContainer
			className='unit-page-subpage-settings-item unit-page-subpage-settings-poster-background-container'
			label='Poster Background Image'
		>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRemove={removePosterBackground}
				onRevert={revertPosterBackground}
				onSave={savePosterBackground}
			>
				<div className='unit-page-subpage-settings-poster-background-image'>
					<img src={plotPosterBackground} alt='' />
				</div>
				<div>
					<div className='unit-page-subpage-settings-poster-background-image'>
						<ImageInput value={plotPosterBackground} onChange={changePosterBackground} />
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
