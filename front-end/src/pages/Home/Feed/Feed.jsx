// Packages

// Components
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";
import { FeedItem } from "./FeedItem";

// Logic
import { FeedLogic } from "./FeedLogic";

// Context

// Services

// Styles
import "./Feed.css";

// Assets

export const Feed = () => {
	const { feedItems } = FeedLogic();

	return (
		<div className='home-feed-container'>
			{feedItems === false ? (
				<div className='home-feed-loading-container'>
					<LoadingCircle />
				</div>
			) : (
				<div className='home-feed-items-container'>
					{feedItems.map((feedItem, index) => (
						<FeedItem key={index} feedItem={feedItem} />
					))}
				</div>
			)}
		</div>
	);
};
