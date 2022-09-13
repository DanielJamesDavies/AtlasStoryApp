// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../components/TextInput/TextInput";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { SubstoryOverviewSummaryItemsLogic } from "./SubstoryOverviewSummaryItemsLogic";

// Context

// Services

// Styles
import "./SubstoryOverviewSummaryItems.css";
import { FaTrash } from "react-icons/fa";

// Assets

export const SubstoryOverviewSummaryItems = () => {
	const {
		isAuthorizedToEdit,
		substory,
		changeSummaryItemLabel,
		changeSummaryItemValue,
		removeSummaryItem,
		addSummaryItem,
		isReorderingSummaryItems,
		toggleIsReorderingSummaryItems,
		changeSummaryItemsOrder,
		revertSummaryItems,
		saveSummaryItems,
	} = SubstoryOverviewSummaryItemsLogic();

	return (
		<EditableContainer
			className='substory-overview-summary-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addSummaryItem}
			onReorder={toggleIsReorderingSummaryItems}
			onRevert={revertSummaryItems}
			onSave={saveSummaryItems}
		>
			<div className='substory-overview-summary-items'>
				{!substory?.data?.summaryItems ? null : substory.data.summaryItems.length === 0 && isAuthorizedToEdit ? (
					<div className='substory-overview-summary-item substory-overview-summary-item-placeholder'>
						<div className='substory-overview-summary-item-label'>Label</div>
						<div className='substory-overview-summary-item-value'>Value</div>
					</div>
				) : (
					substory.data.summaryItems.map((summaryItem, index) => (
						<div key={index} className='substory-overview-summary-item'>
							<div className='substory-overview-summary-item-label'>{summaryItem.label}</div>
							<div className='substory-overview-summary-item-value'>{summaryItem.value}</div>
						</div>
					))
				)}
			</div>
			<DragDropContainer
				className='substory-overview-summary-items'
				enableDragDrop={isReorderingSummaryItems}
				onDropItem={changeSummaryItemsOrder}
			>
				{!substory?.data?.summaryItems
					? null
					: substory.data.summaryItems.map((summaryItem, index) => (
							<DragDropItem key={index} index={index} className='substory-overview-summary-item'>
								<div className='substory-overview-summary-item-content'>
									<TextInput
										className='substory-overview-summary-item-label'
										seamless={true}
										label='Label'
										value={summaryItem.label}
										onChange={(e) => changeSummaryItemLabel(e, index)}
										isLightText={true}
									/>
									<TextInput
										className='substory-overview-summary-item-value'
										seamless={true}
										label='Value'
										value={summaryItem.value}
										onChange={(e) => changeSummaryItemValue(e, index)}
										isLightText={true}
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
