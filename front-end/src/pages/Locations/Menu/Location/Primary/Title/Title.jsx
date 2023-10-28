// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic
import { LocationTitleLogic } from "./TitleLogic";

// Context

// Services

// Styles
import "./Title.css";

// Assets

export const LocationTitle = () => {
	const { goToLocationBtnRef, goToLocation, onCloseBtnClick } = LocationTitleLogic();

	return (
		<div className='locations-location-title-container'>
			<div className='locations-location-title-label'>Location Details</div>
			<button ref={goToLocationBtnRef} className='locations-location-title-go-to-btn' onClick={goToLocation} onAuxClick={goToLocation}>
				Go To Location
			</button>
			<IconBtn className='locations-location-title-close-btn' onClick={onCloseBtnClick} icon={<FaTimes />} seamless={true} size='xs' />
		</div>
	);
};
