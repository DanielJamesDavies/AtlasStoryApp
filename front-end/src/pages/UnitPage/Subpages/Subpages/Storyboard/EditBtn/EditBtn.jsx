// Packages

// Components

// Logic
import { EditBtnLogic } from "./EditBtnLogic";

// Context

// Services

// Styles
import "./EditBtn.css";

// Assets

export const EditBtn = () => {
	const { isAuthorizedToEdit, onClick } = EditBtnLogic();

	if (!isAuthorizedToEdit) return null;
	return (
		<div className='unit-page-storyboard-edit-btn-container'>
			<button className='unit-page-storyboard-edit-btn' onClick={onClick}>
				<div>Edit</div>
			</button>
		</div>
	);
};
