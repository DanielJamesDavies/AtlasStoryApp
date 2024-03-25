// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { OpenableComponent } from "../../../../../../../../../components/OpenableComponent/OpenableComponent";
import { SearchInput } from "../../../../../../../../../components/SearchInput/SearchInput";
import { Content } from "./Content/Content";

// Logic
import { MediaLogic } from "./MediaLogic";

// Context

// Services

// Styles
import "./Media.css";

// Assets

export const Media = () => {
	const {
		playerHeight,
		content_simple,
		content_images,
		playlists,
		tracks,
		spotifyPlaylists,
		spotifyTracks,
		searchMusicResults,
		searchMusicValue,
		onSearchMusicChange,
		searchMusicPage,
		changeSearchMusicPage,
		onClickSearchMusicItem,
	} = MediaLogic();

	return (
		<div className='unit-page-storyboard-editor-multi-tab-pane-content-media' style={{ "--player_height": playerHeight + "px" }}>
			<OpenableComponent className='unit-page-storyboard-editor-multi-tab-pane-content-media-section' title='Simple'>
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list'>
					{content_simple?.map((content_item, index) => (
						<Content key={index} content_item={content_item} />
					))}
				</div>
			</OpenableComponent>
			<OpenableComponent className='unit-page-storyboard-editor-multi-tab-pane-content-media-section' title='Images'>
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list'>
					{content_images?.map((content_item, index) => (
						<Content key={index} content_item={content_item} />
					))}
				</div>
			</OpenableComponent>
			<OpenableComponent
				className='unit-page-storyboard-editor-multi-tab-pane-content-media-section unit-page-storyboard-editor-multi-tab-pane-content-media-section-music'
				title='Music'
			>
				<SearchInput label='Search Spotify for Tracks and Playlists' value={searchMusicValue} onChange={onSearchMusicChange} />
				{searchMusicResults && searchMusicResults?.length > 0 ? (
					<div>
						<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music'>
							{searchMusicResults
								?.slice(
									Math.min(searchMusicResults?.length, searchMusicPage * 4),
									Math.min(searchMusicResults?.length, searchMusicPage * 4 + 4)
								)
								?.map((result, index) => (
									<div
										key={index}
										className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-result'
										onClick={() => onClickSearchMusicItem(result)}
									>
										<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-result-artwork'>
											{result?.album?.images?.[0]?.url ? (
												<img src={result?.album?.images?.[0]?.url} alt='' />
											) : result?.images?.[0]?.url ? (
												<img src={result?.images?.[0]?.url} alt='' />
											) : null}
										</div>
										<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-result-text'>
											<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-result-name'>
												{result?.name}
											</div>
											<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-result-type'>
												{result?.type?.charAt(0)?.toUpperCase() + result?.type?.slice(1)}
											</div>
										</div>
									</div>
								))}
						</div>
						<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-page-buttons'>
							<button
								className={
									"unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-page-btn" +
									(searchMusicPage === 0
										? ""
										: " unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-page-btn-active")
								}
								onClick={() => changeSearchMusicPage(-1)}
							>
								<FaChevronLeft />
							</button>
							<button
								className={
									"unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-page-btn" +
									(Math.min(searchMusicResults?.length, searchMusicPage * 4 + 4) === searchMusicResults?.length
										? ""
										: " unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-music-page-btn-active")
								}
								onClick={() => changeSearchMusicPage(1)}
							>
								<FaChevronRight />
							</button>
						</div>
					</div>
				) : (
					<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list'>
						{playlists?.map((content_item, index) => (
							<Content key={index} content_item={spotifyPlaylists?.find((e) => e?.id === content_item?.id)} type='playlist' />
						))}
						{tracks?.map((content_item, index) => (
							<Content key={index} content_item={spotifyTracks?.find((e) => e?.id === content_item?.id)} type='track' />
						))}
					</div>
				)}
			</OpenableComponent>
		</div>
	);
};
