// Packages

// Components

// Logic

// Context

// Services

// Styles
import { FaPlus } from "react-icons/fa";
import "./FirstAddButton.css";

// Assets

export const FirstAddButton = ({ label, onClick }) => {
	return (
		<div className='first-add-btn' onClick={onClick === undefined ? () => {} : onClick}>
			<div className='first-add-btn-plus'>
				<FaPlus />
			</div>
			<div className='first-add-btn-label'>{label}</div>
		</div>
	);
};
