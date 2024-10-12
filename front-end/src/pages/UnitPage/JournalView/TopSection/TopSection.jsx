// Packages

// Components

// Logic
import { TopSectionLogic } from "./TopSectionLogic";

// Context

// Services

// Styles
import "./TopSection.css";

// Assets

export const TopSection = () => {
	const {
		unit,
		unit_type,
		unitVersion,
		story,
		storyIcon,
		unitOverviewBackground,
		unitOverviewForegrounds,
		unitImageContainerRef,
		unitImageRef,
		overviewForegroundSizeRef,
	} = TopSectionLogic();

	return (
		<div className='unit-page-journal-view-top-section'>
			{/* Story Title */}
			<div className='unit-page-journal-view-top-section-story-title'>
				{!storyIcon ? null : <img src={storyIcon} alt='' />}
				<span>{story?.data?.title}</span>
			</div>
			{/* Unit Title */}
			<div className='unit-page-journal-view-top-section-unit-title'>{unit?.data?.name}</div>
			{/* Unit Image */}
			{(unitOverviewForegrounds || [])
				.map((e) => e?.image?.image)
				?.concat([unitOverviewBackground])
				?.filter((e) => e && e !== "NO_IMAGE")?.length === 0 ? null : (
				<div
					ref={unitImageContainerRef}
					className='unit-page-journal-view-top-section-unit-image-container'
					style={{
						"--top-section-image-scale": Math.max(
							unitImageContainerRef?.current?.clientWidth / window?.innerWidth,
							unitImageContainerRef?.current?.clientHeight / window?.innerHeight
						),
					}}
				>
					<div
						ref={unitImageRef}
						className={
							"unit-page-journal-view-top-section-unit-image" +
							(unitImageContainerRef?.current?.clientHeight <
							unitImageRef?.current?.clientHeight *
								Math.max(
									unitImageContainerRef?.current?.clientWidth / window?.innerWidth,
									unitImageContainerRef?.current?.clientHeight / window?.innerHeight
								)
								? " unit-page-journal-view-top-section-unit-image-larger-height"
								: "")
						}
					>
						{!["character"].includes(unit_type) || !unitOverviewForegrounds ? null : (
							<div
								className={
									!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
									unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE"
										? "unit-page-journal-view-top-section-unit-image-foreground-container unit-page-journal-view-top-section-unit-image-foreground-container-no-image"
										: "unit-page-journal-view-top-section-unit-image-foreground-container"
								}
							>
								<div
									className={
										"unit-page-journal-view-top-section-unit-image-foreground unit-page-journal-view-top-section-unit-image-foreground-alignment-" +
										unitVersion?.overviewForeground?.alignment
									}
								>
									{!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
									unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
										<img
											src={unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image}
											alt=''
											style={{
												transform: `translate(${unitVersion?.overviewForeground?.position.join("px, ")}px)`,
												height: isNaN(
													overviewForegroundSizeRef?.current?.clientHeight *
														parseFloat(unitVersion?.overviewForeground?.scale * ((window.innerHeight + 200) / 1300))
												)
													? "0px"
													: overviewForegroundSizeRef?.current?.clientHeight *
													  parseFloat(unitVersion?.overviewForeground?.scale * ((window.innerHeight + 200) / 1300)),
												maxWidth: isNaN(
													overviewForegroundSizeRef?.current?.clientWidth *
														parseFloat(unitVersion?.overviewForeground?.scale)
												)
													? "0px"
													: overviewForegroundSizeRef?.current?.clientWidth *
													  parseFloat(unitVersion?.overviewForeground?.scale),
											}}
										/>
									)}
									{!unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image ||
									unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image === "NO_IMAGE" ? null : (
										<div style={{ scale: unitVersion?.overviewForeground?.scale }}>
											<img
												ref={overviewForegroundSizeRef}
												className='unit-page-journal-view-top-section-unit-image-foreground-image-size'
												src={unitOverviewForegrounds.find((e) => e?._id === unitVersion?._id)?.image?.image}
												alt=''
											/>
										</div>
									)}
								</div>
							</div>
						)}
						<div
							className={
								!unitOverviewBackground || unitOverviewBackground === "NO_IMAGE"
									? "unit-page-journal-view-top-section-unit-image-background unit-page-journal-view-top-section-unit-image-background-dynamic unit-page-journal-view-top-section-unit-image-background-no-image"
									: "unit-page-journal-view-top-section-unit-image-background unit-page-journal-view-top-section-unit-image-background-dynamic"
							}
						>
							{!unitOverviewBackground || unitOverviewBackground === "NO_IMAGE" ? null : <img src={unitOverviewBackground} alt='' />}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
