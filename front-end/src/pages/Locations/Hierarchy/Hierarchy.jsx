// Packages
import { FaArrowRight, FaListUl } from "react-icons/fa";

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
	const { isDisplayingHierarchy, toggleIsDisplayingHierarchy } = HierarchyLogic();

	return (
		<div
			className={
				isDisplayingHierarchy
					? "locations-hierarchy-container locations-hierarchy-container-is-displaying"
					: "locations-hierarchy-container"
			}
		>
			<div className='locations-hierarchy-toggle-visible-btn-container'>
				<div className='locations-hierarchy-toggle-visible-btn' onClick={toggleIsDisplayingHierarchy}>
					{!isDisplayingHierarchy ? <FaListUl /> : <FaArrowRight />}
				</div>
			</div>
			<div className='locations-hierarchy'>
				<div className='locations-hierarchy-title'>Hierarchy</div>
				<HierarchyList />
				<HierarchyCreateHierarchyItemForm />
			</div>
		</div>
	);
};
