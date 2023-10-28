// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";

// Logic
import { LocationPropertiesLogic } from "./LocationPropertiesLogic";

// Context

// Services

// Styles
import "./LocationProperties.css";

// Assets

export const LocationProperties = () => {
	const {
		isAuthorizedToEdit,
		unit,
		unit_type,
		propertiesTypes,
		defaultChangeFunction,
		revertLocationProperties,
		saveLocationProperties,
		locationParentName,
	} = LocationPropertiesLogic();

	if (!["location"].includes(unit_type)) return null;
	return (
		<EditableContainer
			className='unit-page-overview-location-properties-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertLocationProperties}
			onSave={saveLocationProperties}
		>
			<div className='unit-page-overview-location-properties'>
				{locationParentName.length === 0 ? (
					<div></div>
				) : (
					<div className='unit-page-overview-location-properties-item'>
						<div className='unit-page-overview-location-properties-item-label'>Parent Location</div>
						<div className='unit-page-overview-location-properties-item-value'>{locationParentName}</div>
					</div>
				)}
				{propertiesTypes
					?.filter((e) => e?.location_types.includes(unit?.type))
					?.map((propertyType, index) => (
						<div key={index} className='unit-page-overview-location-properties-item'>
							<div className='unit-page-overview-location-properties-item-label'>{propertyType?.name}</div>
							<div className='unit-page-overview-location-properties-item-value'>
								{!propertyType?.viewFunc ? unit[propertyType?._id] : propertyType.viewFunc(unit[propertyType?._id])}
							</div>
						</div>
					))}
			</div>
			<div className='unit-page-overview-location-properties'>
				{locationParentName.length === 0 ? (
					<div></div>
				) : (
					<div className='unit-page-overview-location-properties-item'>
						<div className='unit-page-overview-location-properties-item-label'>Parent Location</div>
						<div className='unit-page-overview-location-properties-item-value'>{locationParentName}</div>
					</div>
				)}
				{propertiesTypes
					?.filter((e) => e?.location_types.includes(unit?.type))
					?.map((propertyType, index) => (
						<div key={index} className='unit-page-overview-location-properties-item'>
							<div className='unit-page-overview-location-properties-item-label'>{propertyType?.name}</div>
							{propertyType?._id === "points" ? (
								<>
									<div className='unit-page-overview-location-properties-item-point-container'>
										<div className='unit-page-overview-location-properties-item-point-label'>Aphelion (km):&nbsp;&nbsp;</div>
										<TextInput
											className='unit-page-overview-location-properties-item-value'
											seamless={true}
											label='Aphelion'
											value={unit[propertyType?._id][0]}
											onChange={(e) => propertyType?.changeFunc(e, 0)}
											isLightText={true}
											aiTools={false}
										/>
									</div>
									<div className='unit-page-overview-location-properties-item-point-container'>
										<div className='unit-page-overview-location-properties-item-point-label'>Perihelion (km):</div>
										<TextInput
											className='unit-page-overview-location-properties-item-value'
											seamless={true}
											label='Perihelion'
											value={unit[propertyType?._id][1]}
											onChange={(e) => propertyType?.changeFunc(e, 1)}
											isLightText={true}
											aiTools={false}
										/>
									</div>
								</>
							) : (
								<TextInput
									className='unit-page-overview-location-properties-item-value'
									seamless={true}
									label={"Enter " + propertyType?.name + " Here"}
									value={!propertyType?.viewFunc ? unit[propertyType?._id] : propertyType.viewFunc(unit[propertyType?._id])}
									onChange={(e) => defaultChangeFunction(e, propertyType?._id)}
									isLightText={true}
									aiTools={false}
								/>
							)}
						</div>
					))}
			</div>
		</EditableContainer>
	);
};
