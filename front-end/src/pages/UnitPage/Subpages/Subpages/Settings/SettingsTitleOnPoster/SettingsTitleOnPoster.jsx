// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { ToggleInput } from "../../../../../../components/ToggleInput/ToggleInput";

// Logic
import { SettingsTitleOnPosterLogic } from "./SettingsTitleOnPosterLogic";

// Context

// Services

// Styles

// Assets

export const SettingsTitleOnPoster = () => {
	const { unit_type, isAuthorizedToEdit, unit, toggleIsTitleOnPoster, revertIsTitleOnPoster, saveIsTitleOnPoster, errors } =
		SettingsTitleOnPosterLogic();

	if (!["plot"].includes(unit_type)) return null;
	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Include Title on Poster' isInline={true}>
				<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertIsTitleOnPoster} onSave={saveIsTitleOnPoster}>
					<div>
						<ToggleInput value={unit?.data?.isTitleOnPoster} onToggle={toggleIsTitleOnPoster} enableEdit={false} />
					</div>
					<div>
						<ToggleInput value={unit?.data?.isTitleOnPoster} onToggle={toggleIsTitleOnPoster} enableEdit={true} />
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
