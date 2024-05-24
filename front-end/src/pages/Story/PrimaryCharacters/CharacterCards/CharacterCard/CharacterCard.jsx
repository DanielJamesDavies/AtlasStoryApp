// Packages

// Components

// Logic
import { CharacterCardLogic } from "./CharacterCardLogic";

// Context

// Services

// Styles
import "./CharacterCard.css";

// Assets

export const CharacterCard = ({ character }) => {
	const {
		characterType,
		navigateToCharacter,
		onCharacterCardMouseDown,
		cardStyles,
		cardSizeRef,
		cardSize,
		backgroundImageSizeRef,
		backgroundImageSize,
		backgroundImageRef,
	} = CharacterCardLogic({
		character,
	});

	if (!character) return <div ref={cardSizeRef} className='story-primary-character-card-placeholder' />;
	return (
		<div
			ref={cardSizeRef}
			className='story-primary-character-card drag-drop-item-content'
			onClick={navigateToCharacter}
			onAuxClick={navigateToCharacter}
			onMouseDown={onCharacterCardMouseDown}
			style={cardStyles}
		>
			<div ref={cardSizeRef} className='story-primary-character-card-content'>
				<div className='story-primary-character-card-top-container'>
					<div className='story-primary-character-card-top-name'>{character?.data?.name}</div>
					<div className='story-primary-character-card-character-type'>
						<div className='story-primary-character-card-character-type-text'>{characterType?.data?.name}</div>
					</div>
				</div>
				<div className='story-primary-character-card-summary-items-container'>
					{!character?.data?.summaryItems
						? null
						: character.data.summaryItems.map((summaryItem, index) => (
								<div key={index} className='story-primary-character-card-summary-item'>
									<div className='story-primary-character-card-summary-item-label'>{summaryItem?.label}</div>
									<div className='story-primary-character-card-summary-item-text'>{summaryItem?.text}</div>
								</div>
						  ))}
				</div>
			</div>
			{!character?.data?.cardBackground?.image ? null : (
				<div className='characters-group-character-card-background-container'>
					<div
						className={
							"characters-group-character-card-background-alignment characters-group-character-card-background-alignment-" +
							character?.data?.cardBackgroundProperties?.alignment
						}
					>
						<div
							className='characters-group-character-card-background'
							style={{
								transform: `translate(${character?.data?.cardBackgroundProperties?.position
									.map((e) => Math.sign(e) * (Math.abs(e) / 100) * cardSize?.height)
									.join("px, ")}px)`,
								width: isNaN(cardSize?.width * parseFloat(character?.data?.cardBackgroundProperties?.scale))
									? "100%"
									: cardSize?.width * parseFloat(character?.data?.cardBackgroundProperties?.scale),
							}}
						>
							<img
								ref={backgroundImageSizeRef}
								src={character.data.cardBackground.image}
								alt=''
								className='characters-group-character-card-background-image-size'
							/>
							<img
								src={character.data.cardBackground.image}
								alt=''
								style={{
									"--scale":
										Math.max(
											(parseFloat(character?.data?.cardBackgroundProperties?.scale) || 1) *
												(cardSize?.height || (window?.innerWidth > 750 ? 585 : 1)),
											(cardSize?.width || 412) *
												(parseFloat(character?.data?.cardBackgroundProperties?.scale) || 1) *
												(backgroundImageRef?.current?.clientHeight /
													(backgroundImageSize?.width || backgroundImageRef?.current?.clientWidth))
										) /
										((cardSize?.width || (window?.innerWidth > 750 ? 412 : 1)) *
											(parseFloat(character?.data?.cardBackgroundProperties?.scale) || 1) *
											((backgroundImageSize?.height || backgroundImageRef?.current?.clientHeight) /
												(backgroundImageSize?.width || backgroundImageRef?.current?.clientWidth))),
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
