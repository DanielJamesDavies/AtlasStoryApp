// Packages

// Components

// Logic
import { FeedItemLogic } from "./FeedItemLogic";

// Context

// Services

// Styles
import "./FeedItem.css";

// Assets

export const FeedItem = ({ feedItem }) => {
	const { contentTypeText } = FeedItemLogic({ feedItem });

	return (
		<div className={!feedItem?.content?.content_type ? "home-feed-item" : "home-feed-item home-feed-item-" + feedItem.content.content_type}>
			<div className='home-feed-item-primary'>
				{!feedItem?.content?.story ? null : (
					<div className='home-feed-item-primary-story'>
						<div className='home-feed-item-primary-story-icon'>
							{!feedItem?.content?.story.icon ? null : <img src={feedItem.content.story.icon} alt='' />}
						</div>
						<div className='home-feed-item-primary-story-title'>{feedItem?.content?.story?.title}</div>
					</div>
				)}
				<div className='home-feed-item-primary-title-container'>
					{feedItem?.content?.content_type !== "story" ? null : (
						<div className='home-feed-item-primary-title-image'>
							{!feedItem?.content?.icon ? null : <img src={feedItem.content.icon} alt='' />}
						</div>
					)}
					<div className='home-feed-item-primary-title-name'>{feedItem?.content?.name}</div>
					<div className='home-feed-item-primary-title-type'>{contentTypeText}</div>
				</div>
			</div>
			{feedItem?.changes.length === 0 ? null : (
				<div className='home-feed-item-changes-container'>
					<div className='home-feed-item-changes-title'>Changes:</div>
					<div className='home-feed-item-changes'>
						{feedItem?.changes?.map((change, index) => (
							<div key={index} className='home-feed-item-change-item'>
								<div className='home-feed-item-change-item-bullet-point' />
								<div className='home-feed-item-change-item-content'>
									<div className='home-feed-item-change-item-title'>{change?.title}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
