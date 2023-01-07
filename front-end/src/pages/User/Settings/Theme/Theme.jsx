// Packages

// Components
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { ThemeLogic } from "./ThemeLogic";

// Context

// Services

// Styles
import "./Theme.css";

// Assets

export const Theme = () => {
	const { uiTheme, changeTheme, themes, errors } = ThemeLogic();

	return (
		<>
			<div className='user-settings-theme-buttons-container'>
				{themes.map((theme, index) => (
					<div key={index} className='user-settings-theme-btn-container'>
						<div
							className={
								JSON.stringify(uiTheme) === JSON.stringify(theme?.id)
									? "user-settings-theme-btn user-settings-theme-btn-active"
									: "user-settings-theme-btn"
							}
							style={theme?.styles}
							onClick={() => changeTheme(theme?.id)}
						>
							<div className='user-settings-theme-btn-colour'></div>
							<div className='user-settings-theme-btn-halo'></div>
						</div>
						<div className='user-settings-theme-btn-label'>{theme?.label}</div>
					</div>
				))}
			</div>
			<ErrorMessage errors={errors} attribute='theme' />
			<ErrorMessage errors={errors} />
		</>
	);
};
