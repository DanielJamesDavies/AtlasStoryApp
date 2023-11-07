// Packages

// Components
import { PlacesItem } from "./PlacesItem/PlacesItem";
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";
import { ErrorMessage } from "../../../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { PlacesLogic } from "./PlacesLogic";

// Context

// Services

// Styles
import "./Places.css";

// Assets

export const Places = () => {
	const {
		isAuthorizedToEdit,
		location,
		locationChildren,
		addPlacesItem,
		isReorderingPlacesItems,
		toggleIsReorderingPlacesItems,
		reorderPlacesItems,
		revertPlacesItems,
		savePlacesItems,
		errors,
		mapVersionID,
	} = PlacesLogic();

	return (
		<div className='locations-location-places'>
			<div className='locations-location-places-version-container'>
				<div>Map Version: </div>
				<div>{location?.data?.mapVersions.find((e) => e?._id === mapVersionID)?.title}</div>
			</div>
			<EditableContainer
				className='locations-location-places-items-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addPlacesItem}
				onReorder={toggleIsReorderingPlacesItems}
				onRevert={revertPlacesItems}
				onSave={savePlacesItems}
			>
				<div className='locations-location-places-items'>
					{location?.data?.mapVersions
						?.find((e) => e?._id === mapVersionID)
						?.places?.map((placesItem, index) => (
							<div key={index} className='locations-location-places-item-container'>
								<PlacesItem index={index} placesItem={placesItem} isEditing={false} locationChildren={locationChildren} />
							</div>
						))}
				</div>
				<div>
					<ErrorMessage errors={errors} />
					<DragDropContainer
						className='locations-location-places-items'
						enableDragDrop={isReorderingPlacesItems}
						onDropItem={reorderPlacesItems}
						includeVerticalDrag={true}
						absoluteVerticalDrag={true}
					>
						{location?.data?.mapVersions
							?.find((e) => e?._id === mapVersionID)
							?.places?.map((placesItem, index) => (
								<DragDropItem className='locations-location-places-item-container' key={index} index={index}>
									<PlacesItem index={index} placesItem={placesItem} isEditing={true} locationChildren={locationChildren} />
								</DragDropItem>
							))}
					</DragDropContainer>
				</div>
			</EditableContainer>
		</div>
	);
};
