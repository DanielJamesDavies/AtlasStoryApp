// Packages

// Components
import { HierarchyList } from "./HierarchyList/HierarchyList";
import { HierarchyCreateHierarchyItemForm } from "./HierarchyCreateHierarchyItemForm/HierarchyCreateHierarchyItemForm";

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
						? "locations-hierarchy locations-hierarchy-is-displaying-details locations-hierarchy-mouse-over-map"
						: "locations-hierarchy locations-hierarchy-is-displaying-details"
					: isMouseOverMap
					? "locations-hierarchy locations-hierarchy-mouse-over-map"
					: "locations-hierarchy"
			}
			onClick={() => setSelectedLocationId(false)}
		>
			<div className='locations-hierarchy-title'>Hierarchy</div>
			<HierarchyList />
			<HierarchyCreateHierarchyItemForm />
		</div>
	);
};
