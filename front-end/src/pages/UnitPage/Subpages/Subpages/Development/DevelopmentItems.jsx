// Packages

// Components
import { DevelopmentItem } from "./DevelopmentItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";
import { UnitImages } from "../../UnitImages/UnitImages";

// Logic
import { DevelopmentItemsLogic } from "./DevelopmentItemsLogic";

// Context

// Services

// Styles
import "./DevelopmentItems.css";

// Assets

export const DevelopmentItems = () => {
	const {
		isAuthorizedToEdit,
		unit,
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
		unitImagesCurrDevItemIndex,
		openUnitImages,
		closeUnitImages,
		addImageToDevItem,
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	} = DevelopmentItemsLogic();

	return (
		<EditableContainer
			className='unit-page-subpage-development-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addDevelopmentItem}
			onReorder={toggleIsReorderingDevelopmentItems}
			onRevert={revertDevelopmentItems}
			onSave={saveDevelopmentItems}
			onScroll={onDevelopmentItemsContainerScroll}
			controlScrollDepth={[1, 2]}
			scrollItemsDepth={[1, 2]}
		>
			<div ref={developmentItemsRef} className='unit-page-subpage-development-items'>
				{unit?.data?.development?.items?.map((developmentItem, index) => (
					<div
						key={index}
						className={"unit-page-subpage-development-item-container unit-page-subpage-development-item-container-" + index}
					>
						<DevelopmentItem index={index} developmentItem={developmentItem} isEditing={false} />
					</div>
				))}
			</div>
			<div>
				<ErrorMessage errors={errors} />
				<DragDropContainer
					innerRef={developmentItemsRef}
					className={
						unitImagesCurrDevItemIndex === -1
							? "unit-page-subpage-development-items"
							: "unit-page-subpage-development-items unit-page-subpage-development-items-unit-page-images-open"
					}
					enableDragDrop={isReorderingDevelopmentItems}
					onDropItem={reorderDevelopmentItems}
					includeVerticalDrag={true}
					absoluteVerticalDrag={true}
				>
					{unit?.data?.development?.items?.map((developmentItem, index) => (
						<DragDropItem
							className={"unit-page-subpage-development-item-container unit-page-subpage-development-item-container-" + index}
							key={index}
							index={index}
						>
							<DevelopmentItem
								index={index}
								developmentItem={developmentItem}
								isEditing={true}
								changeDevelopmentItemTitle={changeDevelopmentItemTitle}
								changeDevelopmentItemText={changeDevelopmentItemText}
								removeDevelopmentItem={removeDevelopmentItem}
								isReorderingDevelopmentItems={isReorderingDevelopmentItems}
								unitImagesCurrDevItemIndex={unitImagesCurrDevItemIndex}
								openUnitImages={openUnitImages}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
				{unitImagesCurrDevItemIndex === -1 ? null : <UnitImages onAddImage={addImageToDevItem} onClose={closeUnitImages} />}
			</div>
		</EditableContainer>
	);
};
