// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { ToggleInput } from "../../../../../../components/ToggleInput/ToggleInput";

// Logic
import { SettingsStoryTitleInTitleLogic } from "./SettingsStoryTitleInTitleLogic";

// Context

// Services

// Styles

// Assets

export const SettingsStoryTitleInTitle = () => {
	const { unit_type, isAuthorizedToEdit, unit, toggleIsStoryTitleInTitle, revertIsStoryTitleInTitle, saveIsStoryTitleInTitle, errors } =
		SettingsStoryTitleInTitleLogic();

	if (!["plot"].includes(unit_type)) return null;
	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Include Story Title in Title' isInline={true}>
				<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertIsStoryTitleInTitle} onSave={saveIsStoryTitleInTitle}>
					<div>
						<ToggleInput value={unit?.data?.isStoryTitleInTitle} onToggle={toggleIsStoryTitleInTitle} enableEdit={false} />
					</div>
					<div>
						<ToggleInput value={unit?.data?.isStoryTitleInTitle} onToggle={toggleIsStoryTitleInTitle} enableEdit={true} />
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
