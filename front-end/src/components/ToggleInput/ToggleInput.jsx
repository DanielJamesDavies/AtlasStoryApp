// Packages

// Components

// Logic

// Context

// Styles
import "./ToggleInput.css";

// Assets

export const ToggleInput = ({ className, label, value, onToggle }) => {
	return (
		<div className={className ? "toggle-input-container " + className : "toggle-input-container"}>
			{label === undefined ? null : <div className='toggle-input-label'>{label}</div>}
			<div className={value ? "toggle-input toggle-input-active" : "toggle-input"} onClick={onToggle}>
				<span className='toggle-input-slider' />
			</div>
		</div>
	);
};
