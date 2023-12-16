// Packages
import { FaChevronRight } from "react-icons/fa";

// Components

// Logic

// Context

// Services

// Styles
import "./SubmitBtn.css";

// Assets

export const SubmitBtn = ({ label, onSubmit, className }) => {
	return (
		<button className={"submit-btn" + (className ? " " + className : "")} onClick={onSubmit}>
			<div className='submit-btn-text'>{label}</div>
			<FaChevronRight className='submit-btn-icon' />
		</button>
	);
};
