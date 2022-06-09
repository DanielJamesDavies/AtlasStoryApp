// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { CharacterPrimaryVersionLogic } from "./CharacterPrimaryVersionLogic";

// Context

// Services

// Styles
import "./CharacterPrimaryVersion.css";

// Assets

export const CharacterPrimaryVersion = () => {
	const { characterVersion, decrementCharacterVersion, incrementCharacterVersion } = CharacterPrimaryVersionLogic();

	return (
		<div className='character-primary-version-container'>
			<IconBtn icon={<FaChevronLeft />} onClick={decrementCharacterVersion} seamless={true} size='s' />
			<div className='character-primary-version'>
				<div className='character-primary-version-label'>Version</div>
				<div className='character-primary-version-title'>{characterVersion.title}</div>
			</div>
			<IconBtn icon={<FaChevronRight />} onClick={incrementCharacterVersion} seamless={true} size='s' />
		</div>
	);
};
