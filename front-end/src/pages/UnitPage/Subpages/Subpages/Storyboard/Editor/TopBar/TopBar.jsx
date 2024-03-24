// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// Components

// Logic
import { TopBarLogic } from "./TopBarLogic";

// Context

// Services

// Styles
import "./TopBar.css";

// Assets

export const TopBar = () => {
	const { story, storyIcon, unit, onClickBackBtn, onClickSaveBtn } = TopBarLogic();

	return (
		<div className='unit-page-storyboard-editor-top-bar'>
			<button className='unit-page-storyboard-editor-top-bar-back-btn' onClick={onClickBackBtn}>
				<FontAwesomeIcon icon={faChevronLeft} />
				<span>Exit Storyboard Editor</span>
			</button>
			<div className='unit-page-storyboard-editor-top-bar-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
			<div className='unit-page-storyboard-editor-top-bar-plot-title'>
				{!unit?.data?.title ? null : unit?.data?.isStoryTitleInTitle ? story?.data?.title + ": " + unit?.data?.title : unit?.data?.title}
			</div>
			<div className='unit-page-storyboard-editor-top-bar-save-btn-container'>
				<button className='unit-page-storyboard-editor-top-bar-save-btn' onClick={onClickSaveBtn}>
					<div>Save</div>
				</button>
			</div>
		</div>
	);
};
