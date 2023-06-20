// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./AlignmentInput.css";

// Assets

export const AlignmentInput = ({ className, value, onChange }) => {
	const possibleValues = ["top-left", "top", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom", "bottom-right"];

	return (
		<div
			className={
				className
					? "alignment-input-container alignment-input-container-" + value + " " + className
					: "alignment-input-container alignment-input-container-" + value
			}
		>
			<div className='alignment-input-buttons-container'>
				{possibleValues?.map((possibleValue, index) => (
					<div
						key={index}
						className={possibleValue === value ? "alignment-input-btn alignment-input-btn-active" : "alignment-input-btn"}
						onClick={(e) => onChange(e, possibleValue)}
					>
						<div className='alignment-input-btn-lines-container'>
							<div className='alignment-input-btn-line'></div>
							<div className='alignment-input-btn-line'></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
