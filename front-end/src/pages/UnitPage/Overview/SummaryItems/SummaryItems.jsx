// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { SummaryItemsLogic } from "./SummaryItemsLogic";

// Context

// Services

// Styles
import "./SummaryItems.css";

// Assets

export const SummaryItems = () => {
	const {
		isAuthorizedToEdit,
		unit,
		changeSummaryItemLabel,
		changeSummaryItemText,
		removeSummaryItem,
		addSummaryItem,
		isReorderingSummaryItems,
		toggleIsReorderingSummaryItems,
		changeSummaryItemsOrder,
		revertSummaryItems,
		saveSummaryItems,
	} = SummaryItemsLogic();

	return (
		<EditableContainer
			className='unit-page-overview-summary-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addSummaryItem}
			onReorder={toggleIsReorderingSummaryItems}
			onRevert={revertSummaryItems}
			onSave={saveSummaryItems}
		>
			<div className='unit-page-overview-summary-items'>
				{!unit?.data?.summaryItems ? null : unit.data.summaryItems.length === 0 && isAuthorizedToEdit ? (
					<div className='unit-page-overview-summary-item unit-page-overview-summary-item-placeholder'>
						<div className='unit-page-overview-summary-item-label'>Title</div>
						<div className='unit-page-overview-summary-item-text'>Content</div>
					</div>
				) : (
					unit.data.summaryItems.map((summaryItem, index) => (
						<div key={index} className='unit-page-overview-summary-item'>
							<div className='unit-page-overview-summary-item-label'>{summaryItem.label}</div>
							<div className='unit-page-overview-summary-item-text'>{summaryItem.text}</div>
						</div>
					))
				)}
			</div>
			<DragDropContainer
				className='unit-page-overview-summary-items'
				enableDragDrop={isReorderingSummaryItems}
				onDropItem={changeSummaryItemsOrder}
			>
				{!unit?.data?.summaryItems
					? null
					: unit.data.summaryItems.map((summaryItem, index) => (
							<DragDropItem key={index} index={index} className='unit-page-overview-summary-item'>
								<div className='unit-page-overview-summary-item-content'>
									<TextInput
										className='unit-page-overview-summary-item-label'
										seamless={true}
										label='Title'
										value={summaryItem.label}
										onChange={(e) => changeSummaryItemLabel(e, index)}
										isLightText={true}
										aiTools={true}
									/>
									<TextInput
										className='unit-page-overview-summary-item-value'
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
