// Packages

// Components
import { UserItem } from "../../../../components/UserItem/UserItem";
import { StoryItem } from "../../../../components/StoryItem/StoryItem";

// Logic

// Context

// Services

// Styles
import "./SearchResultsList.css";

// Assets

export const SearchResultsList = ({ searchResults }) => {
	if (searchResults.length === 0) return null;
	return (
		<div className='home-search-results-list-container'>
			<div className='home-search-results-list-title'>Users</div>
			<div className='home-search-results-users-list'>
				{searchResults
					.filter((e) => e.modelType === "user")
					.map((user, index) => (
						<UserItem key={index} user={user} className='home-search-results-user-item' />
					))}
			</div>
			<div className='home-search-results-list-title'>Stories</div>
			<div className='home-search-results-stories-list'>
				{searchResults
					.filter((e) => e.modelType === "story")
					.map((story, index) => (
						<StoryItem key={index} story={story} className='home-search-results-story-item' size='s' />
					))}
			</div>
		</div>
	);
};
