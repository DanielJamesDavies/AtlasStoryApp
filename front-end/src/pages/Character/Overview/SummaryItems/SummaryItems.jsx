// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { CharacterOverviewSummaryItemsLogic } from "./SummaryItemsLogic";

// Context

// Services

// Styles
import "./SummaryItems.css";

// Assets

export const CharacterOverviewSummaryItems = () => {
	const {
		isAuthorizedToEdit,
		character,
		changeSummaryItemLabel,
		changeSummaryItemText,
		removeSummaryItem,
		addSummaryItem,
		isReorderingSummaryItems,
		toggleIsReorderingSummaryItems,
		changeSummaryItemsOrder,
		revertSummaryItems,
		saveSummaryItems,
	} = CharacterOverviewSummaryItemsLogic();

	return (
		<EditableContainer
			className='character-overview-summary-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addSummaryItem}
			onReorder={toggleIsReorderingSummaryItems}
			onRevert={revertSummaryItems}
			onSave={saveSummaryItems}
		>
			<div className='character-overview-summary-items'>
				{!character?.data?.summaryItems ? null : character.data.summaryItems.length === 0 && isAuthorizedToEdit ? (
					<div className='character-overview-summary-item character-overview-summary-item-placeholder'>
						<div className='character-overview-summary-item-label'>Title</div>
						<div className='character-overview-summary-item-text'>Content</div>
					</div>
				) : (
					character.data.summaryItems.map((summaryItem, index) => (
						<div key={index} className='character-overview-summary-item'>
							<div className='character-overview-summary-item-label'>{summaryItem.label}</div>
							<div className='character-overview-summary-item-text'>{summaryItem.text}</div>
						</div>
					))
				)}
			</div>
			<DragDropContainer
				className='character-overview-summary-items'
				enableDragDrop={isReorderingSummaryItems}
				onDropItem={changeSummaryItemsOrder}
			>
				{!character?.data?.summaryItems
					? null
					: character.data.summaryItems.map((summaryItem, index) => (
							<DragDropItem key={index} index={index} className='character-overview-summary-item'>
								<div className='character-overview-summary-item-content'>
									<TextInput
										className='character-overview-summary-item-label'
										seamless={true}
										label='Title'
										value={summaryItem.label}
										onChange={(e) => changeSummaryItemLabel(e, index)}
										isLightText={true}
										aiTools={true}
									/>
									<TextInput
										className='character-overview-summary-item-value'
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
