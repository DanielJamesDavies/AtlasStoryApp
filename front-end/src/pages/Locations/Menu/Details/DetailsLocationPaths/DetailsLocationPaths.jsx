// Packages

// Components
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DetailsLocationPath } from "./DetailsLocationPath";

// Logic
import { DetailsLocationPathsLogic } from "./DetailsLocationPathsLogic";

// Context

// Services
import { HierarchyFunctions } from "../../../HierarchyFunctions";

// Styles
import "./DetailsLocationPaths.css";

// Assets

export const DetailsLocationPaths = () => {
	const {
		isAuthorizedToEdit,
		story,
		locations,
		selectedLocationId,
		changePathFrom,
		changePathTo,
		togglePathIsMajor,
		changePathColour,
		addPath,
		revertPaths,
		savePaths,
	} = DetailsLocationPathsLogic();
	const { getItemFromIdInHierarchy } = HierarchyFunctions();

	if (!["starCluster"].includes(locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.type)) return null;
	return (
		<EditableContainer
			className='locations-details-paths-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertPaths}
			onSave={savePaths}
			onAdd={addPath}
		>
			<div className='locations-details-paths'>
				<div className='locations-details-paths-title'>Paths</div>
				{locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.paths?.length === 0 ? null : (
					<div className='locations-details-paths-list'>
						{locations
							.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))
							?.paths.map((path, index) => (
								<DetailsLocationPath
									key={index}
									path={path}
									index={index}
									locations={locations}
									selectedLocationHierarchyItem={getItemFromIdInHierarchy(selectedLocationId, story?.data?.locationsHierarchy)}
									isEditing={false}
								/>
							))}
					</div>
				)}
			</div>
			<div className='locations-details-paths'>
				<div className='locations-details-paths-title'>Paths</div>
				{locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.paths?.length === 0 ? null : (
					<div className='locations-details-paths-list'>
						{locations
							.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))
							?.paths.map((path, index) => (
								<DetailsLocationPath
									key={index}
									path={path}
									index={index}
									locations={locations}
									selectedLocationHierarchyItem={getItemFromIdInHierarchy(selectedLocationId, story?.data?.locationsHierarchy)}
									isEditing={true}
									changePathFrom={changePathFrom}
									changePathTo={changePathTo}
									togglePathIsMajor={togglePathIsMajor}
									changePathColour={changePathColour}
								/>
							))}
					</div>
				)}
			</div>
		</EditableContainer>
	);
};
