// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { Text } from "../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./SoundtrackRemovedTracksListItem.css";

// Assets

export const SoundtrackRemovedTracksListItem = ({ track, isEditing, changeTrackText, deleteTrack }) => {
	return (
		<div
			className={
				!isEditing
					? "unit-page-subpage-soundtrack-removed-track"
					: "unit-page-subpage-soundtrack-removed-track unit-page-subpage-soundtrack-removed-track-is-editing"
			}
		>
			<button className='unit-page-subpage-soundtrack-removed-track-song'>
				<div className='unit-page-subpage-soundtrack-removed-track-artwork'>
					{!track?.artwork ? null : <img src={track.artwork} alt='' />}
				</div>
				<div className='unit-page-subpage-soundtrack-removed-track-name-container'>
					<div className='unit-page-subpage-soundtrack-removed-track-name'>{track?.name}</div>
					<div className='unit-page-subpage-soundtrack-removed-track-artists'>{track?.artists}</div>
					<div className='unit-page-subpage-soundtrack-removed-track-album'>{track?.album}</div>
				</div>
			</button>
			<div className='unit-page-subpage-soundtrack-removed-track-text-container'>
				{!isEditing ? (
					<Text value={track?.text} />
				) : (
					<MultiLineTextInput
						seamless={true}
						value={track?.text.join("\n")}
						onChange={(e) => changeTrackText(e, track?.uri)}
						label={"Track Text"}
					/>
				)}
			</div>
			{!isEditing ? null : (
				<div className='unit-page-subpage-soundtrack-removed-track-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' size='s' seamless={true} onClick={() => deleteTrack(track?.uri)} />
				</div>
			)}
		</div>
	);
};
