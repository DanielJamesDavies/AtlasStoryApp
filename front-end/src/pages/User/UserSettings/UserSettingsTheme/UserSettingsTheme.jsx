// Packages

// Components
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsThemeLogic } from "./UserSettingsThemeLogic";

// Context

// Services

// Styles
import "./UserSettingsTheme.css";

// Assets

export const UserSettingsTheme = () => {
	const { uiTheme, changeTheme, themes, errors } = UserSettingsThemeLogic();

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
						></div>
						<div className='user-settings-theme-btn-label'>{theme?.label}</div>
					</div>
				))}
			</div>
			<ErrorMessage errors={errors} attribute='theme' />
			<ErrorMessage errors={errors} />
		</>
	);
};
