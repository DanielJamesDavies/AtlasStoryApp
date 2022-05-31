// Packages
import { FaImage } from "react-icons/fa";

// Components

// Logic

// Context

// Services

// Styles
import "./RegisterBannerInput.css";

// Assets

export const RegisterBannerInput = ({ bannerInputRef, banner, changeBanner }) => {
	return (
		<div className='register-banner-input'>
			<div className='register-banner-label'>Banner</div>
			<div className='register-banner-value' onClick={() => bannerInputRef.current.click()}>
				<div className='register-banner-value-icon'>
					<FaImage />
				</div>
				{banner ? <img src={banner} alt='' /> : null}
			</div>
			<input ref={bannerInputRef} type='file' accept='image/*' onChange={changeBanner} />
		</div>
	);
};
