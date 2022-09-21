// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ToggleInput } from "../../../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsSubpagesLogic } from "./SettingsSubpagesLogic";

// Context

// Services

// Styles
import "./SettingsSubpages.css";

// Assets

export const SettingsSubpages = () => {
	const {
		isAuthorizedToEdit,
		subpages,
		toggleEnableSubpage,
		isReorderingSubpages,
		toggleIsReorderingSubpages,
		changeSubpagesOrder,
		revertSubpages,
		saveSubpages,
		errors,
	} = SettingsSubpagesLogic();

	return (
		<LabelContainer label='Subpages' className='character-subpage-settings-versions-container'>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onReorder={toggleIsReorderingSubpages}
				onRevert={revertSubpages}
				onSave={saveSubpages}
			>
				<div>
					{!subpages
						? null
						: subpages
								.filter((e) => e.id !== "settings")
								.map((subpage, index) => (
									<div key={index} className='character-subpage-settings-subpages-item'>
										<div className='character-subpage-settings-subpages-item-name'>{subpage.name}</div>
										<ToggleInput className label value={subpage?.isEnabled} enableEdit={false} />
									</div>
								))}
				</div>
				<div>
					{!subpages ? null : (
						<DragDropContainer enableDragDrop={isReorderingSubpages} onDropItem={changeSubpagesOrder}>
							{subpages
								.filter((e) => e.id !== "settings")
								.map((subpage, index) => (
									<DragDropItem key={index} index={index} className='character-subpage-settings-subpages-item'>
										<div className='character-subpage-settings-subpages-item-name'>{subpage.name}</div>
										<ToggleInput
											className
											label
											value={subpage?.isEnabled}
											onToggle={() => toggleEnableSubpage(index)}
											enableEdit={!isReorderingSubpages}
										/>
									</DragDropItem>
								))}
						</DragDropContainer>
					)}
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
