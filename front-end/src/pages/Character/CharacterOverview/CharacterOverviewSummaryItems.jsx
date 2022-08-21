// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { TextInput } from "../../../components/TextInput/TextInput";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { CharacterOverviewSummaryItemsLogic } from "./CharacterOverviewSummaryItemsLogic";

// Context

// Services

// Styles
import "./CharacterOverviewSummaryItems.css";
import { FaTrash } from "react-icons/fa";

// Assets

export const CharacterOverviewSummaryItems = () => {
	const {
		isAuthorizedToEdit,
		character,
		changeSummaryItemLabel,
		changeSummaryItemValue,
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
						<div className='character-overview-summary-item-label'>Label</div>
						<div className='character-overview-summary-item-value'>Value</div>
					</div>
				) : (
					character.data.summaryItems.map((summaryItem, index) => (
						<div key={index} className='character-overview-summary-item'>
							<div className='character-overview-summary-item-label'>{summaryItem.label}</div>
							<div className='character-overview-summary-item-value'>{summaryItem.value}</div>
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
										label='Label'
										value={summaryItem.label}
										onChange={(e) => changeSummaryItemLabel(e, index)}
										isLightText={true}
									/>
									<TextInput
										className='character-overview-summary-item-value'
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
