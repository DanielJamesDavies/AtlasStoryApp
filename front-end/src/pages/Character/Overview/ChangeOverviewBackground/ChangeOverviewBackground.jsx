// Packages
import { FaImage } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { ChangeOverviewBackgroundLogic } from "./ChangeOverviewBackgroundLogic";

// Context

// Services

// Styles
import "./ChangeOverviewBackground.css";

// Assets

export const ChangeOverviewBackground = () => {
	const { isAuthorizedToEdit, onClickChangeOverviewBackground } = ChangeOverviewBackgroundLogic();

	if (!isAuthorizedToEdit) return false;
	return (
		<div className='character-overview-change-background'>
			<IconBtn
				icon={<FaImage />}
				iconName='image'
				seamless={true}
				label='Change Overview Images'
				labelAlignment='left'
				onClick={() => onClickChangeOverviewBackground()}
			/>
		</div>
	);
};
