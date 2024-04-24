// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { ColourPicker } from "../../../../../../components/ColourPicker/ColourPicker";
import { ToggleInput } from "../../../../../../components/ToggleInput/ToggleInput";

// Logic
import { GroupsItemLogic } from "./GroupsItemLogic";

// Context

// Services

// Styles
import "./GroupsItem.css";

// Assets

export const GroupsItem = ({ group, isEditing, reversed }) => {
	const { toggleReversed } = GroupsItemLogic({ group });

	return (
		<ContentItem className='characters-group-info-home-groups-item-item' margin='none' size='s' hasBg={true} backgroundColour='grey3'>
			<div className='characters-group-info-home-groups-item-item-primary-content'>
				<div className='characters-group-info-home-groups-item-item-colour-container'>
					<ColourPicker
						value={group?.data?.colour}
						displayText={false}
						enableEdit={false}
						size='s'
						pickerVerticalPlacement='bottom'
						noBackground={true}
						circular={true}
					/>
				</div>
				<div className='characters-group-info-home-groups-item-item-name'>{group?.data?.name}</div>
			</div>
			{!isEditing ? null : (
				<div className='characters-group-info-home-groups-item-item-reverse-toggle-container'>
					<ToggleInput label='Reverse' size='s' enableEdit={true} value={reversed} onToggle={toggleReversed} />
				</div>
			)}
		</ContentItem>
	);
};
