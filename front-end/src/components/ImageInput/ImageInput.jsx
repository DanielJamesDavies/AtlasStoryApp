// Packages
import { FaImage } from "react-icons/fa";

// Components

// Logic
import { ImageInputLogic } from "./ImageInputLogic";

// Context

// Services

// Styles
import "./ImageInput.css";

// Assets

export const ImageInput = ({ className, isCircular, value, onChange, maxFileSizeInKBs }) => {
	const { inputRef, imageInputClassName, onInputChange } = ImageInputLogic({ className, isCircular, onChange, maxFileSizeInKBs });

	return (
		<div className={imageInputClassName}>
			<div className='image-input-value' onClick={() => inputRef.current.click()}>
				<div className='image-input-value-icon'>
					<FaImage />
				</div>
				{value && value !== "NO_IMAGE" ? <img src={value} alt='' /> : null}
			</div>
			<input ref={inputRef} type='file' accept='image/*' onChange={onInputChange} />
		</div>
	);
};
