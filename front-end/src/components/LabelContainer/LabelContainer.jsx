// Packages

// Components

// Logic
import { LabelContainerLogic } from "./LabelContainerLogic";

// Context

// Services

// Styles
import "./LabelContainer.css";

// Assets

export const LabelContainer = ({ children, label, className, isInline, isBold }) => {
	const { labelContainerClassName, labelLabelRef, labelValueStyle } = LabelContainerLogic({ label, className, isInline, isBold });

	return (
		<div className={labelContainerClassName}>
			<div ref={labelLabelRef} className='label-label'>
				{label}
			</div>
			<div className='label-value' style={labelValueStyle}>
				{children}
			</div>
		</div>
	);
};
