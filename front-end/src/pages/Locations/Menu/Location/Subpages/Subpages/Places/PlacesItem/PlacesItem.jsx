// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../../../components/ContentItem/ContentItem";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../../../../../components/IconBtn/IconBtn";
import { DropdownContainer } from "../../../../../../../../components/DropdownContainer/DropdownContainer";
import { ToggleInput } from "../../../../../../../../components/ToggleInput/ToggleInput";

// Logic
import { PlacesItemLogic } from "./PlacesItemLogic";

// Context

// Services

// Styles
import "./PlacesItem.css";

// Assets

export const PlacesItem = ({ placesItem, index, isEditing, locationChildren }) => {
	const {
		locations,
		changePlacesItemName,
		removePlacesItem,
		positioningPlaceID,
		startPositioningPlace,
		endPositioningPlace,
		changeLocation,
		placeSymbols,
		changeSymbol,
		toggleIsMajor,
	} = PlacesItemLogic({ placesItem, index, locationChildren });

	if (!isEditing)
		return (
			<div className='locations-location-places-item'>
				<ContentItem hasBg={true}>
					<div className='locations-location-places-item-title-container'>
						<div className='locations-location-places-item-name'>{placesItem?.name}</div>
					</div>
					<div className='locations-location-places-item-symbol-container'>
						<b>Symbol: </b>
						{placeSymbols.find((e) => e?._id === placesItem?.symbol)?.name}
					</div>
					<div className='locations-location-places-item-symbol-container'>
						<b>Major: </b>
						{placesItem?.isMajor ? "True" : "False"}
					</div>
				</ContentItem>
			</div>
		);

	return (
		<div className='locations-location-places-item'>
			<ContentItem hasBg={true}>
				<div className='locations-location-places-item-content'>
					<div className='locations-location-places-item-name-container'>
						<TextInput
							className='locations-location-places-item-name'
							seamless={true}
							label='Place Name'
							value={placesItem?.name}
							onChange={changePlacesItemName}
							aiTools={true}
						/>
					</div>
					<div className='locations-location-places-item-components-container'>
						{positioningPlaceID !== placesItem?._id ? (
							<button onClick={startPositioningPlace}>Select Position</button>
						) : (
							<button className='locations-location-places-item-components-btn-save' onClick={endPositioningPlace}>
								Save Position
							</button>
						)}
					</div>
					<div className='locations-location-places-item-location-container'>
						<label>Location</label>
						<DropdownContainer
							value={locations?.find((e) => e?._id === placesItem?.location)?.data?.name}
							onChange={changeLocation}
							noBackground={true}
							includeUnselectedOption={true}
						>
							{locationChildren.map((location, index) => (
								<div key={index}>{location?.data?.name}</div>
							))}
						</DropdownContainer>
					</div>
					<div className='locations-location-places-item-symbol-container'>
						<label>Symbol</label>
						<DropdownContainer
							value={placeSymbols.find((e) => e?._id === placesItem?.symbol)?.name}
							onChange={changeSymbol}
							noBackground={true}
						>
							{placeSymbols.map((symbol, index) => (
								<div key={index}>{symbol?.name}</div>
							))}
						</DropdownContainer>
					</div>
					<div className='locations-location-places-item-is-major-container'>
						<ToggleInput label='Major' value={placesItem?.isMajor} onToggle={toggleIsMajor} enableEdit={true} size='s' />
					</div>
				</div>
				<div className='locations-location-places-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} onClick={removePlacesItem} />
				</div>
			</ContentItem>
		</div>
	);
};
