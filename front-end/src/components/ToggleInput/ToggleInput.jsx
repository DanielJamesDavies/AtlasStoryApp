// Packages

// Components

// Logic
import { ToggleInputLogic } from "./ToggleInputLogic";

// Context

// Styles
import "./ToggleInput.css";

// Assets

export const ToggleInput = ({ className, label, value, onToggle, enableEdit }) => {
	const { toggleInputContainerClassName } = ToggleInputLogic({ className, enableEdit });

	return (
		<div className={toggleInputContainerClassName}>
			{label === undefined ? null : <div className='toggle-input-label'>{label}</div>}
			<div className={value ? "toggle-input toggle-input-active" : "toggle-input"} onClick={!enableEdit ? () => {} : onToggle}>
				<span className='toggle-input-slider' />
			</div>
		</div>
	);
};
