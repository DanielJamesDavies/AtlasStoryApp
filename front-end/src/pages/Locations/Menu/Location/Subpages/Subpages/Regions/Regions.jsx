// Packages

// Components
import { RegionsItem } from "./RegionsItem/RegionsItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { RegionsLogic } from "./RegionsLogic";

// Context

// Services

// Styles
import "./Regions.css";

// Assets

export const Regions = () => {
	const {
		isAuthorizedToEdit,
		location,
		locationChildren,
		addRegionsItem,
		isReorderingRegionsItems,
		toggleIsReorderingRegionsItems,
		reorderRegionsItems,
		revertRegionsItems,
		saveRegionsItems,
		errors,
		isDrawingSurfaceMapComponents,
		toggleIsDrawingSurfaceMapComponents,
	} = RegionsLogic();

	return (
		<div className='locations-location-regions'>
			<EditableContainer
				className='locations-location-regions-items-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addRegionsItem}
				onReorder={toggleIsReorderingRegionsItems}
				onRevert={revertRegionsItems}
				onSave={saveRegionsItems}
			>
				<div className='locations-location-regions-items'>
					{location?.data?.regions?.map((regionsItem, index) => (
						<div key={index} className='locations-location-regions-item-container'>
							<RegionsItem index={index} regionsItem={regionsItem} isEditing={false} locationChildren={locationChildren} />
						</div>
					))}
				</div>
				<div>
					<div className="locations-location-regions-start-drawing-btn-container">
						<button
							className={"locations-location-regions-start-drawing-btn" + (isDrawingSurfaceMapComponents ? " locations-location-regions-start-drawing-btn-active" : "")}
							onClick={toggleIsDrawingSurfaceMapComponents}
						>
							{isDrawingSurfaceMapComponents ? "Stop Drawing New Components" : "Start Drawing New Components"}
						</button>
					</div>
					<ErrorMessage errors={errors} />
					<DragDropContainer
						className='locations-location-regions-items'
						enableDragDrop={isReorderingRegionsItems}
						onDropItem={reorderRegionsItems}
						includeVerticalDrag={true}
						absoluteVerticalDrag={true}
					>
						{location?.data?.regions?.map((regionsItem, index) => (
							<DragDropItem className='locations-location-regions-item-container' key={index} index={index}>
								<RegionsItem
									index={index}
									regionsItem={regionsItem}
									isEditing={true}
									locationChildren={locationChildren}
								/>
							</DragDropItem>
						))}
					</DragDropContainer>
				</div>
			</EditableContainer>
		</div>
	);
};
