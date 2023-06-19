// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic
import { GroupProfileSummaryItemsLogic } from "./SummaryItemsLogic";

// Context

// Services

// Styles
import "./SummaryItems.css";

// Assets

export const GroupProfileSummaryItems = () => {
	const {
		isAuthorizedToEdit,
		group,
		changeSummaryItemLabel,
		changeSummaryItemText,
		removeSummaryItem,
		addSummaryItem,
		isReorderingSummaryItems,
		toggleIsReorderingSummaryItems,
		changeSummaryItemsOrder,
		revertSummaryItems,
		saveSummaryItems,
	} = GroupProfileSummaryItemsLogic();

	return (
		<EditableContainer
			className='group-profile-summary-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addSummaryItem}
			onReorder={toggleIsReorderingSummaryItems}
			onRevert={revertSummaryItems}
			onSave={saveSummaryItems}
		>
			<div className='group-profile-summary-items'>
				{!group?.data?.summaryItems ? null : group.data.summaryItems.length === 0 && isAuthorizedToEdit ? (
					<div className='group-profile-summary-item group-profile-summary-item-placeholder'>
						<div className='group-profile-summary-item-label'>Title</div>
						<div className='group-profile-summary-item-text'>Content</div>
					</div>
				) : (
					group.data.summaryItems.map((summaryItem, index) => (
						<div key={index} className='group-profile-summary-item'>
							<div className='group-profile-summary-item-label'>{summaryItem.label}</div>
							<div className='group-profile-summary-item-text'>{summaryItem.text}</div>
						</div>
					))
				)}
			</div>
			<DragDropContainer
				className='group-profile-summary-items'
				enableDragDrop={isReorderingSummaryItems}
				onDropItem={changeSummaryItemsOrder}
			>
				{!group?.data?.summaryItems
					? null
					: group.data.summaryItems.map((summaryItem, index) => (
							<DragDropItem key={index} index={index} className='group-profile-summary-item'>
								<div className='group-profile-summary-item-content'>
									<TextInput
										className='group-profile-summary-item-label'
										seamless={true}
										label='Title'
										value={summaryItem.label}
										onChange={(e) => changeSummaryItemLabel(e, index)}
										isLightText={true}
										aiTools={true}
									/>
									<TextInput
										className='group-profile-summary-item-value'
										seamless={true}
										label='Content'
										value={summaryItem.text}
										onChange={(e) => changeSummaryItemText(e, index)}
										isLightText={true}
										aiTools={true}
									/>
								</div>
								<IconBtn
									icon={<FaTimes />}
									iconName='times'
									seamless={true}
									size='s'
									onClick={() => removeSummaryItem(index)}
									isLight={true}
								/>
							</DragDropItem>
					  ))}
			</DragDropContainer>
		</EditableContainer>
	);
};
