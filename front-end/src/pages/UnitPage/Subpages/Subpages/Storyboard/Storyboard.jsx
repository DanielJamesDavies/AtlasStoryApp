// Packages

// Components
import { EditBtn } from "./EditBtn/EditBtn";
import { Player } from "./Player/Player";
import { Editor } from "./Editor/Editor";

// Logic
import { StoryboardLogic } from "./StoryboardLogic";

// Context

// Services

// Styles

// Assets

export const Storyboard = () => {
	const { storyboardRef, isEditingStoryboard } = StoryboardLogic();

	return (
		<div ref={storyboardRef} className='unit-page-subpage unit-page-subpage-storyboard'>
			{isEditingStoryboard ? null : <Player />}
			<EditBtn />
			<Editor />
		</div>
	);
};
