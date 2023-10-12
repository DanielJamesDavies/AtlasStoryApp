// Packages

// Components
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";
import { SubpageButtons } from "./SubpageButtons/SubpageButtons";
import { Subpages } from "./Subpages/Subpages";

// Logic

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	return (
		<div className='settings'>
			<div className='settings-loading-container'>
				<LoadingCircle />
			</div>
			<div className='settings-title'>Settings</div>
			<div className='settings-content'>
				<SubpageButtons />
				<Subpages />
			</div>
		</div>
	);
};
