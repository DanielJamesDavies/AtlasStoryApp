// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../../../../components/LabelContainer/LabelContainer";
import { ImageInput } from "../../../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { AlignmentInput } from "../../../../../../components/AlignmentInput/AlignmentInput";
import { CoordinatesInput } from "../../../../../../components/CoordinatesInput/CoordinatesInput";

// Logic
import { SettingsCardBackgroundImageLogic } from "./SettingsCardBackgroundImageLogic";

// Context

// Services

// Styles
import "./SettingsCardBackgroundImage.css";

// Assets

export const SettingsCardBackgroundImage = () => {
	const {
		unit_type,
		isAuthorizedToEdit,
		unit,
		characterCardBackground,
		changeCardBackground,
		removeCardBackground,
		changeCardBackgroundAlignment,
		changeCardBackgroundPosition,
		changeCardBackgroundScale,
		revertCardBackground,
		saveCardBackground,
		errors,
		cardBackgroundSizeRef,
		backgroundImageSizeRef,
	} = SettingsCardBackgroundImageLogic();

	if (!["character"].includes(unit_type)) return null;
	return (
		<LabelContainer
			className='unit-page-subpage-settings-item unit-page-subpage-settings-card-background-container'
			label='Card Background Image'
		>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRemove={removeCardBackground}
				onRevert={revertCardBackground}
				onSave={saveCardBackground}
			>
				<div className='unit-page-subpage-settings-card-background-image'>
					<div ref={cardBackgroundSizeRef} className='unit-page-subpage-settings-card-background-image-image-container'>
						<div
							className={
								"unit-page-subpage-settings-card-background-image-image-alignment unit-page-subpage-settings-card-background-image-image-alignment-" +
								unit?.data?.cardBackgroundProperties?.alignment
							}
						>
							{!characterCardBackground ? null : (
								<div
									className='unit-page-subpage-settings-card-background-image-image'
									style={{
										transform: `translate(${unit?.data?.cardBackgroundProperties?.position
											.map((e) => Math.sign(e) * (Math.abs(e) / 100) * cardBackgroundSizeRef?.current?.clientHeight)
											.join("px, ")}px)`,
										width: isNaN(
											cardBackgroundSizeRef?.current?.clientWidth * parseFloat(unit?.data?.cardBackgroundProperties?.scale)
										)
											? "100%"
											: cardBackgroundSizeRef?.current?.clientWidth * parseFloat(unit?.data?.cardBackgroundProperties?.scale),
										"--scale": 1,
									}}
								>
									<img
										ref={backgroundImageSizeRef}
										src={unit?.data?.cardBackground?.image}
										alt=''
										className='unit-page-subpage-settings-card-background-image-image-size'
									/>
									<img
										className='unit-page-subpage-settings-card-background-image-image-img'
										src={characterCardBackground}
										alt=''
										style={{
											"--scale":
												Math.max(
													(parseFloat(unit?.data?.cardBackgroundProperties?.scale) || 1) *
														(cardBackgroundSizeRef?.current?.clientHeight || (window?.innerWidth > 750 ? 585 : 1)),
													(cardBackgroundSizeRef?.current?.clientWidth || 412) *
														(parseFloat(unit?.data?.cardBackgroundProperties?.scale) || 1) *
														(backgroundImageSizeRef?.current?.clientHeight /
															backgroundImageSizeRef?.current?.clientWidth)
												) /
												((cardBackgroundSizeRef?.current?.clientWidth || (window?.innerWidth > 750 ? 412 : 1)) *
													(parseFloat(unit?.data?.cardBackgroundProperties?.scale) || 1) *
													(backgroundImageSizeRef?.current?.clientHeight / backgroundImageSizeRef?.current?.clientWidth)),
										}}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
				<div>
					<div className='unit-page-subpage-settings-card-background-image'>
						<div ref={cardBackgroundSizeRef} className='unit-page-subpage-settings-card-background-image-image-container'>
							<div
								className={
									"unit-page-subpage-settings-card-background-image-image-alignment unit-page-subpage-settings-card-background-image-image-alignment-" +
									unit?.data?.cardBackgroundProperties?.alignment
								}
							>
								<div
									className={
										"unit-page-subpage-settings-card-background-image-image" +
										(characterCardBackground ? "" : " unit-page-subpage-settings-card-background-image-image-no-image")
									}
									style={{
										transform: `translate(${unit?.data?.cardBackgroundProperties?.position
											.map((e) => Math.sign(e) * (Math.abs(e) / 100) * cardBackgroundSizeRef?.current?.clientHeight)
											.join("px, ")}px)`,
										width: isNaN(
											cardBackgroundSizeRef?.current?.clientWidth * parseFloat(unit?.data?.cardBackgroundProperties?.scale)
										)
											? "100%"
											: cardBackgroundSizeRef?.current?.clientWidth * parseFloat(unit?.data?.cardBackgroundProperties?.scale),
										"--scale":
											Math.max(
												(parseFloat(unit?.data?.cardBackgroundProperties?.scale) || 1) *
													(cardBackgroundSizeRef?.current?.clientHeight || (window?.innerWidth > 750 ? 585 : 1)),
												(cardBackgroundSizeRef?.current?.clientWidth || 412) *
													(parseFloat(unit?.data?.cardBackgroundProperties?.scale) || 1) *
													(backgroundImageSizeRef?.current?.clientHeight / backgroundImageSizeRef?.current?.clientWidth)
											) /
											((cardBackgroundSizeRef?.current?.clientWidth || (window?.innerWidth > 750 ? 412 : 1)) *
												(parseFloat(unit?.data?.cardBackgroundProperties?.scale) || 1) *
												(backgroundImageSizeRef?.current?.clientHeight / backgroundImageSizeRef?.current?.clientWidth)),
									}}
								>
									<img
										ref={backgroundImageSizeRef}
										src={unit?.data?.cardBackground?.image}
										alt=''
										className='unit-page-subpage-settings-card-background-image-image-size'
									/>
									<ImageInput value={characterCardBackground} onChange={changeCardBackground} />
								</div>
							</div>
						</div>

						<LabelContainer label='Alignment' isInline={true}>
							<AlignmentInput value={unit?.data?.cardBackgroundProperties?.alignment} onChange={changeCardBackgroundAlignment} />
						</LabelContainer>
						<LabelContainer label='Position' isInline={true}>
							<CoordinatesInput value={unit?.data?.cardBackgroundProperties?.position} onChange={changeCardBackgroundPosition} />
						</LabelContainer>
						<LabelContainer label='Scale' isInline={true}>
							<CoordinatesInput value={[unit?.data?.cardBackgroundProperties?.scale]} onChange={changeCardBackgroundScale} />
						</LabelContainer>
					</div>
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</LabelContainer>
	);
};
