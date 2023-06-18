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
	const { isAuthorizedToEdit, inputRef, changeOverviewBackground } = ChangeOverviewBackgroundLogic();

	if (!isAuthorizedToEdit) return false;
	return (
		<div className='group-overview-change-background'>
			<IconBtn
				icon={<FaImage />}
				iconName='image'
				seamless={true}
				label='Change Overview Background'
				labelAlignment='left'
				onClick={() => inputRef.current.click()}
			/>
			<input ref={inputRef} type='file' accept='image/*' onChange={changeOverviewBackground} />
		</div>
	);
};
