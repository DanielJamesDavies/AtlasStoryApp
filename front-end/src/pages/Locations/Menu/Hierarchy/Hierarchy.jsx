// Packages

// Components
import { HierarchyList } from "./HierarchyList/HierarchyList";

// Logic
import { HierarchyLogic } from "./HierarchyLogic";

// Context

// Services

// Styles
import "./Hierarchy.css";

// Assets

export const Hierarchy = () => {
	const { isMouseOverMap, selectedLocationId, setSelectedLocationId } = HierarchyLogic();

	return (
		<div
			className={
				selectedLocationId
					? isMouseOverMap
						? "locations-hierarchy locations-hierarchy-is-displaying-location locations-hierarchy-mouse-over-map"
						: "locations-hierarchy locations-hierarchy-is-displaying-location"
					: isMouseOverMap
					? "locations-hierarchy locations-hierarchy-mouse-over-map"
					: "locations-hierarchy"
			}
			onClick={(e) => {
				e.stopPropagation();
				setSelectedLocationId(false);
			}}
		>
			<div className='locations-hierarchy-title'>Hierarchy</div>
			<HierarchyList />
		</div>
	);
};
