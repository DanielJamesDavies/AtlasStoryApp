// Packages
import { FaHardHat } from "react-icons/fa";
import { useState } from "react";

// Components

// Logic

// Context

// Services

// Styles
import "./UnderConstruction.css";

// Assets

export const UnderConstruction = () => {
	const [isDisplaying, setIsDisplaying] = useState(true);

	if (!isDisplaying) return null;
	return (
		<div className='under-construction-container' onClick={() => setIsDisplaying(false)}>
			<div className='under-construction'>
				<FaHardHat />
				<div className='under-construction-text'>This section of the app is currently still in development.</div>
				<div className='under-construction-text'>If you wish to continue, click here!</div>
			</div>
		</div>
	);
};
