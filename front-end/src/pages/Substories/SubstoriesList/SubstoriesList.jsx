// Packages

// Components
import { ContentItem } from "../../../components/ContentItem/ContentItem";
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
		<ContentItem className='substories-list-container'>
			<div className='substories-list'>
				<SubstoriesListPrimary />
				<SubstoriesListSubstoryPosters />
				<SubstoriesListCreateSubstory />
			</div>
		</ContentItem>
	);
};
