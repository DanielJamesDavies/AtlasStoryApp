// Packages
import { FaTrash } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsVersionsLogic } from "./SettingsVersionsLogic";

// Context

// Services

// Styles
import "./SettingsVersions.css";

// Assets

export const SettingsVersions = () => {
	const {
		isAuthorizedToEdit,
		versions,
		addVersion,
		removeVersion,
		isReorderingVersions,
		toggleIsReorderingVersions,
		changeVersionsOrder,
		changeVersionTitle,
		revertVersions,
		saveVersions,
		errors,
	} = SettingsVersionsLogic();

	return (
		<LabelContainer label='Versions' className='character-subpage-settings-versions-container'>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addVersion}
				onReorder={toggleIsReorderingVersions}
				onRevert={revertVersions}
				onSave={saveVersions}
			>
				<div>
					{!versions
						? null
						: versions.map((version, index) => (
								<div key={index} className='character-subpage-settings-versions-item'>
									<ContentItem>
										<div className='character-subpage-settings-versions-item-title'>{version.title}</div>
									</ContentItem>
								</div>
						  ))}
				</div>
				<div>
					{!versions ? null : (
						<DragDropContainer enableDragDrop={isReorderingVersions} onDropItem={changeVersionsOrder}>
							{versions.map((version, index) => (
								<DragDropItem key={index} index={index} className='character-subpage-settings-versions-item'>
									<ContentItem>
										<TextInput
											className='character-subpage-settings-versions-item-title'
											label='Version Title'
											seamless={true}
											value={version.title}
											onChange={(e) => changeVersionTitle(e, index)}
										/>
										<IconBtn
											className='character-subpage-settings-versions-item-remove-btn'
											icon={<FaTrash />}
											iconName='trash'
											seamless={true}
											onClick={() => removeVersion(index)}
										/>
									</ContentItem>
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
