// Packages

// Components
import { RegisterProfilePictureInput } from "./RegisterProfilePictureInput";
import { RegisterBannerInput } from "./RegisterBannerInput";
import { TextInput } from "../../components/TextInput/TextInput";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { SubmitBtn } from "../../components/SubmitBtn/SubmitBtn";

// Logic
import { RegisterLogic } from "./RegisterLogic";

// Context

// Services

// Styles
import "./Register.css";

// Assets

export const Register = () => {
	const {
		profilePictureInputRef,
		profilePicture,
		changeProfilePicture,
		bannerInputRef,
		banner,
		changeBanner,
		username,
		changeUsername,
		nickname,
		changeNickname,
		email,
		changeEmail,
		password,
		changePassword,
		errors,
		submitNewUser,
		hasCompletedRegistration,
	} = RegisterLogic();

	return (
		<div className='register'>
			{!hasCompletedRegistration ? (
				<div className='register-form'>
					<div className='register-form-title'>Register an Account</div>

					<div className='register-form-text-input-container'>
						<TextInput type='username' label='Username' value={username} onChange={changeUsername} isDark={true} />
						<ErrorMessage errors={errors} attribute='username' />
					</div>
					<div className='register-form-text-input-container'>
						<TextInput label='Nickname' value={nickname} onChange={changeNickname} isDark={true} />
						<ErrorMessage errors={errors} attribute='nickname' />
					</div>
					<div className='register-form-text-input-container'>
						<TextInput type='email' label='Email Address' value={email} onChange={changeEmail} isDark={true} />
						<ErrorMessage errors={errors} attribute='email' />
					</div>
					<div className='register-form-text-input-container'>
						<TextInput label='Password' value={password} onChange={changePassword} hideValue={true} isDark={true} />
						<ErrorMessage errors={errors} attribute='password' />
					</div>

					<RegisterProfilePictureInput
						profilePictureInputRef={profilePictureInputRef}
						profilePicture={profilePicture}
						changeProfilePicture={changeProfilePicture}
					/>
					<ErrorMessage errors={errors} attribute='profilePicture' />

					<RegisterBannerInput bannerInputRef={bannerInputRef} banner={banner} changeBanner={changeBanner} />
					<ErrorMessage errors={errors} attribute='banner' />

					<ErrorMessage errors={errors} />

					<div className='register-form-submit-container'>
						<SubmitBtn label='Register Account' onSubmit={submitNewUser} />
					</div>
				</div>
			) : (
				<div className='register-completed-container'>
					<div className='register-completed-title'>Nearly There!</div>
					<div className='register-completed-text'>
						To complete your account registration, please verify your email adresss by clicking the link sent to:
					</div>
					<div className='register-completed-email'>{email}</div>
					<div className='register-completed-text'>
						Please note that the verification email we sent may be located in your spam folder.
					</div>
				</div>
			)}
		</div>
	);
};
