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
		<div className='unit-page-subpage-soundtrack-track'>
			<div tabIndex={"1"} className='unit-page-subpage-soundtrack-track-song'>
				<div className='unit-page-subpage-soundtrack-track-number'>{index + 1}</div>
				<div className='unit-page-subpage-soundtrack-track-artwork'>{!artwork ? null : <img src={artwork} alt='' />}</div>
				<div className='unit-page-subpage-soundtrack-track-name-container'>
					<div className='unit-page-subpage-soundtrack-track-name'>{track?.name}</div>
					<div className='unit-page-subpage-soundtrack-track-sub-info'>
						<div className='unit-page-subpage-soundtrack-track-artists'>{track?.artists}</div>
						<div className='unit-page-subpage-soundtrack-track-sub-info-divider'>{!track?.artists || !track?.album ? null : "•"}</div>
						<div className='unit-page-subpage-soundtrack-track-album'>{track?.album}</div>
					</div>
				</div>
				<div className='unit-page-subpage-soundtrack-track-buttons-container'>
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
						? "unit-page-subpage-soundtrack-track-text-container unit-page-subpage-soundtrack-track-text-container-is-displaying"
						: "unit-page-subpage-soundtrack-track-text-container"
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
