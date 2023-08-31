// Packages

// Components
import { MiscellaneousItem } from "./MiscellaneousItem/MiscellaneousItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { MiscellaneousLogic } from "./MiscellaneousLogic";

// Context

// Services

// Styles
import "./Miscellaneous.css";

// Assets

export const Miscellaneous = () => {
	const {
		isAuthorizedToEdit,
		location,
		changeMiscellaneousItemTitle,
		changeMiscellaneousItemText,
		addMiscellaneousItem,
		removeMiscellaneousItem,
		isReorderingMiscellaneousItems,
		toggleIsReorderingMiscellaneousItems,
		reorderMiscellaneousItems,
		revertMiscellaneousItems,
		saveMiscellaneousItems,
		errors,
	} = MiscellaneousLogic();

	return (
		<div className='locations-location-miscellaneous'>
			<EditableContainer
				className='locations-location-miscellaneous-items-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addMiscellaneousItem}
				onReorder={toggleIsReorderingMiscellaneousItems}
				onRevert={revertMiscellaneousItems}
				onSave={saveMiscellaneousItems}
			>
				<div className='locations-location-miscellaneous-items'>
					{location?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
						<div key={index} className='locations-location-miscellaneous-item-container'>
							<MiscellaneousItem index={index} miscellaneousItem={miscellaneousItem} isEditing={false} />
						</div>
					))}
				</div>
				<div>
					<ErrorMessage errors={errors} />
					<DragDropContainer
						className='locations-location-miscellaneous-items'
						enableDragDrop={isReorderingMiscellaneousItems}
						onDropItem={reorderMiscellaneousItems}
						includeVerticalDrag={true}
					>
						{location?.data?.miscellaneous?.items?.map((miscellaneousItem, index) => (
							<DragDropItem className='locations-location-miscellaneous-item-container' key={index} index={index}>
								<MiscellaneousItem
									index={index}
									miscellaneousItem={miscellaneousItem}
									isEditing={true}
									changeMiscellaneousItemTitle={changeMiscellaneousItemTitle}
									changeMiscellaneousItemText={changeMiscellaneousItemText}
									removeMiscellaneousItem={removeMiscellaneousItem}
									isReorderingMiscellaneousItems={isReorderingMiscellaneousItems}
								/>
							</DragDropItem>
						))}
					</DragDropContainer>
				</div>
			</EditableContainer>
		</div>
	);
};
