// Packages

// Components
import { SubstoriesTitle } from "./SubstoriesTitle/SubstoriesTitle";
import { SubstoriesList } from "./SubstoriesList/SubstoriesList";

// Logic

// Context

// Services

// Styles
import "./Substories.css";

// Assets

export const Substories = () => {
	return (
		<div className='substories'>
			<SubstoriesTitle />
			<SubstoriesList />
		</div>
	);
};
