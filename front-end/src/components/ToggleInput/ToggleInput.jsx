// Packages

// Components

// Logic
import { ToggleInputLogic } from "./ToggleInputLogic";

// Context

// Styles
import "./ToggleInput.css";

// Assets

export const ToggleInput = ({ className, label, labels, value, onToggle, enableEdit, size }) => {
	const { toggleInputContainerClassName } = ToggleInputLogic({ className, enableEdit, size });

	return (
		<div className={toggleInputContainerClassName}>
			{label === undefined ? null : <div className='toggle-input-label'>{label}</div>}
			{labels === undefined ? null : <div className='toggle-input-label'>{labels[0]}</div>}
			<div className={value ? "toggle-input toggle-input-active" : "toggle-input"} onClick={!enableEdit ? () => {} : onToggle}>
				<span className='toggle-input-slider' />
			</div>
			{labels === undefined ? null : <div className='toggle-input-label toggle-input-labels-second'>{labels[1]}</div>}
		</div>
	);
};
