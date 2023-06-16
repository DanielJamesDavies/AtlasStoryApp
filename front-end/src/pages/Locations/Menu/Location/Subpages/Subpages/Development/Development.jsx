// Packages

// Components
import { DevelopmentItem } from "./DevelopmentItem/DevelopmentItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { DevelopmentLogic } from "./DevelopmentLogic";

// Context

// Services

// Styles
import "./Development.css";

// Assets

export const Development = () => {
	const {
		isAuthorizedToEdit,
		location,
		changeDevelopmentItemTitle,
		changeDevelopmentItemText,
		addDevelopmentItem,
		removeDevelopmentItem,
		isReorderingDevelopmentItems,
		toggleIsReorderingDevelopmentItems,
		reorderDevelopmentItems,
		revertDevelopmentItems,
		saveDevelopmentItems,
		errors,
	} = DevelopmentLogic();

	return (
		<div className='locations-location-development'>
			<EditableContainer
				className='locations-location-development-items-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addDevelopmentItem}
				onReorder={toggleIsReorderingDevelopmentItems}
				onRevert={revertDevelopmentItems}
				onSave={saveDevelopmentItems}
			>
				<div className='locations-location-development-items'>
					{location?.data?.development?.items?.map((developmentItem, index) => (
						<div key={index} className='locations-location-development-item-container'>
							<DevelopmentItem index={index} developmentItem={developmentItem} isEditing={false} />
						</div>
					))}
				</div>
				<div>
					<ErrorMessage errors={errors} />
					<DragDropContainer
						className='locations-location-development-items'
						enableDragDrop={isReorderingDevelopmentItems}
						onDropItem={reorderDevelopmentItems}
						includeVerticalDrag={true}
					>
						{location?.data?.development?.items?.map((developmentItem, index) => (
							<DragDropItem className='locations-location-development-item-container' key={index} index={index}>
								<DevelopmentItem
									index={index}
									developmentItem={developmentItem}
									isEditing={true}
									changeDevelopmentItemTitle={changeDevelopmentItemTitle}
									changeDevelopmentItemText={changeDevelopmentItemText}
									removeDevelopmentItem={removeDevelopmentItem}
									isReorderingDevelopmentItems={isReorderingDevelopmentItems}
								/>
							</DragDropItem>
						))}
					</DragDropContainer>
				</div>
			</EditableContainer>
		</div>
	);
};
