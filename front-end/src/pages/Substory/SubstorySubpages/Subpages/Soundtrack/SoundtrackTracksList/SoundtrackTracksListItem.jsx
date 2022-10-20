// Packages

// Components
import { Text } from "../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { SoundtrackTracksListItemLogic } from "./SoundtrackTracksListItemLogic";

// Context

// Services

// Styles
import "./SoundtrackTracksListItem.css";

// Assets

export const SoundtrackTracksListItem = ({ track, index, isEditing, changeTrackText }) => {
	const { artwork } = SoundtrackTracksListItemLogic({ track });

	if (track?.is_removed) return null;
	return (
		<div className='substory-subpage-soundtrack-track'>
			<button className='substory-subpage-soundtrack-track-song'>
				<div className='substory-subpage-soundtrack-track-number'>{index + 1}</div>
				<div className='substory-subpage-soundtrack-track-artwork'>{!artwork ? null : <img src={artwork} alt='' />}</div>
				<div className='substory-subpage-soundtrack-track-name-container'>
					<div className='substory-subpage-soundtrack-track-name'>{track?.name}</div>
					<div className='substory-subpage-soundtrack-track-artists'>{track?.artists}</div>
					<div className='substory-subpage-soundtrack-track-album'>{track?.album}</div>
				</div>
			</button>
			<div className='substory-subpage-soundtrack-track-text-container'>
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
		</div>
	);
};
