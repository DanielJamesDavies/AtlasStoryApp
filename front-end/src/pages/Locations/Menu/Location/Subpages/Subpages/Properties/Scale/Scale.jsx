// Packages

// Components
import { EditableContainer } from "../../../../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";
import { DropdownContainer } from "../../../../../../../../components/DropdownContainer/DropdownContainer";

// Logic
import { LocationScaleLogic } from "./ScaleLogic";

// Context

// Services

// Styles
import "./Scale.css";

// Assets

export const LocationScale = () => {
	const { isAuthorizedToEdit, location, scaleUnits, displayedScale, changeScale, changeScaleUnit, revertScale, saveScale } = LocationScaleLogic();

	if (["reality"].includes(location?.type) || (!isAuthorizedToEdit && scaleUnits.findIndex((e) => e.id === location?.data?.scaleUnit) === -1))
		return null;
	return (
		<EditableContainer
			className='locations-location-scale-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertScale}
			onSave={saveScale}
		>
			<div className='locations-location-scale'>
				<div className='locations-location-scale-title'>Scale</div>
				<div className='locations-location-scale-value'>
					{scaleUnits.current
						.find((e) => e.id === location?.data?.scaleUnit)
						?.to_unit(location?.scale)
						.toLocaleString("en-US")}
					{scaleUnits.current.find((e) => e.id === location?.data?.scaleUnit)?.pluralS &&
					scaleUnits.current.find((e) => e.id === location?.data?.scaleUnit)?.to_unit(location?.scale) !== 1
						? scaleUnits.current.find((e) => e.id === location?.data?.scaleUnit)?.label + "s"
						: scaleUnits.current.find((e) => e.id === location?.data?.scaleUnit)?.label}
				</div>
			</div>
			<div className='locations-location-scale'>
				<div className='locations-location-scale-title'>Scale</div>
				<div className='locations-location-scale-value-edit-container'>
					<TextInput value={displayedScale === false ? "" : displayedScale} onChange={changeScale} />
					<DropdownContainer value={scaleUnits.current.find((e) => e.id === location?.data?.scaleUnit)?.label} onChange={changeScaleUnit}>
						{scaleUnits.current.map((unit, index) => (
							<div key={index} className=''>
								{unit?.label}
							</div>
						))}
					</DropdownContainer>
				</div>
			</div>
		</EditableContainer>
	);
};
