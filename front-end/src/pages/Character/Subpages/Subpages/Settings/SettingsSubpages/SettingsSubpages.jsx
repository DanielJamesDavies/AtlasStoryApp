// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
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
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";
import { FaTimes } from "react-icons/fa";

// Assets

export const SettingsSubpages = () => {
	const {
		isAuthorizedToEdit,
		subpages,
		toggleEnableSubpage,
		isReorderingSubpages,
		toggleIsReorderingSubpages,
		changeSubpagesOrder,
		addCustomSubpage,
		removeCustomSubpage,
		changeCustomSubpageName,
		revertSubpages,
		saveSubpages,
		errors,
	} = SettingsSubpagesLogic();

	return (
		<ContentItem hasBg={true} size='s'>
			<LabelContainer label='Subpages' className='character-subpage-settings-subpage-container'>
				<EditableContainer
					isAuthorizedToEdit={isAuthorizedToEdit}
					onAdd={addCustomSubpage}
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
											<ContentItem hasBg={true} backgroundColour='grey3'>
												<div className='character-subpage-settings-subpages-item-name'>{subpage.name}</div>
												<ToggleInput className label value={subpage?.isEnabled} enableEdit={false} />
											</ContentItem>
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
											<ContentItem hasBg={true} backgroundColour='grey3'>
												{subpage?.isCustom ? (
													<div className='character-subpage-settings-subpages-item-name'>
														<TextInput
															value={subpage.name}
															onChange={(e) => changeCustomSubpageName(e, subpage.id)}
															seamless={true}
															autoSize={true}
														/>
													</div>
												) : (
													<div className='character-subpage-settings-subpages-item-name'>{subpage.name}</div>
												)}
												<ToggleInput
													className
													label
													value={subpage?.isEnabled}
													onToggle={() => toggleEnableSubpage(index)}
													enableEdit={!isReorderingSubpages}
												/>
												{!subpage?.isCustom ? null : (
													<IconBtn
														icon={<FaTimes />}
														iconName='times'
														seamless={true}
														size='s'
														onClick={() => removeCustomSubpage(subpage.id)}
													/>
												)}
											</ContentItem>
										</DragDropItem>
									))}
							</DragDropContainer>
						)}
						<ErrorMessage errors={errors} />
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
