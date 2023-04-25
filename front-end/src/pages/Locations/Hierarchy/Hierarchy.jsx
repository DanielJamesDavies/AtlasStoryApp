// Packages

// Components
import { HierarchyList } from "./HierarchyList/HierarchyList";
import { HierarchyCreateHierarchyItemForm } from "./HierarchyCreateHierarchyItemForm/HierarchyCreateHierarchyItemForm";

// Logic

// Context

// Services

// Styles
import "./Hierarchy.css";

// Assets

export const Hierarchy = () => {
	return (
		<div className='locations-hierarchy'>
			<div className='locations-hierarchy-title'>Hierarchy</div>
			<HierarchyList />
			<HierarchyCreateHierarchyItemForm />
		</div>
	);
};
