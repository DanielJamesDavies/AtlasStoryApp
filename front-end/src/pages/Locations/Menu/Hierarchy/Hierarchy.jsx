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
	const { selectedLocationId, setSelectedLocationId } = HierarchyLogic();

	return (
		<div
			className={selectedLocationId ? "locations-hierarchy locations-hierarchy-is-displaying-details" : "locations-hierarchy"}
			onClick={() => setSelectedLocationId(false)}
		>
			<div className='locations-hierarchy-title'>Hierarchy</div>
			<HierarchyList />
			<HierarchyCreateHierarchyItemForm />
		</div>
	);
};
