// Packages
import { FaChevronRight } from "react-icons/fa";

// Components
import { TextInput } from "../../components/TextInput/TextInput";
import { LoginErrorMessage } from "./LoginErrorMessage";

// Logic
import { LoginLogic } from "./LoginLogic";

// Context

// Services

// Styles
import "./Login.css";

// Assets

export const Login = () => {
	const { username, changeUsername, password, changePassword, errors, submitLoginUser } = LoginLogic();

	return (
		<div className='login'>
			<div className='login-form'>
				<div className='login-form-title'>Log In</div>

				<div className='login-form-text-input-container'>
					<TextInput label='Username' value={username} onChange={changeUsername} isDark={true} />
					<LoginErrorMessage errors={errors} attribute='username' />
				</div>
				<div className='login-form-text-input-container'>
					<TextInput label='Password' value={password} onChange={changePassword} hideValue={true} isDark={true} />
					<LoginErrorMessage errors={errors} attribute='password' />
				</div>

				<div className='login-form-submit-container'>
					<button className='login-form-submit-btn' onClick={submitLoginUser}>
						<div className='login-form-submit-btn-text'>Log in to Your Account</div>
						<FaChevronRight className='login-form-submit-btn-icon' />
					</button>
				</div>
			</div>
		</div>
	);
};
