// Packages

// Components

// Logic
import { CookiesConsentPopUpLogic } from "./CookiesConsentPopUpLogic";

// Context

// Services

// Styles
import "./CookiesConsentPopUp.css";

// Assets

export const CookiesConsentPopUp = () => {
	const { showPopUp, acceptCookies, rejectCookies, isShowingWhatFor, showWhatFor, hideWhatFor } = CookiesConsentPopUpLogic();

	return (
		<div className={showPopUp ? "cookies-consent-pop-up" : "cookies-consent-pop-up cookies-consent-pop-up-hide"}>
			<div className='cookies-consent-pop-up-background' />
			<div className='cookies-consent-pop-up-form'>
				<div className='cookies-consent-pop-up-title'>Cookies Policy</div>
				<div className='cookies-consent-pop-up-text'>
					<p>
						This web app uses cookies that are necessary for its basic functioning. We require your consent to set cookies on your
						device. To agree, please click the "Accept" button below.
					</p>
				</div>
				<div className='cookies-consent-pop-up-buttons-container'>
					<button className='cookies-consent-pop-up-btn cookies-consent-pop-up-btn-accept' onClick={acceptCookies}>
						Accept
					</button>
					<button className='cookies-consent-pop-up-btn cookies-consent-pop-up-btn-reject' onClick={rejectCookies}>
						Reject
					</button>
				</div>
				{!isShowingWhatFor ? (
					<button className='cookies-consent-pop-up-what-for-toggle-show-btn' onClick={showWhatFor}>
						What does this web app use cookies for?
					</button>
				) : (
					<button className='cookies-consent-pop-up-what-for-toggle-show-btn' onClick={hideWhatFor}>
						Hide what this web app uses cookies for.
					</button>
				)}
				<div
					className={
						isShowingWhatFor
							? "cookies-consent-pop-up-what-for-container"
							: "cookies-consent-pop-up-what-for-container cookies-consent-pop-up-what-for-container-hide"
					}
				>
					<p>The cookies this web application sets and uses:</p>
					<ul>
						<li>
							<b>Cookies Consent Cookie</b> - We would store a cookie that confirms your consent to set and use cookies on your
							device.
						</li>
						<li>
							<b>Authentication Token Cookie</b> - To access your account, we would store a cookie that allows our server to know
							which account is signed in and to authenticate that your device logged in legitimately.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
