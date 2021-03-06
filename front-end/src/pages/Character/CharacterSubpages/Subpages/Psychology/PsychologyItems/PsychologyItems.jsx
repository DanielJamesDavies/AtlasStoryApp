// Packages

// Components
import { PsychologyItem } from "./PsychologyItem";
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { PsychologyItemsLogic } from "./PsychologyItemsLogic";

// Context

// Services

// Styles
import "./PsychologyItems.css";

// Assets

export const PsychologyItems = () => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		changePsychologyItemTitle,
		changePsychologyItemValue,
		addPsychologyItem,
		removePsychologyItem,
		defaultPsychologyItems,
		isReorderingPsychologyItems,
		toggleIsReorderingPsychologyItems,
		reorderPsychologyItems,
		revertPsychologyItems,
		savePsychologyItems,
		errors,
		psychologyItemsRef,
		onPsychologyItemsContainerScroll,
	} = PsychologyItemsLogic();

	return (
		<EditableContainer
			className='character-subpage-psychology-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addPsychologyItem}
			onDefault={defaultPsychologyItems}
			onReorder={toggleIsReorderingPsychologyItems}
			onRevert={revertPsychologyItems}
			onSave={savePsychologyItems}
			onScroll={onPsychologyItemsContainerScroll}
		>
			<div ref={psychologyItemsRef} className='character-subpage-psychology-items'>
				{characterVersion?.psychology?.items?.map((psychologyItem, index) => (
					<div key={index} className='character-subpage-psychology-item-container'>
						<PsychologyItem index={index} psychologyItem={psychologyItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<DragDropContainer
					innerRef={psychologyItemsRef}
					className='character-subpage-psychology-items'
					enableDragDrop={isReorderingPsychologyItems}
					onDropItem={reorderPsychologyItems}
				>
					{characterVersion?.psychology?.items?.map((psychologyItem, index) => (
						<DragDropItem className='character-subpage-psychology-item-container' key={index} index={index}>
							<PsychologyItem
								index={index}
								psychologyItem={psychologyItem}
								isEditing={true}
								changePsychologyItemTitle={changePsychologyItemTitle}
								changePsychologyItemValue={changePsychologyItemValue}
								removePsychologyItem={removePsychologyItem}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
