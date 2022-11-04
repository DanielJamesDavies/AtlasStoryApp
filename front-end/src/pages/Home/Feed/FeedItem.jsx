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
	const { contentTypeText, onClickTitle, onClickStory, onClickAuthor } = FeedItemLogic({ feedItem });

	return (
		<div className={!feedItem?.content?.content_type ? "home-feed-item" : "home-feed-item home-feed-item-" + feedItem.content.content_type}>
			<div className='home-feed-item-primary'>
				<div className='home-feed-item-primary-author-and-story-container'>
					{!feedItem?.content?.story ? null : (
						<div className='home-feed-item-primary-story' onClick={onClickStory}>
							<div className='home-feed-item-primary-story-icon'>
								{!feedItem?.content?.story?.icon ? null : <img src={feedItem.content.story.icon} alt='' />}
							</div>
							<div className='home-feed-item-primary-story-title'>{feedItem?.content?.story?.title}</div>
						</div>
					)}
					{!feedItem?.author ? null : (
						<div className='home-feed-item-primary-author' onClick={onClickAuthor}>
							<div className='home-feed-item-primary-author-profile-picture'>
								{!feedItem?.author?.profilePicture ? null : <img src={feedItem.author.profilePicture} alt='' />}
							</div>
							<div className='home-feed-item-primary-author-names'>
								<div className='home-feed-item-primary-author-nickname'>{feedItem?.author?.nickname}</div>
								<div className='home-feed-item-primary-author-username'>@{feedItem?.author?.username}</div>
							</div>
						</div>
					)}
				</div>
				{feedItem?.content?.content_type === "story" ? null : (
					<div className='home-feed-item-primary-title-container' onClick={onClickTitle}>
						{feedItem?.content?.content_type !== "story" ? null : (
							<div className='home-feed-item-primary-title-image'>
								{!feedItem?.content?.icon ? null : <img src={feedItem.content.icon} alt='' />}
							</div>
						)}
						<div className='home-feed-item-primary-title-name'>{feedItem?.content?.name}</div>
						<div className='home-feed-item-primary-title-type'>{contentTypeText}</div>
					</div>
				)}
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
