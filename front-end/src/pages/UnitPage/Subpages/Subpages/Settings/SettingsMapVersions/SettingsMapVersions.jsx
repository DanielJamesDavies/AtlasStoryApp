// Packages
import { FaTrash } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { SettingsMapVersionsLogic } from "./SettingsMapVersionsLogic";

// Context

// Services

// Styles

// Assets

export const SettingsMapVersions = () => {
	const {
		unit_type,
		isAuthorizedToEdit,
		unit,
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
	} = SettingsMapVersionsLogic();

	if (!["location"].includes(unit_type) || !unit || !["surfaceLocation", "planet", "moon"].includes(unit?.type)) return null;
	return (
		<LabelContainer label='Map Versions' className='unit-page-subpage-settings-item unit-page-subpage-settings-versions-container'>
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
						: versions?.map((version, index) => (
								<div key={index} className='unit-page-subpage-settings-versions-item'>
									<div className='unit-page-subpage-settings-versions-item-title'>{version.title}</div>
								</div>
						  ))}
				</div>
				<div>
					{!versions ? null : (
						<DragDropContainer enableDragDrop={isReorderingVersions} onDropItem={changeVersionsOrder}>
							{versions?.map((version, index) => (
								<DragDropItem key={index} index={index} className='unit-page-subpage-settings-versions-item'>
									<TextInput
										className='unit-page-subpage-settings-versions-item-title'
										label='Version Title'
										seamless={true}
										value={version.title}
										onChange={(e) => changeVersionTitle(e, index)}
									/>
									<IconBtn
										className='unit-page-subpage-settings-versions-item-remove-btn'
										icon={<FaTrash />}
										iconName='trash'
										seamless={true}
										onClick={() => removeVersion(index)}
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
