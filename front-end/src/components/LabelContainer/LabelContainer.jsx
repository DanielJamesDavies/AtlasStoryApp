// Packages

// Components

// Logic
import { LabelContainerLogic } from "./LabelContainerLogic";

// Context

// Services

// Styles
import "./LabelContainer.css";

// Assets

export const LabelContainer = ({ children, label, className }) => {
	const { labelLabelRef, labelValueStyle } = LabelContainerLogic({ label });

	return (
		<div className={className ? "label-container " + className : "label-container"}>
			<div ref={labelLabelRef} className='label-label'>
				{label}
			</div>
			<div className='label-value' style={labelValueStyle}>
				{children}
			</div>
		</div>
	);
};
