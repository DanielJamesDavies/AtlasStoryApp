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

export const ImageInput = ({ className, isCircular, value, onChange }) => {
	const { inputRef, imageInputClassName, onInputChange } = ImageInputLogic({ className, isCircular, onChange });

	return (
		<div className={imageInputClassName}>
			<div className='image-input-value' onClick={() => inputRef.current.click()}>
				<div className='image-input-value-icon'>
					<FaImage />
				</div>
				{value ? <img src={value} alt='' /> : null}
			</div>
			<input ref={inputRef} type='file' accept='image/*' onChange={onInputChange} />
		</div>
	);
};
