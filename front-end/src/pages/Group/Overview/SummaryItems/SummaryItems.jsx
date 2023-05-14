// Packages
import { FaTrash } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { GroupOverviewSummaryItemsLogic } from "./SummaryItemsLogic";

// Context

// Services

// Styles
import "./SummaryItems.css";

// Assets

export const GroupOverviewSummaryItems = () => {
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
	} = GroupOverviewSummaryItemsLogic();

	return (
		<EditableContainer
			className='group-overview-summary-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addSummaryItem}
			onReorder={toggleIsReorderingSummaryItems}
			onRevert={revertSummaryItems}
			onSave={saveSummaryItems}
		>
			<div className='group-overview-summary-items'>
				{!group?.data?.summaryItems ? null : group.data.summaryItems.length === 0 && isAuthorizedToEdit ? (
					<div className='group-overview-summary-item group-overview-summary-item-placeholder'>
						<div className='group-overview-summary-item-label'>Label</div>
						<div className='group-overview-summary-item-text'>Text</div>
					</div>
				) : (
					group.data.summaryItems.map((summaryItem, index) => (
						<div key={index} className='group-overview-summary-item'>
							<div className='group-overview-summary-item-label'>{summaryItem.label}</div>
							<div className='group-overview-summary-item-text'>{summaryItem.text}</div>
						</div>
					))
				)}
			</div>
			<DragDropContainer
				className='group-overview-summary-items'
				enableDragDrop={isReorderingSummaryItems}
				onDropItem={changeSummaryItemsOrder}
			>
				{!group?.data?.summaryItems
					? null
					: group.data.summaryItems.map((summaryItem, index) => (
							<DragDropItem key={index} index={index} className='group-overview-summary-item'>
								<div className='group-overview-summary-item-content'>
									<TextInput
										className='group-overview-summary-item-label'
										seamless={true}
										label='Label'
										value={summaryItem.label}
										onChange={(e) => changeSummaryItemLabel(e, index)}
										isLightText={true}
										aiTools={true}
									/>
									<TextInput
										className='group-overview-summary-item-value'
										seamless={true}
										label='Text'
										value={summaryItem.text}
										onChange={(e) => changeSummaryItemText(e, index)}
										isLightText={true}
										aiTools={true}
									/>
								</div>
								<IconBtn
									icon={<FaTrash />}
									iconName='trash'
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
