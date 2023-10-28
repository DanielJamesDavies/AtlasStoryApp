// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { GoToMapBtnLogic } from "./GoToMapBtnLogic";

// Context

// Services

// Styles
import "./GoToMapBtn.css";

// Assets

export const GoToMapBtn = () => {
	const { goToMap } = GoToMapBtnLogic();

	return (
		<div className='unit-page-primary-map-btn-container'>
			<div className='unit-page-primary-map-btn'>
				<IconBtn icon={<FontAwesomeIcon icon={faMap} />} onClick={goToMap} seamless={true} size='l' />
			</div>
		</div>
	);
};
