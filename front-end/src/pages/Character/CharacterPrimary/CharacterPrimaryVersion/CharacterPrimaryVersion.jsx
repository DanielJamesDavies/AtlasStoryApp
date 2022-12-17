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

export const CharacterPrimaryVersion = ({ characterPrimaryVersionRef }) => {
	const { character, characterVersion, decrementCharacterVersion, incrementCharacterVersion, primaryVersionStyle, primaryVersionWidthRef } =
		CharacterPrimaryVersionLogic();

	return (
		<div ref={characterPrimaryVersionRef} className='character-primary-version-container'>
			<IconBtn icon={<FaChevronLeft />} onClick={decrementCharacterVersion} seamless={true} size='s' />
			<div className='character-primary-version' style={primaryVersionStyle}>
				<div className='character-primary-version-label'>Version</div>
				<div className='character-primary-version-title'>{characterVersion.title}</div>
			</div>
			<div ref={primaryVersionWidthRef} className='character-primary-version-width-element'>
				{character?.data?.versions?.map((version, index) => (
					<div key={index} className='character-primary-version-width-element-title'>
						{version?.title}
					</div>
				))}
			</div>
			<IconBtn icon={<FaChevronRight />} onClick={incrementCharacterVersion} seamless={true} size='s' />
		</div>
	);
};
