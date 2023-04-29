// Packages

// Components

// Logic
import { CoordinatesInputLogic } from "./CoordinatesInputLogic";

// Context

// Services

// Styles
import "./CoordinatesInput.css";

// Assets

export const CoordinatesInput = ({ className, value, onChange }) => {
	const {
		coordinatesInputContainerRef,
		coordinatesInputContainerClassName,
		onCoordinatesInputContainerFocus,
		onCoordinatesInputContainerBlur,
		onCoordinateChange,
	} = CoordinatesInputLogic({
		className,
		value,
		onChange,
	});

	return (
		<div
			ref={coordinatesInputContainerRef}
			className={coordinatesInputContainerClassName}
			onFocus={onCoordinatesInputContainerFocus}
			onBlur={onCoordinatesInputContainerBlur}
		>
			{!value
				? null
				: value.map((coordinate, index) => (
						<div key={index} className='coordinates-input'>
							<input
								placeholder={["X", "Y", "Z"][index]}
								value={coordinate}
								onChange={(e) => onCoordinateChange(e, index)}
								readOnly={onChange === undefined}
							/>
						</div>
				  ))}
		</div>
	);
};
