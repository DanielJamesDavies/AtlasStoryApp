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
		isDeletingSurfaceMapComponents,
		toggleIsDeletingSurfaceMapComponents,
		deleteAllSurfaceMapComponents,
		mapVersionID,
	} = RegionsLogic();

	return (
		<div className='locations-location-regions'>
			<div className='locations-location-regions-version-container'>
				<div>Map Version: </div>
				<div>{location?.data?.mapVersions.find((e) => e?._id === mapVersionID)?.title}</div>
			</div>
			<EditableContainer
				className='locations-location-regions-items-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addRegionsItem}
				onReorder={toggleIsReorderingRegionsItems}
				onRevert={revertRegionsItems}
				onSave={saveRegionsItems}
			>
				<div className='locations-location-regions-items'>
					{location?.data?.mapVersions
						?.find((e) => e?._id === mapVersionID)
						?.regions?.map((regionsItem, index) => (
							<div key={index} className='locations-location-regions-item-container'>
								<RegionsItem
									index={index}
									regionsItem={regionsItem}
									isEditing={false}
									locationChildren={locationChildren}
									mapVersion={mapVersionID}
								/>
							</div>
						))}
				</div>
				<div>
					<div className='locations-location-regions-start-btn-container'>
						<button
							className={
								"locations-location-regions-start-btn" +
								(isDrawingSurfaceMapComponents ? " locations-location-regions-start-btn-active" : "")
							}
							onClick={toggleIsDrawingSurfaceMapComponents}
						>
							{isDrawingSurfaceMapComponents ? "Stop Drawing New Components" : "Start Drawing New Components"}
						</button>
						<button
							className={
								"locations-location-regions-start-btn" +
								(isDeletingSurfaceMapComponents ? " locations-location-regions-start-btn-active" : "")
							}
							onClick={toggleIsDeletingSurfaceMapComponents}
						>
							{isDeletingSurfaceMapComponents ? "Stop Deleting Components" : "Start Deleting Components"}
						</button>
						{!isDeletingSurfaceMapComponents ? null : (
							<button
								className='locations-location-regions-start-btn locations-location-regions-start-btn-active'
								onClick={deleteAllSurfaceMapComponents}
							>
								Delete All Components
							</button>
						)}
					</div>
					<ErrorMessage errors={errors} />
					<DragDropContainer
						className='locations-location-regions-items'
						enableDragDrop={isReorderingRegionsItems}
						onDropItem={reorderRegionsItems}
						includeVerticalDrag={true}
						absoluteVerticalDrag={true}
					>
						{location?.data?.mapVersions
							?.find((e) => e?._id === mapVersionID)
							?.regions?.map((regionsItem, index) => (
								<DragDropItem className='locations-location-regions-item-container' key={index} index={index}>
									<RegionsItem
										index={index}
										regionsItem={regionsItem}
										isEditing={true}
										locationChildren={locationChildren}
										mapVersion={mapVersionID}
									/>
								</DragDropItem>
							))}
					</DragDropContainer>
				</div>
			</EditableContainer>
		</div>
	);
};
