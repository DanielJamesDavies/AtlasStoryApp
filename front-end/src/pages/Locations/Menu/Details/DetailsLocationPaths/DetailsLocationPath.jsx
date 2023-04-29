// Packages

// Components
import { DropdownContainer } from "../../../../../components/DropdownContainer/DropdownContainer";
import { ToggleInput } from "../../../../../components/ToggleInput/ToggleInput";

// Logic

// Context

// Services

// Styles
import "./DetailsLocationPath.css";

// Assets

export const DetailsLocationPath = ({
	path,
	index,
	locations,
	selectedLocationHierarchyItem,
	isEditing,
	changePathFrom,
	changePathTo,
	changePathType,
	togglePathIsMajor,
}) => {
	return (
		<div className='locations-details-path'>
			<div className='locations-details-path-labels'>
				<div className='locations-details-path-label'>To</div>
				<div className='locations-details-path-label'>From</div>
				<div className='locations-details-path-label'>Type</div>
				<div className='locations-details-path-label'>Is Major</div>
			</div>
			<div className='locations-details-path-values'>
				<div className='locations-details-path-value'>
					<DropdownContainer
						value={locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(path?.from))?.data?.name}
						onChange={(optionIndex) =>
							changePathFrom(
								!selectedLocationHierarchyItem?.children ? "Unselected" : selectedLocationHierarchyItem?.children[optionIndex]?._id,
								index
							)
						}
						noBackground={true}
						enableEdit={isEditing}
					>
						{!selectedLocationHierarchyItem?.children
							? null
							: selectedLocationHierarchyItem?.children.map((child, index) => (
									<div key={index}>
										{locations.find((location) => JSON.stringify(location?._id) === JSON.stringify(child?._id))?.data?.name}
									</div>
							  ))}
					</DropdownContainer>
				</div>
				<div className='locations-details-path-value'>
					<DropdownContainer
						value={locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(path?.to))?.data?.name}
						onChange={(optionIndex) =>
							changePathTo(
								!selectedLocationHierarchyItem?.children ? "Unselected" : selectedLocationHierarchyItem?.children[optionIndex]?._id,
								index
							)
						}
						noBackground={true}
						enableEdit={isEditing}
					>
						{!selectedLocationHierarchyItem?.children
							? null
							: selectedLocationHierarchyItem?.children.map((child, index) => (
									<div key={index}>
										{locations.find((location) => JSON.stringify(location?._id) === JSON.stringify(child?._id))?.data?.name}
									</div>
							  ))}
					</DropdownContainer>
				</div>
				<div className='locations-details-path-value'>
					<DropdownContainer
						value={path?.pathType}
						onChange={changePathType}
						noBackground={true}
						enableEdit={isEditing}
					></DropdownContainer>
				</div>
				<div className='locations-details-path-value'>
					<ToggleInput value={path?.isMajor} onToggle={(e) => togglePathIsMajor(e, index)} enableEdit={isEditing} />
				</div>
			</div>
		</div>
	);
};
