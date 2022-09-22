// Packages

// Components

// Logic
import { SearchResultListItemLogic } from "./SearchResultListItemLogic";

// Context

// Services

// Styles
import "./SearchResultListItem.css";

// Assets

export const SearchResultListItem = ({ searchResult }) => {
	const { goToPage, icon } = SearchResultListItemLogic({ searchResult });

	switch (searchResult?.modelType) {
		case "user":
			return (
				<button
					className='search-results-list-item'
					onClick={(e) => goToPage(e, "/u/" + searchResult?.username)}
					onAuxClick={(e) => goToPage(e, "/u/" + searchResult?.username)}
				>
					<div className='search-results-list-item-icon'>{!icon?.image ? null : <img src={icon?.image} alt='' />}</div>
					<div className='search-results-list-item-text'>
						<div className='search-results-list-item-nickname'>{searchResult?.data?.nickname}</div>
						<div className='search-results-list-item-username'>@{searchResult?.username}</div>
					</div>
				</button>
			);
		case "story":
			return (
				<button
					className='search-results-list-item'
					onClick={(e) => goToPage(e, "/s/" + searchResult?.uid)}
					onAuxClick={(e) => goToPage(e, "/s/" + searchResult?.uid)}
				>
					<div className='search-results-list-item-icon'>{!icon?.image ? null : <img src={icon?.image} alt='' />}</div>
					<div className='search-results-list-item-text'>
						<div className='search-results-list-item-title'>{searchResult?.data?.title}</div>
						{!searchResult?.owner?.nickname ? null : (
							<div className='search-results-list-item-owner'>A Story by {searchResult?.owner?.nickname}</div>
						)}
					</div>
				</button>
			);
		default:
			return null;
	}
};
