// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../../../components/ContentItem/ContentItem";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../../../../../components/IconBtn/IconBtn";
import { ColourPicker } from "../../../../../../../../components/ColourPicker/ColourPicker";

// Logic
import { RegionsItemLogic } from "./RegionsItemLogic";

// Context

// Services

// Styles
import "./RegionsItem.css";

// Assets

export const RegionsItem = ({ regionsItem, index, isEditing }) => {
	const {
		changeRegionsItemName,
		changeRegionsItemColour,
		removeRegionsItem,
		regionSelectingSurfaceMapComponentsFor,
		startSelectingMapComponents,
		endSelectingMapComponents,
	} = RegionsItemLogic({ regionsItem, index });

	if (!isEditing)
		return (
			<div className='locations-location-regions-item'>
				<ContentItem hasBg={true}>
					<div className='locations-location-regions-item-title-container'>
						<div className='locations-location-regions-item-name'>{regionsItem?.name}</div>
					</div>
					<div className='locations-location-regions-item-colour-container'>
						<label>Region Colour</label>
						<ColourPicker value={regionsItem?.colour} onChange={changeRegionsItemColour} enableEdit={false} />
					</div>
				</ContentItem>
			</div>
		);

	return (
		<div className='locations-location-regions-item'>
			<ContentItem hasBg={true}>
				<div className='locations-location-regions-item-content'>
					<div className='locations-location-regions-item-name-container'>
						<TextInput
							className='locations-location-regions-item-name'
							seamless={true}
							label='Region Name'
							value={regionsItem?.name}
							onChange={changeRegionsItemName}
							aiTools={true}
						/>
					</div>
					<div className='locations-location-regions-item-colour-container'>
						<label>Region Colour</label>
						<ColourPicker
							value={regionsItem?.colour}
							onChange={changeRegionsItemColour}
							enableEdit={true}
							pickerVerticalPlacement='bottom'
						/>
					</div>
					<div className='locations-location-regions-item-components-container'>
						{regionSelectingSurfaceMapComponentsFor !== regionsItem?._id ? (
							<button onClick={startSelectingMapComponents}>Select Components</button>
						) : (
							<button className='locations-location-regions-item-components-btn-save' onClick={endSelectingMapComponents}>
								Save Selected Components
							</button>
						)}
					</div>
				</div>
				<div className='locations-location-regions-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={removeRegionsItem} />
				</div>
			</ContentItem>
		</div>
	);
};
