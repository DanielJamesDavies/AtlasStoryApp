// Packages

// Components

// Logic
import { CharactersGroupCharacterCardLogic } from "./CharactersGroupCharacterCardLogic";

// Context

// Services

// Styles
import "./CharactersGroupCharacterCard.css";

// Assets

export const CharactersGroupCharacterCard = ({ characterID }) => {
	const { character, characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles, cardSizeRef, cardSize, backgroundImageSizeRef } =
		CharactersGroupCharacterCardLogic({
			characterID,
		});

	if (!character) return <div ref={cardSizeRef} className='characters-group-character-card-placeholder' />;
	return (
		<div className='characters-group-character-card-wrapper drag-drop-item-content' style={cardStyles}>
			<div
				className='characters-group-character-card'
				onClick={navigateToCharacter}
				onAuxClick={navigateToCharacter}
				onMouseDown={onCharacterCardMouseDown}
			>
				<div ref={cardSizeRef} className='characters-group-character-card-content'>
					<div className='characters-group-character-card-top-container'>
						<div className='characters-group-character-card-top-name'>{character?.data?.name}</div>
						<div className='characters-group-character-card-character-type'>
							<div className='characters-group-character-card-character-type-text'>{characterType?.data?.name}</div>
						</div>
					</div>
					<div className='characters-group-character-card-summary-item-container'>
						{!character?.data?.summaryItems
							? null
							: character.data.summaryItems.map((summaryItem, index) => (
									<div key={index} className='characters-group-character-card-summary-item'>
										<div className='characters-group-character-card-summary-item-label'>{summaryItem.label}</div>
										<div className='characters-group-character-card-summary-item-text'>{summaryItem.text}</div>
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
									transform: `translate(${character?.data?.cardBackgroundProperties?.position.join("px, ")}px)`,
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
												cardSize?.height,
												cardSize?.width *
													(parseFloat(character?.data?.cardBackgroundProperties?.scale) || 1) *
													(backgroundImageSizeRef?.current?.clientHeight / backgroundImageSizeRef?.current?.clientWidth)
											) /
											(cardSize?.width *
												(parseFloat(character?.data?.cardBackgroundProperties?.scale) || 1) *
												(backgroundImageSizeRef?.current?.clientHeight / backgroundImageSizeRef?.current?.clientWidth)),
									}}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
