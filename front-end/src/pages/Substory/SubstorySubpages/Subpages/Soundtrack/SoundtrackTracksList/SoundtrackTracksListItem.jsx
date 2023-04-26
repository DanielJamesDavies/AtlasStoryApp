// Packages
import { FaStickyNote, FaEye, FaEyeSlash } from "react-icons/fa";

// Components
import { Text } from "../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic
import { SoundtrackTracksListItemLogic } from "./SoundtrackTracksListItemLogic";

// Context

// Services

// Styles
import "./SoundtrackTracksListItem.css";

// Assets

export const SoundtrackTracksListItem = ({ track, index, isEditing, changeTrackText }) => {
	const { artwork, isDisplayingText, toggleIsDisplayingText } = SoundtrackTracksListItemLogic({ track });

	if (track?.is_removed) return null;
	return (
		<div className='substory-subpage-soundtrack-track'>
			<div tabIndex={"1"} className='substory-subpage-soundtrack-track-song'>
				<div className='substory-subpage-soundtrack-track-number'>{index + 1}</div>
				<div className='substory-subpage-soundtrack-track-artwork'>{!artwork ? null : <img src={artwork} alt='' />}</div>
				<div className='substory-subpage-soundtrack-track-name-container'>
					<div className='substory-subpage-soundtrack-track-name'>{track?.name}</div>
					<div className='substory-subpage-soundtrack-track-artists'>{track?.artists}</div>
					<div className='substory-subpage-soundtrack-track-album'>{track?.album}</div>
				</div>
				<div className='substory-subpage-soundtrack-track-buttons-container'>
					<IconBtn
						icon={<FaStickyNote />}
						iconSmall={!isDisplayingText ? <FaEye /> : <FaEyeSlash />}
						seamless={true}
						onClick={toggleIsDisplayingText}
					/>
				</div>
			</div>
			<div
				className={
					isDisplayingText
						? "substory-subpage-soundtrack-track-text-container substory-subpage-soundtrack-track-text-container-is-displaying"
						: "substory-subpage-soundtrack-track-text-container"
				}
			>
				{!isEditing ? (
					<Text value={track?.text} />
				) : (
					<MultiLineTextInput
						seamless={true}
						value={track?.text.join("\n")}
						onChange={(e) => changeTrackText(e, track?.uri)}
						label={"Track Text"}
						aiTools={true}
					/>
				)}
			</div>
		</div>
	);
};
