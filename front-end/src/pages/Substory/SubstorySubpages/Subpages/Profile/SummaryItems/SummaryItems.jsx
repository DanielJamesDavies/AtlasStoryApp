// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic
import { SubstoryProfileSummaryItemsLogic } from "./SummaryItemsLogic";

// Context

// Services

// Styles
import "./SummaryItems.css";

// Assets

export const SubstoryProfileSummaryItems = () => {
	const {
		isAuthorizedToEdit,
		substory,
		changeSummaryItemLabel,
		changeSummaryItemText,
		removeSummaryItem,
		addSummaryItem,
		isReorderingSummaryItems,
		toggleIsReorderingSummaryItems,
		changeSummaryItemsOrder,
		revertSummaryItems,
		saveSummaryItems,
	} = SubstoryProfileSummaryItemsLogic();

	return (
		<EditableContainer
			className='substory-profile-summary-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addSummaryItem}
			onReorder={toggleIsReorderingSummaryItems}
			onRevert={revertSummaryItems}
			onSave={saveSummaryItems}
		>
			<div className='substory-profile-summary-items'>
				{!substory?.data?.summaryItems ? null : substory.data.summaryItems.length === 0 && isAuthorizedToEdit ? (
					<div className='substory-profile-summary-item substory-profile-summary-item-placeholder'>
						<div className='substory-profile-summary-item-label'>Title</div>
						<div className='substory-profile-summary-item-text'>Content</div>
					</div>
				) : (
					substory.data.summaryItems.map((summaryItem, index) => (
						<div key={index} className='substory-profile-summary-item'>
							<div className='substory-profile-summary-item-label'>{summaryItem.label}</div>
							<div className='substory-profile-summary-item-text'>{summaryItem.text}</div>
						</div>
					))
				)}
			</div>
			<DragDropContainer
				className='substory-profile-summary-items'
				enableDragDrop={isReorderingSummaryItems}
				onDropItem={changeSummaryItemsOrder}
			>
				{!substory?.data?.summaryItems
					? null
					: substory.data.summaryItems.map((summaryItem, index) => (
							<DragDropItem key={index} index={index} className='substory-profile-summary-item'>
								<div className='substory-profile-summary-item-content'>
									<TextInput
										className='substory-profile-summary-item-label'
										seamless={true}
										label='Title'
										value={summaryItem.label}
										onChange={(e) => changeSummaryItemLabel(e, index)}
										isLightText={true}
										aiTools={true}
									/>
									<TextInput
										className='substory-profile-summary-item-value'
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
