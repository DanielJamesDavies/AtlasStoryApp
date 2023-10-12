// Packages

// Components

// Logic
import { SubpagesLogic } from "./SubpagesLogic";

// Context

// Services

// Styles
import "./Subpages.css";

// Assets

export const Subpages = () => {
	const { subpage } = SubpagesLogic();

	return <div className='settings-subpages'>{subpage}</div>;
};
