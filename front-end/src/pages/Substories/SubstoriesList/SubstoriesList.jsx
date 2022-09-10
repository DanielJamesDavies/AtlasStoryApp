// Packages

// Components
import { SubstoriesListPrimary } from "./SubstoriesListPrimary";
import { SubstoriesListSubstoryPosters } from "./SubstoriesListSubstoryPosters";
import { SubstoriesListCreateSubstory } from "./SubstoriesListCreateSubstory";

// Logic

// Context

// Services

// Styles
import "./SubstoriesList.css";

// Assets

export const SubstoriesList = () => {
	return (
		<div className='substories-list'>
			<SubstoriesListPrimary />
			<SubstoriesListSubstoryPosters />
			<SubstoriesListCreateSubstory />
		</div>
	);
};
