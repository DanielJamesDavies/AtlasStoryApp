// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsOverviewBackgroundImageLogic } from "./SettingsOverviewBackgroundImageLogic";

// Context

// Services

// Styles
import "./SettingsOverviewBackgroundImage.css";

// Assets

export const SettingsOverviewBackgroundImage = () => {
	const {
		isAuthorizedToEdit,
		unitOverviewBackground,
		changeOverviewBackground,
		removeOverviewBackground,
		revertOverviewBackground,
		saveOverviewBackground,
		errors,
	} = SettingsOverviewBackgroundImageLogic();

	return (
		<LabelContainer
			className='unit-page-subpage-settings-item unit-page-subpage-settings-overview-background-container'
			label='Overview Background Image'
		>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRemove={removeOverviewBackground}
				onRevert={revertOverviewBackground}
				onSave={saveOverviewBackground}
			>
				<div className='unit-page-subpage-settings-overview-background-image'>
					{!unitOverviewBackground || unitOverviewBackground === "NO_IMAGE" ? null : <img src={unitOverviewBackground} alt='' />}
				</div>
				<div>
					<div className='unit-page-subpage-settings-overview-background-image'>
						<ImageInput value={unitOverviewBackground} onChange={changeOverviewBackground} />
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
