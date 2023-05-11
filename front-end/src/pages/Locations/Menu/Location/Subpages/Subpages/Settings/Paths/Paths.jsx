// Packages

// Components
import { EditableContainer } from "../../../../../../../../components/EditableContainer/EditableContainer";
import { LocationPath } from "./Path/Path";

// Logic
import { LocationPathsLogic } from "./PathsLogic";

// Context

// Services
import { HierarchyFunctions } from "../../../../../../HierarchyFunctions";

// Styles
import "./Paths.css";

// Assets

export const LocationPaths = () => {
	const {
		isAuthorizedToEdit,
		location_id,
		story,
		locations,
		location,
		changePathFrom,
		changePathTo,
		togglePathIsMajor,
		changePathColour,
		addPath,
		revertPaths,
		savePaths,
	} = LocationPathsLogic();
	const { getItemFromIdInHierarchy } = HierarchyFunctions();

	if (!["starCluster"].includes(location?.type)) return null;
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
				{location?.paths?.length === 0 ? null : (
					<div className='locations-details-paths-list'>
						{locations
							.find((e) => JSON.stringify(e?._id) === JSON.stringify(location_id))
							?.paths.map((path, index) => (
								<LocationPath
									key={index}
									path={path}
									index={index}
									locations={locations}
									selectedLocationHierarchyItem={getItemFromIdInHierarchy(location_id, story?.data?.locationsHierarchy)}
									isEditing={false}
								/>
							))}
					</div>
				)}
			</div>
			<div className='locations-details-paths'>
				<div className='locations-details-paths-title'>Paths</div>
				{location?.paths?.length === 0 ? null : (
					<div className='locations-details-paths-list'>
						{locations
							.find((e) => JSON.stringify(e?._id) === JSON.stringify(location_id))
							?.paths.map((path, index) => (
								<LocationPath
									key={index}
									path={path}
									index={index}
									locations={locations}
									selectedLocationHierarchyItem={getItemFromIdInHierarchy(location_id, story?.data?.locationsHierarchy)}
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
