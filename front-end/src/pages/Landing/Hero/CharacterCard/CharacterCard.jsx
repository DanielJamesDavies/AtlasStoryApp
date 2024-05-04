// Packages

// Components

// Logic

// Context

// Services
import getColourWithTint from "../../../../services/GetColourWithTint";

// Styles
import "./CharacterCard.css";

// Assets
import canosCardImage from "../../../../content/canos-card-image.webp";

export const CharacterCard = () => {
	const character = {
		data: {
			name: "Canos",
			colour: "#0044ff",
			summaryItems: [
				{
					label: "Descriptives",
					text: "Computer Scientist, Physicist, Mathematician, Electrical Engineer, Mechanical Engineer, Material Scientist, Chemical Engineer, Aerospace Engineer",
				},
				{ label: "Represents", text: "That Which Wishes for the Advancement of All and Takes Ultimate Responsibility for All" },
				{ label: "Full Name", text: "Canos Logices" },
			],
		},
	};

	const characterType = {
		data: {
			name: "Architect",
			colour: "#0044ff",
		},
	};

	return (
		<div
			className='landing-character-card'
			style={{
				"--characterColour": character?.data?.colour,
				"--characterColourGradient1": getColourWithTint(character?.data?.colour)[0],
				"--characterColourGradient2": getColourWithTint(character?.data?.colour)[1],
				"--characterTypeColourGradient1": getColourWithTint(character?.data?.colour)[0],
				"--characterTypeColourGradient2": getColourWithTint(characterType?.data?.colour)[1],
				"--characterCardNameColour": "#0088ff",
			}}
		>
			<div className='landing-character-card-content'>
				<div className='landing-character-card-top-container'>
					<div className='landing-character-card-top-name'>{character?.data?.name}</div>
					<div className='landing-character-card-character-type'>
						<div className='landing-character-card-character-type-text'>{characterType?.data?.name}</div>
					</div>
				</div>
				<div className='landing-character-card-summary-items-container'>
					{!character?.data?.summaryItems
						? null
						: character.data.summaryItems.map((summaryItem, index) => (
								<div key={index} className='landing-character-card-summary-item'>
									<div className='landing-character-card-summary-item-label'>{summaryItem?.label}</div>
									<div className='landing-character-card-summary-item-text'>{summaryItem?.text}</div>
								</div>
						  ))}
				</div>
			</div>
			<div className='landing-character-card-background'>
				<img src={canosCardImage} alt='' />
			</div>
		</div>
	);
};
